<div align="center">

# 💚 Rebeca & Pedro

### `19 . 09 . 2026`

Site oficial do casamento. Site estático com lista de presentes integrada.

**[rebecapedro.com.br](https://rebecapedro.com.br)**

</div>

---

## 📜 Sobre

Convite digital com contagem regressiva, informações da cerimônia, galeria do casal,
dress code, lista de presentes interativa (PIX ou link de compra) e seção de FAQ.
A lista de presentes registra cada confirmação numa planilha do Google em tempo real.

## 🛠 Stack

- **HTML5 + CSS3 + JavaScript vanilla** (sem frameworks, sem build step)
- Tipografia: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts
- Paleta "Tropical Chic" inspirada no tema do casamento
- Backend dos presentes: [Google Sheets](https://www.google.com/sheets/about/) + [Apps Script](https://www.google.com/script/start/) (HTTP API)
- Deploy: [GitHub Actions](https://docs.github.com/en/actions) → [GitHub Pages](https://pages.github.com/) com domínio próprio

## ✨ Recursos

| | |
|---|---|
| 🕐 **Contagem regressiva** ao vivo | 📍 **Cerimônia** com endereço e Google Maps |
| 👗 **Dress code** com paleta visual | 🖼️ **Galeria** com carrossel auto-play |
| 🎁 **Lista de presentes** (52 itens) | 🔄 **Controle compartilhado** anti-duplicata |
| 💸 **PIX livre** com qualquer valor | 📋 **Comprovante** salvo no Drive |
| 🌸 **Pétalas caindo** no hero (canvas) | 🪄 **Reveal animations** ao rolar |
| 📱 **Mobile-first** + PWA básico | 🔎 **SEO completo** (OG, Twitter, JSON-LD) |
| 💌 **Confirmação de presença** (RSVP) | 📊 **Painel** na planilha com totais e faixas etárias |

## 📁 Estrutura

```
.
├── index.html              # Home: hero, contagem, cerimônia, dress code, galeria, RSVP, FAQ
├── presentes.html          # Lista de presentes + PIX livre
│
├── assets/
│   ├── fotos/              # Fotos do casal
│   ├── presentes/          # Imagens dos itens da lista
│   ├── og-image.jpg        # Card de preview pra WhatsApp/Facebook
│   └── favicon*.png/svg
│
├── css/styles.css
│
├── js/
│   ├── config.example.js   # Template (config.js real fica gitignored)
│   ├── gifts.js            # Lista de presentes + GiftStore
│   ├── rsvp.js             # Confirmação de presença
│   ├── carousel.js         # Galeria
│   ├── countdown.js        # Contagem regressiva
│   ├── petals.js           # Canvas das pétalas
│   └── reveal.js           # IntersectionObserver pros fade-ins
│
├── backend/
│   └── apps-script.gs      # API + painel de resumo na planilha
│
└── .github/workflows/
    └── deploy.yml          # CI: injeta secrets e publica no Pages
```

## 🚀 Rodando localmente

```bash
# 1. Clone
git clone https://github.com/JonasPeres/casamento-rebeca-pedro.git
cd casamento-rebeca-pedro

# 2. Copie o template de config
cp js/config.example.js js/config.js
# (preencha os valores se quiser testar com o backend real)

# 3. Sirva os arquivos (qualquer servidor estático serve)
python -m http.server 8000
# ou:  npx serve
```

Abra http://localhost:8000.

> Sem `js/config.js` preenchido, a página funciona em **modo demo** com `localStorage`
> (cada navegador vê uma lista própria de presentes "marcados").

## 🚢 Deploy

Push em `main` dispara o GitHub Action, que:

1. Injeta as variáveis dos **Secrets** num `js/config.js` temporário
2. Publica tudo no GitHub Pages
3. O domínio `rebecapedro.com.br` aponta direto pro Pages via DNS A records

### Secrets do GitHub

Em `Settings → Secrets and variables → Actions`:

| Secret | Conteúdo |
|--------|----------|
| `SHEETS_WEB_APP_URL` | URL `/exec` do Apps Script implantado |
| `SHEETS_TOKEN` | Token aleatório longo, precisa bater com o `SHEETS_TOKEN` das Script Properties do Apps Script |
| `PIX_KEY` | Telefone da chave PIX (só dígitos), ex.: `31999999999` |
| `PIX_NAME` | Nome do titular da conta PIX |

> `PIX_KEY` e `PIX_NAME` são dados pessoais. Por isso ficam em secrets e são
> injetados só no deploy, mantendo-os fora do código-fonte público.

### Configuração do Apps Script

O código em [`backend/apps-script.gs`](backend/apps-script.gs) não contém secrets — eles ficam nas
**Script Properties** do projeto (equivalente a env vars do Apps Script).

Setup, **uma vez só**:

1. Crie uma planilha no Google Sheets
2. `Extensões → Apps Script` → cole o conteúdo de `apps-script.gs` → salve
3. ⚙️ **Configurações do projeto → Propriedades do script → Adicionar propriedade**
   - Chave: `SHEETS_TOKEN`
   - Valor: o mesmo token que está no secret do GitHub
4. `Implantar → Nova implantação → Aplicativo da Web`
   - Executar como: Eu
   - Quem tem acesso: **Qualquer pessoa**
5. Copie a URL `/exec` e cole no secret `SHEETS_WEB_APP_URL` do GitHub

## 🎨 Personalização

A paleta fica em CSS custom properties no topo de `css/styles.css`:

```css
--verde-folha: #4A6A4A;
--sage:        #B8CDB5;
--magenta:     #C8388B;
--coral:       #F19478;
--mustard:     #E8C547;
```

---

<div align="center">

Feito com 💚 para celebrar **Rebeca & Pedro**.

</div>
