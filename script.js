/* =========================================================
   PROFESSOR MATH
   Sistema de ensino de ADIÇÃO e SUBTRAÇÃO

   Funciona somente com HTML + CSS + JavaScript.
   Não precisa de API.
========================================================= */


/* =========================================================
   ESTADO
========================================================= */

let operation = "addition";

let lessonStep = 1;

let currentNumber1 = 0;
let currentNumber2 = 0;
let currentAnswer = 0;

let questionNumber = 0;

let correct = 0;
let wrong = 0;

let score = 0;
let streak = 0;

let hintLevel = 0;

let soundEnabled = true;

const TOTAL_QUESTIONS = 10;


/* =========================================================
   ELEMENTOS
========================================================= */

const home = document.getElementById("home");
const lesson = document.getElementById("lesson");
const practice = document.getElementById("practice");
const result = document.getElementById("result");


/* =========================================================
   VOZ
========================================================= */

function speak(text) {

  if (!soundEnabled) return;

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = "pt-BR";

  speech.rate = 0.88;

  speech.pitch = 1.05;

  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}


function toggleSound() {

  soundEnabled = !soundEnabled;

  const button =
    document.getElementById("soundBtn");

  if (soundEnabled) {

    button.textContent = "🔊";

    speak("A voz está ativada.");

  } else {

    button.textContent = "🔇";

    window.speechSynthesis.cancel();
  }
}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function hideAllScreens() {

  home.classList.add("hidden");

  lesson.classList.add("hidden");

  practice.classList.add("hidden");

  result.classList.add("hidden");
}


function goHome() {

  window.speechSynthesis.cancel();

  hideAllScreens();

  home.classList.remove("hidden");
}


/* =========================================================
   ESCOLHER OPERAÇÃO
========================================================= */

function chooseOperation(selectedOperation) {

  operation = selectedOperation;

  lessonStep = 1;

  hideAllScreens();

  lesson.classList.remove("hidden");

  renderLesson();

}


/* =========================================================
   AULA
========================================================= */

