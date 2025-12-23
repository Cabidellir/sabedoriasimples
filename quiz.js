const quizData = [
    {
        question: "1. Se todos os filósofos são humanos e Marco Aurélio é um filósofo, logo:",
        options: ["Ele é um deus", "Ele é humano", "Ele é um senador", "Não se pode afirmar"],
        answer: 1
    },
    {
        question: "2. Complete a sequência: 2, 6, 12, 20, ...",
        options: ["28", "32", "30", "40"],
        answer: 2
    },
    {
        question: "3. Qual palavra não pertence ao grupo?",
        options: ["Prudência", "Justiça", "Coragem", "Riqueza"],
        answer: 3
    },
    {
        question: "4. Se ontem fosse amanhã, hoje seria sexta-feira. Que dia é hoje?",
        options: ["Quarta-feira", "Domingo", "Sexta-feira", "Sábado"],
        answer: 1
    },
    {
        question: "5. O pai deste homem é filho do meu pai. Quem está no retrato?",
        options: ["O pai dele", "O filho dele", "Ele mesmo", "O avô dele"],
        answer: 1
    },
    {
        question: "6. Qual é o próximo número na sequência: 1, 1, 2, 3, 5, 8, 13, ...",
        options: ["18", "21", "24", "20"],
        answer: 1 
    },
    {
        question: "7. 'Lápis' está para 'Escrita' assim como 'Martelo' está para:",
        options: ["Madeira", "Ferramenta", "Construção", "Prego"],
        answer: 2 
    },
    {
        question: "8. Se alguns A são B, e todos os B são C, então:",
        options: ["Todos os A são C", "Alguns A são C", "Nenhum A é C", "Todos os C são B"],
        answer: 1 
    },
    {
        question: "9. Numa corrida, se ultrapassares a pessoa que está em segundo lugar, em que posição ficas?",
        options: ["1º lugar", "2º lugar", "3º lugar", "Último lugar"],
        answer: 1 
    },
    {
        question: "10. Se 5 máquinas levam 5 minutos para fazer 5 peças, quanto tempo levam 100 máquinas para fazer 100 peças?",
        options: ["100 minutos", "50 minutos", "5 minutos", "1 minuto"],
        answer: 2 
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");

function loadQuestion() {
    const data = quizData[currentQuestion];
    questionText.innerText = data.question;
    optionsContainer.innerHTML = "";
    
    // Atualiza a barra de progresso (FORA do loop dos botões)
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        const progress = (currentQuestion / quizData.length) * 100;
        progressBar.style.width = progress + "%";
    }
    
    data.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.style.padding = "12px";
        btn.style.cursor = "pointer";
        btn.style.border = "1px solid #C6A667";
        btn.style.background = "white";
        btn.style.borderRadius = "5px";
        btn.style.transition = "0.2s";
        
        // Efeito simples de hover via JS
        btn.onmouseover = () => btn.style.background = "#f9f6f0";
        btn.onmouseout = () => btn.style.background = "white";
        
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].answer) {
        score++;
    }
    
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        // Garante que a barra chegue a 100% no fim
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) progressBar.style.width = "100%";
        showResult();
    }
}

function showResult() {
    questionContainer.style.display = "none";
    
    // Esconder a barra de progresso no resultado para ficar mais limpo
    const progressContainer = document.getElementById("progress-bar-container");
    if (progressContainer) progressContainer.style.display = "none";

    resultContainer.style.display = "block";
    
    let rank = "";
    if(score === 10) rank = "Gênio (145+ QI)";
    else if(score >= 8) rank = "Mente Brilhante (120-135 QI)";
    else if(score >= 6) rank = "Acima da Média (100-115 QI)";
    else if(score >= 4) rank = "Médio (90-100 QI)";
    else rank = "Mente em Desenvolvimento";
    
    scoreText.innerHTML = `Acertaste <strong>${score} de 10</strong>.<br>Nível: <strong>${rank}</strong>`;

    const shareBtn = document.getElementById("share-wa-btn");
    if (shareBtn) {
        shareBtn.onclick = () => {
            const text = `Consegui o nível "${rank}" no Teste de QI do Sabedoria Simples! Consegues bater a minha pontuação? 🤔\n\nFaz o teste aqui: ${window.location.href}`;
            const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
        };
    }
}

loadQuestion();
