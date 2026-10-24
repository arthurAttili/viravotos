# Vira Votos

https://viravotos.vercel.app

Roteiro de conversa para quem quer convencer uma pessoa conhecida a votar em Lula no 2º turno de 25/10/2026, ou a ir votar. São 10 perguntas sobre o eleitor; o roteiro sai com abertura, perguntas para ouvir, propostas comparadas com fonte, objeções, o que evitar e plano de voto.

- Site estático em `public/`, sem build e sem dependência. `conteudo.js` guarda perguntas, fatos e regras; `app.js` cuida da interface.
- Nada sai do aparelho: sem analytics, cookie ou formulário. As respostas ficam no `localStorage`.
- No domingo 25/10 o roteiro trava sozinho (art. 39, §5º da Lei 9.504). **Não publicar nada no domingo.**
- Fatos sobre os candidatos vêm dos planos registrados no TSE e de reportagens com data. Correções: abra uma issue.

Site independente, feito por Arthur Attili, eleitor. Textos escritos com ajuda de inteligência artificial e conferidos contra as fontes.