function renderLesson() {

  const title =
    document.getElementById("lessonTitle");

  const text =
    document.getElementById("lessonText");

  const content =
    document.getElementById("lessonContent");

  const step =
    document.getElementById("lessonStep");

  const next =
    document.getElementById("lessonNext");


  step.textContent = lessonStep;


  /* ==========================
     ADIÇÃO
  ========================== */

  if (operation === "addition") {

    if (lessonStep === 1) {

      title.textContent =
        "Primeiro vamos entender a adição! ➕";

      text.textContent =
        "Adição significa juntar quantidades.";

      content.innerHTML = `

        <h2>O que significa somar?</h2>

        <p>
          Quando fazemos uma adição, estamos
          <strong>juntando</strong> uma quantidade
          com outra.
        </p>

        <div class="lesson-objects">
          <span class="object">🍎</span>
          <span class="object">🍎</span>
          <span class="object">🍎</span>
          <span class="object">🍎</span>
          <span class="object">+</span>
          <span class="object">🍎</span>
          <span class="object">🍎</span>
        </div>

        <p>
          Temos 4 maçãs e juntamos mais 2.
        </p>

        <div class="lesson-example">
          4 + 2 = 6
        </div>

        <p>
          Portanto, quando juntamos 4 com 2,
          ficamos com <strong>6</strong>.
        </p>
      `;

      next.textContent = "Aprendi! Continuar →";

      speak(
        "Vamos aprender adição. " +
        "Adicionar significa juntar quantidades."
      );

    }


    else if (lessonStep === 2) {

      title.textContent =
        "Vamos aprender contando! 🔢";

      text.textContent =
        "Uma maneira de somar é continuar contando.";

      content.innerHTML = `

        <h2>Exemplo</h2>

        <div class="lesson-example">
          5 + 3
        </div>

        <div class="step-list">

          <div class="step">
            <span class="step-number">1</span>
            <span>Começamos no número <strong>5</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">2</span>
            <span>Contamos mais 1: <strong>6</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">3</span>
            <span>Contamos mais 1: <strong>7</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">4</span>
            <span>Contamos mais 1: <strong>8</strong>.</span>
          </div>

        </div>

        <div class="lesson-example">
          5 + 3 = 8
        </div>
      `;

      next.textContent = "Vamos praticar juntos →";

      speak(
        "Para fazer 5 mais 3, " +
        "começamos no 5 e contamos mais três vezes. " +
        "Chegamos ao 8."
      );

    }


    else if (lessonStep === 3) {

      title.textContent =
        "Agora você vai tentar! 🎯";

      text.textContent =
        "Eu vou ajudar se você precisar.";

      content.innerHTML = `

        <h2>Exemplo guiado</h2>

        <p>
          Imagine que temos 3 estrelas
          e ganhamos mais 4.
        </p>

        <div class="lesson-objects">

          <span class="object">⭐</span>
          <span class="object">⭐</span>
          <span class="object">⭐</span>

          <span class="object">+</span>

          <span class="object">⭐</span>
          <span class="object">⭐</span>
          <span class="object">⭐</span>
          <span class="object">⭐</span>

        </div>

        <p>
          Conte todas as estrelas.
        </p>

        <div class="lesson-example">
          3 + 4 = ?
        </div>

        <p>
          Pense antes de continuar.
          Na atividade você poderá responder sozinho.
        </p>
      `;

      next.textContent = "Estou pronto! →";

      speak(
        "Agora é sua vez de pensar. " +
        "Conte as estrelas e descubra quanto é 3 mais 4."
      );

    }


    else {

      title.textContent =
        "Você está pronto! 🚀";

      text.textContent =
        "Agora vamos fazer algumas contas.";

      content.innerHTML = `

        <h2>Como vou ajudar?</h2>

        <div class="step-list">

          <div class="step">
            <span class="step-number">1</span>
            <span>Você tenta resolver.</span>
          </div>

          <div class="step">
            <span class="step-number">2</span>
            <span>Se errar, eu explico o caminho.</span>
          </div>

          <div class="step">
            <span class="step-number">3</span>
            <span>Se precisar, você pode pedir uma dica.</span>
          </div>

          <div class="step">
            <span class="step-number">4</span>
            <span>Depois você tenta novamente.</span>
          </div>

        </div>

        <div class="lesson-example">
          🧠 + 💪 = 🌟
        </div>

        <p>
          Errar não significa que você não consegue.
          Significa que ainda estamos aprendendo.
        </p>
      `;

      next.textContent = "Começar exercícios 🎯";

      speak(
        "Você está pronto. " +
        "Agora vamos praticar. " +
        "Se você errar, eu vou explicar e ajudar."
      );
    }

  }


  /* ==========================
     SUBTRAÇÃO
  ========================== */

  else {

    if (lessonStep === 1) {

      title.textContent =
        "Primeiro vamos entender a subtração! ➖";

      text.textContent =
        "Subtrair significa tirar uma quantidade.";

      content.innerHTML = `

        <h2>O que significa subtrair?</h2>

        <p>
          Na subtração começamos com uma quantidade
          e <strong>tiramos</strong> uma parte dela.
        </p>

        <div class="lesson-objects">

          <span class="object">🍎</span>
          <span class="object">🍎</span>
          <span class="object">🍎</span>
          <span class="object">🍎</span>
          <span class="object">🍎</span>

        </div>

        <p>
          Temos 5 maçãs e tiramos 2.
        </p>

        <div class="lesson-example">
          5 − 2 = 3
        </div>

        <p>
          Depois de tirar 2 maçãs,
          sobraram <strong>3</strong>.
        </p>
      `;

      next.textContent = "Aprendi! Continuar →";

      speak(
        "Vamos aprender subtração. " +
        "Subtrair significa tirar uma quantidade."
      );

    }


    else if (lessonStep === 2) {

      title.textContent =
        "Vamos aprender contando para trás! 🔢";

      text.textContent =
        "Podemos subtrair contando para trás.";

      content.innerHTML = `

        <h2>Exemplo</h2>

        <div class="lesson-example">
          8 − 3
        </div>

        <div class="step-list">

          <div class="step">
            <span class="step-number">1</span>
            <span>Começamos no número <strong>8</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">2</span>
            <span>Voltamos 1: <strong>7</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">3</span>
            <span>Voltamos mais 1: <strong>6</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">4</span>
            <span>Voltamos mais 1: <strong>5</strong>.</span>
          </div>

        </div>

        <div class="lesson-example">
          8 − 3 = 5
        </div>
      `;

      next.textContent = "Vamos praticar juntos →";

      speak(
        "Para fazer 8 menos 3, " +
        "começamos no 8 e contamos três números para trás. " +
        "Chegamos ao 5."
      );

    }


    else if (lessonStep === 3) {

      title.textContent =
        "Agora você vai pensar! 🎯";

      text.textContent =
        "Conte para trás para descobrir a resposta.";

      content.innerHTML = `

        <h2>Exemplo guiado</h2>

        <p>
          Temos 7 balões e deixamos 3 deles voarem.
        </p>

        <div class="lesson-objects">

          <span class="object">🎈</span>
          <span class="object">🎈</span>
          <span class="object">🎈</span>
          <span class="object">🎈</span>
          <span class="object">🎈</span>
          <span class="object">🎈</span>
          <span class="object">🎈</span>

        </div>

        <p>
          Se tirarmos 3, quantos ficam?
        </p>

        <div class="lesson-example">
          7 − 3 = ?
        </div>

        <p>
          Pense com calma.
          Na atividade você fará contas sozinho.
        </p>
      `;

      next.textContent = "Estou pronto! →";

      speak(
        "Agora pense. " +
        "Se temos sete balões e tiramos três, " +
        "quantos ficam?"
      );

    }


    else {

      title.textContent =
        "Você está pronto! 🚀";

      text.textContent =
        "Agora vamos praticar.";

      content.innerHTML = `

        <h2>Eu vou ajudar você</h2>

        <div class="step-list">

          <div class="step">
            <span class="step-number">1</span>
            <span>Leia a conta.</span>
          </div>

          <div class="step">
            <span class="step-number">2</span>
            <span>Pense usando os números.</span>
          </div>

          <div class="step">
            <span class="step-number">3</span>
            <span>Se precisar, peça uma dica.</span>
          </div>

          <div class="step">
            <span class="step-number">4</span>
            <span>Se errar, vamos descobrir juntos.</span>
          </div>

        </div>

        <div class="lesson-example">
          🧠 + 💪 = 🌟
        </div>

        <p>
          O objetivo não é apenas acertar.
          É aprender <strong>como pensar</strong>.
        </p>
      `;

      next.textContent = "Começar exercícios 🎯";

      speak(
        "Você está pronto. " +
        "Agora vamos praticar subtração. " +
        "Eu vou ajudar você a entender cada conta."
      );
    }
  }
}


