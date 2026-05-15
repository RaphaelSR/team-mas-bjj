# Team MAS BJJ

Landing page oficial da academia **Team MAS Brazilian Jiu-Jitsu**, com sedes em Buenos Aires e Rosario, Argentina.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3
- GSAP + ScrollTrigger (animações e parallax)
- three.js (shader GLSL na seção de contato)
- Formspree (formulário de contato)
- i18n próprio: Espanhol / Português / Inglês

## Estrutura

```
src/
├── sections/       # Spatial (hero), Philosophy, Works (sedes), Capabilities (programas), Hero (contato), Header, Footer, Preloader
├── data/           # gyms.ts — fonte de verdade das 4 sedes
├── i18n/           # translations.ts — strings em ES/PT/EN
└── components/ui/  # componentes base (button, input, textarea, etc.)
public/
├── images/         # logo e fotos das sedes
└── videos/         # hero-loop.mp4, training-reel.mp4
```

## Desenvolvimento local

```bash
npm install
cp .env.example .env   # configure VITE_FORMSPREE_ENDPOINT
npm run dev
```

## Deploy

O projeto é deployado automaticamente no **GitHub Pages** via GitHub Actions a cada push na branch `main`.

URL: [https://raphaelsr.github.io/team-mas-bjj/](https://raphaelsr.github.io/team-mas-bjj/)

### Configurar o formulário de contato

1. Crie uma conta gratuita em [formspree.io](https://formspree.io)
2. Crie um novo form e copie o endpoint (ex: `https://formspree.io/f/xpzgwkjq`)
3. Adicione em `Settings → Secrets and variables → Actions`:
   - `VITE_FORMSPREE_ENDPOINT` = seu endpoint

### Ativar GitHub Pages após o primeiro deploy

`Settings → Pages → Source: Deploy from a branch → Branch: gh-pages → Save`

## Sedes

| Sede | Endereço | Instagram |
|------|----------|-----------|
| Buenos Aires | Av. Congreso 2752 | [@team_mas_buenosaires](https://instagram.com/team_mas_buenosaires) |
| Olivos | Olivos, Buenos Aires | [@team_mas_olivos](https://instagram.com/team_mas_olivos) |
| Villa Urquiza | Av. de los Constituyentes 4584 | [@team_mas_urquiza](https://instagram.com/team_mas_urquiza) |
| Rosario | Colón 1751 | [@team_mas_bjj](https://instagram.com/team_mas_bjj) |
