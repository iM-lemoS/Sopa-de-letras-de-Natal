# 🎄 Sopa de Letras de Natal - Edição 3D Ballpit

Uma experiência web interativa e festiva de Sopa de Letras (Caça-Palavras), com um fundo 3D dinâmico, interface em vidro (Glassmorphism) e um sistema de pistas misteriosas.

## ✨ Funcionalidades

* **Fundo 3D Interativo:** Utiliza **Three.js** para criar uma piscina de bolas de Natal flutuantes que reagem ao movimento do rato (física de colisão e repulsão).
* **Interface Glassmorphism:** Painéis com efeito de vidro fosco, inspirado em componentes modernos de UI.
* **Modo Mistério:** As palavras não são reveladas inicialmente. O jogador vê uma **dica/frase** e deve encontrar a palavra correspondente na grelha.
* **Animações Suaves:** Texto com gradiente animado e efeitos visuais ao encontrar palavras.
* **Responsivo:** Funciona em Desktop (clique e arraste) e Mobile (toque e arraste).
* **Sem Dependências de Build:** É um ficheiro HTML único, pronto a executar.

## 🚀 Como Executar

Não é necessária instalação de `npm` ou servidores complexos.

1.  **Clonar ou Descarregar** este repositório.
2.  Abrir o ficheiro `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

## 🛠️ Tecnologias Usadas

* **HTML5 & CSS3** (Variáveis CSS, Grid Layout, Keyframe Animations).
* **JavaScript (Vanilla)** (Lógica do jogo e manipulação do DOM).
* **Three.js (r128)** (Renderização do fundo 3D via CDN).
* **Fontes:** Google Fonts (Noto Serif & Noto Sans).

## ⚙️ Como Personalizar

Podes alterar facilmente as palavras e as dicas editando o objeto `gameData` dentro da tag `<script>` no ficheiro `index.html`.

1.  Abra o `index.html` num editor de texto (VS Code, Notepad++, etc).
2.  Procure pela variável `const gameData`.
3.  Altere as palavras (`word`) e as dicas (`hint`):

```javascript
const gameData = [
    { word: "SEU_PALAVRA", hint: "A sua dica aqui." },
    { word: "OUTRA", hint: "Outra dica." },
    // ... adicione mais linhas conforme necessário
];