/* =========================================================
   PRÓXIMA PARTE DA AULA
========================================================= */

function nextLesson() {

  if (lessonStep < 4) {

    lessonStep++;

    renderLesson();

  } else {

    startPractice();
  }
}


/* =========================================================
   INICIAR PRÁTICA
========================================================= */

function startPractice() {

  questionNumber = 0;

  correct = 0;

  wrong = 0;

  score = 0;

  streak = 0;

  hintLevel = 0;

  hideAllScreens();

  practice.classList.remove("hidden");

  updateStats();

  generateQuestion();

}


/* =========================================================
   NÚMERO ALEATÓRIO
========================================================= */

function random(min, max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}


/* =========================================================
   GERAR QUESTÃO
========================================================= */

function generateQuestion() {

  if (questionNumber >= TOTAL_QUESTIONS) {

    finishPractice();

    return;
  }


  questionNumber++;

  hintLevel = 0;


  /*
    A dificuldade muda conforme o desempenho.

    Começamos pequeno para ensinar
    antes de aumentar os números.
  */

  let max;

  if (correct < 2) {

    max = 10;

  } else if (correct < 5) {

    max = 20;

  } else if (correct < 8) {

    max = 50;

  } else {

    max = 100;
  }


  currentNumber1 =
    random(1, max);

  currentNumber2 =
    random(1, Math.min(10, max));


  /*
    Na subtração não começamos
    com resultado negativo.
  */

  if (
    operation === "subtraction" &&
    currentNumber2 > currentNumber1
  ) {

    const temp =
      currentNumber1;

    currentNumber1 =
      currentNumber2;

    currentNumber2 =
      temp;
  }


  if (operation === "addition") {

    currentAnswer =
      currentNumber1 +
      currentNumber2;

  } else {

    currentAnswer =
      currentNumber1 -
      currentNumber2;
  }


  updateQuestionScreen();

  showVisual();

  document.getElementById("feedback")
    .classList.add("hidden");

  const input =
    document.getElementById("answer");

  input.value = "";

  input.disabled = false;

  input.focus();

  updateStats();


  /*
    O professor apresenta a conta
    sem dar a resposta.
  */

  if (operation === "addition") {

    document.getElementById("practiceMessage")
      .textContent =
      "Pense: estamos juntando os dois números.";

    speak(
      `Quanto é ${currentNumber1} mais ${currentNumber2}?`
    );

  } else {

    document.getElementById("practiceMessage")
      .textContent =
      "Pense: estamos tirando o segundo número do primeiro.";

    speak(
      `Quanto é ${currentNumber1} menos ${currentNumber2}?`
    );
  }
}


