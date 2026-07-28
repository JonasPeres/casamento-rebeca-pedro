/**
 * Backend do site | Rebeca & Pedro
 * ---------------------------------------------------------------
 * Cole TODO este arquivo no Apps Script da planilha do Google
 * (Planilha → Extensões → Apps Script → cole e salve).
 *
 * Depois:
 *   1. ⚙️ Configurações do projeto → Propriedades do script
 *      → adicione a chave SHEETS_TOKEN com o mesmo valor do secret do GitHub
 *   2. Implantar → Nova implantação → Aplicativo da Web
 *      - Executar como: Eu
 *      - Quem tem acesso: Qualquer pessoa
 *   3. Copie a URL /exec e coloque no secret SHEETS_WEB_APP_URL do GitHub
 *
 * Abas geradas automaticamente:
 *   - Presentes : presentes escolhidos (com valor)
 *   - PixLivre  : contribuições de valor livre
 *   - Presenca  : confirmações de presença (nome, idade, telefone)
 *   - Resumo    : painel com fórmulas (rode o menu "Casamento R&P → Atualizar Resumo")
 *
 * Comprovantes vão para a pasta "Comprovantes Casamento R&P" no Drive.
 */

const SHEET_NAME      = 'Presentes';
const SHEET_PIX_LIVRE = 'PixLivre';
const SHEET_PRESENCA  = 'Presenca';
const SHEET_RESUMO    = 'Resumo';
const FOLDER_NAME     = 'Comprovantes Casamento R&P';

// Quantidade de itens no catálogo da lista (definido no front, em js/gifts.js)
const TOTAL_ITENS_LISTA = 52;

/* ====================== Segurança ====================== */
function getToken_() {
  return PropertiesService.getScriptProperties().getProperty('SHEETS_TOKEN');
}
function verifyToken_(token) {
  const expected = getToken_();
  return !!expected && token === expected;
}

/* ====================== Abas ====================== */
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['id', 'item', 'valor', 'convidado', 'metodo', 'comprovante_url', 'em']);
    sh.setFrozenRows(1);
    sh.getRange('A1:G1').setFontWeight('bold').setBackground('#F4EEE4');
    sh.setColumnWidth(2, 320);
    sh.setColumnWidth(4, 220);
    sh.setColumnWidth(6, 260);
    sh.getRange('C2:C').setNumberFormat('R$ #,##0.00');
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

function getPresencaSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_PRESENCA);
  if (!sh) {
    sh = ss.insertSheet(SHEET_PRESENCA);
    sh.appendRow(['nome', 'idade', 'telefone', 'em']);
    sh.setFrozenRows(1);
    sh.getRange('A1:D1').setFontWeight('bold').setBackground('#F4EEE4');
    sh.setColumnWidth(1, 240);
    sh.setColumnWidth(3, 160);
  }
  return sh;
}

function getOrCreateFolder_() {
  const it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}

