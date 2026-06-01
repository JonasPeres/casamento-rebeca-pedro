/**
 * Backend da lista de presentes | Rebeca & Pedro
 * ---------------------------------------------------------------
 * Cole TODO este arquivo no Apps Script da sua planilha do Google
 * (Planilha → Extensões → Apps Script → cole e salve).
 *
 * Depois:
 *   1. Implantar → Nova implantação
 *   2. Tipo: Aplicativo da Web
 *      - Executar como: Eu (sua conta)
 *      - Quem tem acesso: Qualquer pessoa
 *   3. Copie a URL gerada e cole em js/config.js (SHEETS_WEB_APP_URL)
 *
 * O script:
 *   - Cria a aba "Presentes" automaticamente se não existir
 *   - Salva comprovantes numa pasta "Comprovantes Casamento R&P" no seu Drive
 *   - Bloqueia presentes já reivindicados (evita dois "mesa de jantar")
 */

const SHEET_NAME = 'Presentes';
const SHEET_PIX_LIVRE = 'PixLivre';
const FOLDER_NAME = 'Comprovantes Casamento R&P';

/**
 * Token de segurança vem das Script Properties (não fica no código fonte).
 * Para configurar: Apps Script → Configurações do projeto (⚙️)
 *                  → Propriedades do script → Adicionar propriedade
 *                  → Chave: SHEETS_TOKEN  | Valor: <string aleatória longa>
 * O mesmo valor precisa estar no secret SHEETS_TOKEN do GitHub Actions.
 */
function getToken_() {
  return PropertiesService.getScriptProperties().getProperty('SHEETS_TOKEN');
}
function verifyToken_(token) {
  const expected = getToken_();
  return !!expected && token === expected;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['id', 'item', 'convidado', 'metodo', 'comprovante_url', 'em']);
    sh.setFrozenRows(1);
    sh.getRange('A1:F1').setFontWeight('bold').setBackground('#F4EEE4');
    sh.setColumnWidth(2, 320);
    sh.setColumnWidth(3, 220);
    sh.setColumnWidth(5, 260);
  }
  return sh;
}

function getPixLivreSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_PIX_LIVRE);
  if (!sh) {
    sh = ss.insertSheet(SHEET_PIX_LIVRE);
    sh.appendRow(['convidado', 'valor', 'comprovante_url', 'em']);
    sh.setFrozenRows(1);
    sh.getRange('A1:D1').setFontWeight('bold').setBackground('#F4EEE4');
    sh.setColumnWidth(1, 240);
    sh.setColumnWidth(3, 260);
    sh.getRange('B2:B').setNumberFormat('R$ #,##0.00');
  }
  return sh;
}

function getOrCreateFolder_() {
  const it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}

/** GET → devolve { ok:true, claimed: { id: { convidado, metodo, em, url } } } */
function doGet(e) {
  try {
    if (!verifyToken_(e && e.parameter && e.parameter.token)) {
      return jsonOut_({ ok: false, error: 'unauthorized' });
    }
    const sh = getSheet_();
    const values = sh.getDataRange().getValues();
    const claimed = {};
    for (let i = 1; i < values.length; i++) {
      const [id, item, convidado, metodo, url, em] = values[i];
      if (id) claimed[String(id)] = { convidado, metodo, em, url };
    }
    return jsonOut_({ ok: true, claimed });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/**
 * POST →
 *   • Reservar presente: { id, item, convidado, metodo, receiptBase64, receiptFilename, receiptMime }
 *   • PIX livre:         { kind: 'pix_livre', convidado, valor, receiptBase64?, receiptFilename?, receiptMime? }
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!verifyToken_(data && data.token)) {
      return jsonOut_({ ok: false, error: 'unauthorized' });
    }
    if (data && data.kind === 'pix_livre') return handlePixLivre_(data);
    return handleClaim_(data);
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

function handleClaim_(data) {
  const { id, item, convidado, metodo, receiptBase64, receiptFilename, receiptMime } = data;
  if (!id || !convidado || !metodo) {
    return jsonOut_({ ok: false, error: 'Dados obrigatórios faltando.' });
  }

  const sh = getSheet_();
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      return jsonOut_({ ok: false, error: 'Este presente já foi reservado por outro convidado.' });
    }
  }

  const receiptUrl = saveReceipt_(id, convidado, receiptBase64, receiptFilename, receiptMime);
  sh.appendRow([id, item || '', convidado, metodo, receiptUrl, new Date()]);
  return jsonOut_({ ok: true, receiptUrl });
}

function handlePixLivre_(data) {
  const { convidado, valor, receiptBase64, receiptFilename, receiptMime } = data;
  if (!convidado || !valor) {
    return jsonOut_({ ok: false, error: 'Informe nome e valor.' });
  }
  const v = Number(valor);
  if (!isFinite(v) || v <= 0) {
    return jsonOut_({ ok: false, error: 'Valor inválido.' });
  }

  const receiptUrl = saveReceipt_('pixlivre', convidado, receiptBase64, receiptFilename, receiptMime);
  const sh = getPixLivreSheet_();
  sh.appendRow([convidado, v, receiptUrl, new Date()]);
  return jsonOut_({ ok: true, receiptUrl });
}

function saveReceipt_(prefix, convidado, base64, filename, mime) {
  if (!base64) return '';
  const folder = getOrCreateFolder_();
  const safeName = (convidado || 'convidado').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_');
  const fullName = `${prefix}_${safeName}_${Date.now()}_${filename || 'comprovante'}`;
  const blob = Utilities.newBlob(
    Utilities.base64Decode(base64),
    mime || 'application/octet-stream',
    fullName
  );
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