/* =========================================================
   ATUALIZAR QUESTÃO
========================================================= */

function updateQuestionScreen() {

  document.getElementById("questionNumber")
    .textContent = questionNumber;

  document.getElementById("operationLabel")
    .textContent =
      operation === "addition"
        ? "ADIÇÃO"
        : "SUBTRAÇÃO";

  document.getElementById("question")
    .textContent =
      operation === "addition"
        ? `${currentNumber1} + ${currentNumber2} = ?`
        : `${currentNumber1} − ${currentNumber2} = ?`;

  const percent =
    (questionNumber / TOTAL_QUESTIONS) * 100;

  document.getElementById("progress")
    .style.width = `${percent}%`;
}


/* =========================================================
   REPRESENTAÇÃO VISUAL
========================================================= */

function showVisual() {

  const area =
    document.getElementById("visualArea");

  area.innerHTML = "";


  /*
    Para números pequenos,
    mostramos objetos.

    Isso ajuda a criança a
    relacionar número e quantidade.
  */

  if (
    currentNumber1 <= 10 &&
    currentNumber2 <= 10
  ) {

    for (
      let i = 0;
      i < currentNumber1;
      i++
    ) {

      const object =
        document.createElement("span");

      object.className = "object";

      object.textContent =
        operation === "addition"
          ? "🔵"
          : "🟢";

      area.appendChild(object);
    }


    const symbol =
      document.createElement("span");

    symbol.className = "object";

    symbol.textContent =
      operation === "addition"
        ? "➕"
        : "➖";

    area.appendChild(symbol);


    for (
      let i = 0;
      i < currentNumber2;
      i++
    ) {

      const object =
        document.createElement("span");

      object.className = "object";

      object.textContent = "🟡";

      area.appendChild(object);
    }
  }
}


/* =========================================================
   VERIFICAR RESPOSTA
========================================================= */

function checkAnswer() {

  const input =
    document.getElementById("answer");

  const value =
    input.value.trim();


  if (value === "") {

    showFeedback(
      "wrong",
      "💡",
      "Ainda não temos uma resposta.",
      "Digite um número e vamos pensar juntos."
    );

    speak(
      "Digite um número primeiro."
    );

    return;
  }


  const userAnswer =
    Number(value);


  if (userAnswer === currentAnswer) {

    handleCorrect();

  } else {

    handleWrong(userAnswer);
  }
}


/* =========================================================
   ACERTO
========================================================= */

function handleCorrect() {

  correct++;

  streak++;

  /*
    Mais pontos quando existe
    uma sequência de acertos.
  */

  let points = 10;

  if (streak >= 3) {
    points = 15;
  }

  score += points;


  const operationText =
    operation === "addition"
      ? "+"
      : "−";


  showFeedback(
    "correct",
    "🎉",
    "Muito bem! Você acertou!",
    `
      <div>
        <strong>
          ${currentNumber1}
          ${operationText}
          ${currentNumber2}
          =
          ${currentAnswer}
        </strong>
      </div>

      <p>
        Você ganhou ${points} pontos! ⭐
      </p>
    `
  );


  document.getElementById("practiceMessage")
    .textContent =
      streak >= 3
        ? "Uau! Você está em uma sequência incrível! 🔥"
        : "Muito bem! Você pensou direitinho! 👏";


  speak(
    `Muito bem! Você acertou. ` +
    `A resposta é ${currentAnswer}.`
  );


  updateStats();


  /*
    Pequena pausa para a criança
    ver o feedback antes da próxima conta.
  */

  setTimeout(() => {

    generateQuestion();

  }, 1900);
}


/* =========================================================
   ERRO
========================================================= */

function handleWrong(userAnswer) {

  wrong++;

  streak = 0;

  hintLevel = 1;


  const operationText =
    operation === "addition"
      ? "+"
      : "−";


  let explanation;


  if (operation === "addition") {

    explanation = `

      <p>
        Você respondeu
        <strong>${userAnswer}</strong>.
      </p>

      <p>
        Vamos fazer de outro jeito:
        começamos no
        <strong>${currentNumber1}</strong>
        e contamos mais
        <strong>${currentNumber2}</strong>.
      </p>
