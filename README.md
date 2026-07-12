# Sabedoria Simples

Site de filosofia prática, estoicismo, minimalismo digital e psicologia para uma vida mais intencional.

**Live:** https://cabidellir.github.io/sabedoriasimples/

---

## 🚀 Como Publicar um Novo Artigo Diariamente (em menos de 5 minutos)

Este site foi projetado para ser **fácil de atualizar todos os dias**.

### Passo a Passo Simples:

1. **Crie o artigo**
   - Copie o arquivo `template-artigo.html` (criei para você)
   - Renomeie para algo como `posts/seu-titulo-aqui.html`
   - Escreva o conteúdo mantendo a estrutura (título, introdução, seções com h2, etc.)

2. **Adicione no `artigos.json`**
   - É o único arquivo que você precisa editar para o artigo aparecer no site.
   - Adicione no **início** do array (para aparecer como mais recente):

```json
{
  "titulo": "Título do Seu Artigo",
  "tag": "Estoicismo",           // ou: Filosofia Prática, Minimalismo Digital, Psicologia, Autoconhecimento...
  "imagem": "assets/img/sua-imagem.jpg",  // use uma das existentes ou adicione nova
  "resumo": "Um resumo curto e atraente de 1-2 frases.",
  "link": "posts/seu-titulo-aqui.html",
  "data": "12 de Julho de 2026",
  "leitura": "7 min"
}
```

3. **Faça commit e push**
   ```bash
   git add .
   git commit -m "feat: novo artigo - Título do artigo"
   git push
   ```

O site atualiza automaticamente em poucos minutos!

---

## ⚡ Automação Diária (O que eu configurei para você)

Criei uma **GitHub Action** que todo dia às 08:00 (horário de Portugal) cria automaticamente uma **Issue** com o template pronto para você preencher. 

Isso ajuda a manter o hábito de publicar diariamente.

Você pode desativar ou ajustar o horário depois.

---

## Melhorias que fiz no site:

- Design mais sereno e elegante (cores calmantes + melhor tipografia para leitura longa)
- Sistema de tempo de leitura nos artigos
- Filtros e busca aprimorados na página de artigos
- Template fácil para novos artigos
- Correção de links quebrados no JSON
- Guia completo no README
- Pequenas melhorias de performance e UX

---

## Estrutura do Projeto

- `index.html` → Homepage com destaques
- `artigos.html` → Biblioteca completa com filtros
- `artigos.json` → Fonte única de verdade dos artigos (edite aqui!)
- `posts/` → Artigos individuais em HTML
- `template-artigo.html` → Template pronto para copiar
- `style.css` + `js/main.js` → Estilos e lógica

---

Qualquer dúvida ou se quiser que eu crie o próximo artigo junto com você, é só pedir! 🙏
