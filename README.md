# 🦅 Debre na Rede — PWA Debreceni FC

App oficial do **Debreceni FC de Carmo-RJ**. PWA moderno com React + Vite.

---

## 🎨 Paleta de Cores
| Token | Cor | Hex |
|-------|-----|-----|
| `--navy` | Azul Marinho Profundo | `#0D1B3E` |
| `--cream` | Creme/Off-white | `#F5EDD6` |
| `--gold` | Dourado | `#C9A227` |

---

## 📱 Telas Implementadas
| Tela | Rota |
|------|------|
| Splash Screen | `/` |
| Tela Inicial (Home) | `/home` |
| Notícias / Feed | `/news` |
| Detalhe de Notícia | `/news/:id` |
| Elenco (Aberto + Master) | `/elenco` |
| Perfil do Jogador | `/elenco/:id` |
| Galeria de Fotos/Vídeos | `/galeria` |
| Manto Sagrado | `/manto` |
| Debre-Stats Carmense | `/stats` |
| Resenha do Interior | `/resenha` |
| Parceiros do Debrê | `/parceiros` |
| Voto do Torcedor | `/voto` |
| História do Debrê | `/historia` |
| Login / Cadastro | `/login` |
| Menu / Mais | `/menu` |

---

## 🖼️ Como Adicionar o Escudo Real

1. Coloque o arquivo do escudo em `public/badge.png`
2. O app já usa `public/badge.png` em todo o código — aparece automaticamente!
3. Tamanho recomendado: **512x512px**, PNG com fundo transparente

---

## 🚀 Como Rodar

```bash
npm install
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📦 Build para Produção / PWA

```bash
npm run build
```

A pasta `dist/` pode ser hospedada no Vercel, Netlify, etc.

---

*Feito com 💙 para o Debreceni FC · Carmo-RJ · Since 2009*