/* ====================== GET ====================== */
/** Devolve { ok:true, claimed: { id: { convidado, metodo, em, url } } } */
function doGet(e) {
  try {
    if (!verifyToken_(e && e.parameter && e.parameter.token)) {
      return jsonOut_({ ok: false, error: 'unauthorized' });
    }
    const sh = getSheet_();
    const values = sh.getDataRange().getValues();
    const claimed = {};
    for (let i = 1; i < values.length; i++) {
      const [id, item, valor, convidado, metodo, url, em] = values[i];
      if (id) claimed[String(id)] = { convidado, metodo, em, url };
    }
    return jsonOut_({ ok: true, claimed });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/* ====================== POST ====================== */
/**
 * POST →
 *   • Presente:  { id, item, valor, convidado, metodo, receiptBase64, receiptFilename, receiptMime }
 *   • PIX livre: { kind:'pix_livre', convidado, valor, receiptBase64?, ... }
 *   • Presença:  { kind:'rsvp', nome, idade, telefone }
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!verifyToken_(data && data.token)) {
      return jsonOut_({ ok: false, error: 'unauthorized' });
    }
    if (data && data.kind === 'pix_livre') return handlePixLivre_(data);
    if (data && data.kind === 'rsvp')      return handleRsvp_(data);
    return handleClaim_(data);
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

function handleClaim_(data) {
  const { id, item, valor, convidado, metodo, receiptBase64, receiptFilename, receiptMime } = data;
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
  sh.appendRow([id, item || '', Number(valor) || '', convidado, metodo, receiptUrl, new Date()]);
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

function handleRsvp_(data) {
  const { nome, idade, telefone } = data;
  if (!nome || idade === '' || idade === null || idade === undefined || !telefone) {
    return jsonOut_({ ok: false, error: 'Informe nome, idade e telefone.' });
  }
  const n = Number(idade);
  if (!isFinite(n) || n < 0 || n > 120) {
    return jsonOut_({ ok: false, error: 'Idade inválida.' });
  }
  const sh = getPresencaSheet_();
  sh.appendRow([String(nome).trim(), n, String(telefone).trim(), new Date()]);
  return jsonOut_({ ok: true });
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
  // Sem setSharing: mais rápido e mantém o comprovante PRIVADO.
  // O dono da planilha (proprietário dos arquivos) abre normalmente pelo link.
  const file = folder.createFile(blob);
  return file.getUrl();
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ====================== PAINEL / RESUMO ======================
 * Rode pelo menu "Casamento R&P → Atualizar Resumo" (ou execute
 * montarResumo() no editor). As fórmulas se atualizam sozinhas
 * conforme novas linhas chegam.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Casamento R&P')
    .addItem('Atualizar Resumo', 'montarResumo')
    .addToUi();
}

function montarResumo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // garante que as abas-fonte existem (senão as fórmulas dão erro)
  getSheet_(); getPixLivreSheet_(); getPresencaSheet_();

  let sh = ss.getSheetByName(SHEET_RESUMO);
  if (!sh) sh = ss.insertSheet(SHEET_RESUMO, 0);
  sh.clear();

  const P  = "'" + SHEET_NAME + "'";
  const PX = "'" + SHEET_PIX_LIVRE + "'";
  const PR = "'" + SHEET_PRESENCA + "'";

  // Separador de argumentos conforme o locale da planilha (pt-BR usa ";")
  const sep = ss.getSpreadsheetLocale().indexOf('pt') === 0 ? ';' : ',';
  const f = (s) => s.split('|').join(sep); // usamos "|" como marcador e trocamos pelo separador certo

  const rows = [
    ['PAINEL DO CASAMENTO  •  REBECA & PEDRO', ''],
    ['', ''],
    ['💰 FINANCEIRO', ''],
    ['Presentes escolhidos (qtd)', `=COUNTA(${P}!A2:A)`],
    ['Valor em presentes',         `=SUM(${P}!C2:C)`],
    ['Contribuições PIX livre (qtd)', `=COUNTA(${PX}!A2:A)`],
    ['Valor em PIX livre',         `=SUM(${PX}!B2:B)`],
    ['TOTAL ARRECADADO',           `=B5+B7`],
    ['Ticket médio por presente',  f(`=IFERROR(B5/B4|0)`)],
    ['', ''],
    ['👥 PRESENÇA', ''],
    ['Confirmados (total de pessoas)', `=COUNTA(${PR}!A2:A)`],
    ['Adultos (18+)',              f(`=COUNTIF(${PR}!B2:B|">=18")`)],
    ['Jovens (11 a 17)',           f(`=COUNTIFS(${PR}!B2:B|">=11"|${PR}!B2:B|"<18")`)],
    ['Crianças (6 a 10)',          f(`=COUNTIFS(${PR}!B2:B|">=6"|${PR}!B2:B|"<11")`)],
    ['Bebês/pequenos (0 a 5)',     f(`=COUNTIFS(${PR}!B2:B|">=0"|${PR}!B2:B|"<6")`)],
    ['Idade média',                f(`=IFERROR(ROUND(AVERAGE(${PR}!B2:B)|0)|0)`)],
    ['', ''],
    ['🎁 LISTA DE PRESENTES', ''],
    ['Itens no catálogo',          TOTAL_ITENS_LISTA],
    ['Já escolhidos',              `=B4`],
    ['Ainda disponíveis',          `=B20-B21`],
    ['% da lista concluída',       f(`=IFERROR(B21/B20|0)`)],
    ['', ''],
    ['⏱️ ATIVIDADE', ''],
    ['Último presente escolhido',  f(`=IFERROR(MAX(${P}!G2:G)|"-")`)],
    ['Última confirmação',         f(`=IFERROR(MAX(${PR}!D2:D)|"-")`)],
    ['Última contribuição PIX',    f(`=IFERROR(MAX(${PX}!D2:D)|"-")`)],
  ];

  sh.getRange(1, 1, rows.length, 2).setValues(rows);

  // ---- formatação ----
  sh.getRange('A1:B1').merge().setFontSize(15).setFontWeight('bold')
    .setBackground('#3F5C3F').setFontColor('#FFFFFF')
    .setHorizontalAlignment('center');

  ['A3','A11','A19','A25'].forEach(function (c) {
    sh.getRange(c).setFontWeight('bold').setFontSize(12).setBackground('#F4EEE4');
    sh.getRange(c.replace('A', 'B')).setBackground('#F4EEE4');
  });

  // moeda
  ['B5','B7','B8','B9'].forEach(function (c) { sh.getRange(c).setNumberFormat('R$ #,##0.00'); });
  // porcentagem
  sh.getRange('B23').setNumberFormat('0.0%');
  // datas
  ['B26','B27','B28'].forEach(function (c) { sh.getRange(c).setNumberFormat('dd/mm/yyyy hh:mm'); });

  // destaque do total arrecadado
  sh.getRange('A8:B8').setFontWeight('bold').setBackground('#E8C547');

  sh.setColumnWidth(1, 280);
  sh.setColumnWidth(2, 180);
  sh.getRange('B2:B').setHorizontalAlignment('right');
  sh.setFrozenRows(1);

  SpreadsheetApp.getActiveSpreadsheet().toast('Resumo atualizado!', 'Casamento R&P', 3);
}
