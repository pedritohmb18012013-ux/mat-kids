"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // ESTADO DO JOGO
  // =====================================================

  let operation = "addition";

  let lessonStep = 1;

  let number1 = 0;
  let number2 = 0;
  let correctAnswer = 0;

  let questionNumber = 0;
  let correct = 0;
  let wrong = 0;
  let score = 0;
  let streak = 0;

  let soundEnabled = true;

  const TOTAL_QUESTIONS = 10;


  // =====================================================
  // ELEMENTOS
  // =====================================================

  const home = document.getElementById("home");
  const lesson = document.getElementById("lesson");
  const practice = document.getElementById("practice");
  const result = document.getElementById("result");

  const additionBtn = document.getElementById("additionBtn");
  const subtractionBtn = document.getElementById("subtractionBtn");

  const soundBtn = document.getElementById("soundBtn");

  const lessonBackBtn = document.getElementById("lessonBackBtn");
  const lessonNextBtn = document.getElementById("lessonNextBtn");

  const practiceBackBtn = document.getElementById("practiceBackBtn");

  const answerBtn = document.getElementById("answerBtn");
  const hintBtn = document.getElementById("hintBtn");
  const explainBtn = document.getElementById("explainBtn");

  const restartBtn = document.getElementById("restartBtn");
  const homeBtn = document.getElementById("homeBtn");

  const answerInput = document.getElementById("answer");


  // =====================================================
  // VERIFICAÇÃO
  // =====================================================

  if (!home || !lesson || !practice || !result) {
    console.error("Professor Math: telas principais não encontradas.");
    return;
  }


  // =====================================================
  // VOZ
  // =====================================================

  function speak(text) {

    if (!soundEnabled) {
      return;
    }

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);

    voice.lang = "pt-BR";
    voice.rate = 0.85;
    voice.pitch = 1.05;
    voice.volume = 1;

    window.speechSynthesis.speak(voice);
  }


  function toggleSound() {

    soundEnabled = !soundEnabled;

    if (soundBtn) {

      soundBtn.textContent = soundEnabled ? "🔊" : "🔇";

    }

    if (soundEnabled) {

      speak("A voz está ativada.");

    } else {

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

    }
  }


  // =====================================================
  // TELAS
  // =====================================================

  function hideScreens() {

    home.classList.add("hidden");
    lesson.classList.add("hidden");
    practice.classList.add("hidden");
    result.classList.add("hidden");
  }


  function goHome() {

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    hideScreens();

    home.classList.remove("hidden");
  }


  // =====================================================
  // ESCOLHER OPERAÇÃO
  // =====================================================

  function chooseOperation(selectedOperation) {

    operation = selectedOperation;
    lessonStep = 1;

    hideScreens();

    lesson.classList.remove("hidden");

    renderLesson();
  }


  // =====================================================
  // AULA
  // =====================================================

  function renderLesson() {

    const title = document.getElementById("lessonTitle");
    const text = document.getElementById("lessonText");
    const content = document.getElementById("lessonContent");
    const step = document.getElementById("lessonStep");
    const next = document.getElementById("lessonNextBtn");

    if (!title || !text || !content || !step || !next) {
      console.error("Elementos da aula não encontrados.");
      return;
    }

    step.textContent = lessonStep;


    // ===================================================
    // ADIÇÃO
    // ===================================================

    if (operation === "addition") {

      if (lessonStep === 1) {

        title.textContent = "O que é adição? ➕";

        text.textContent =
          "Adicionar significa juntar quantidades.";

        content.innerHTML = `
          <h2>Vamos aprender!</h2>

          <p>
            Quando fazemos uma adição,
            estamos <strong>juntando</strong>
            quantidades.
          </p>

          <div class="lesson-objects">
            <span class="object">🍎</span>
            <span class="object">🍎</span>
            <span class="object">🍎</span>

            <span class="object">➕</span>

            <span class="object">🍎</span>
            <span class="object">🍎</span>
          </div>

          <p>
            Temos 3 maçãs e juntamos mais 2.
          </p>

          <div class="lesson-example">
            3 + 2 = 5
          </div>

          <p>
            Então, juntando 3 com 2,
            temos <strong>5</strong>.
          </p>
        `;

        next.textContent = "Continuar →";

        speak(
          "Vamos aprender adição. " +
          "Adicionar significa juntar quantidades. " +
          "Três mais dois é igual a cinco."
        );

      } else if (lessonStep === 2) {

        title.textContent = "Vamos contar! 🔢";

        text.textContent =
          "Podemos usar a contagem para fazer uma adição.";

        content.innerHTML = `
          <h2>Exemplo: 5 + 3</h2>

          <div class="lesson-example">
            5 + 3
          </div>

          <div class="step-list">

            <div class="step">
              <span class="step-number">1</span>
              <span>
                Começamos no <strong>5</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">2</span>
              <span>
                Contamos mais 1: <strong>6</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">3</span>
              <span>
                Mais 1: <strong>7</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">4</span>
              <span>
                Mais 1: <strong>8</strong>.
              </span>
            </div>

          </div>

          <div class="lesson-example">
            5 + 3 = 8
          </div>
        `;

        next.textContent = "Continuar →";

        speak(
          "Começamos no cinco. " +
          "Depois contamos mais três: seis, sete, oito. " +
          "Então cinco mais três é oito."
        );

      } else if (lessonStep === 3) {

        title.textContent = "Agora pense comigo! 🧠";

        text.textContent =
          "Vamos resolver um exemplo juntos.";

        content.innerHTML = `
          <h2>Temos 4 estrelas ⭐</h2>

          <div class="lesson-objects">
            <span class="object">⭐</span>
            <span class="object">⭐</span>
            <span class="object">⭐</span>
            <span class="object">⭐</span>

            <span class="object">➕</span>

            <span class="object">⭐</span>
            <span class="object">⭐</span>
            <span class="object">⭐</span>
          </div>

          <p>
            Ganhamos mais 3 estrelas.
          </p>

          <div class="lesson-example">
            4 + 3 = ?
          </div>

          <p>
            Comece no 4 e conte mais 3:
            <strong>5, 6, 7</strong>.
          </p>

          <div class="lesson-example">
            4 + 3 = 7
          </div>
        `;

        next.textContent = "Continuar →";

        speak(
          "Começamos no quatro e contamos mais três. " +
          "Cinco, seis, sete. " +
          "Então quatro mais três é sete."
        );

      } else {

        showFinalLesson();
      }


    // ===================================================
    // SUBTRAÇÃO
    // ===================================================

    } else {

      if (lessonStep === 1) {

        title.textContent = "O que é subtração? ➖";

        text.textContent =
          "Subtrair significa tirar uma quantidade.";

        content.innerHTML = `
          <h2>Vamos aprender!</h2>

          <p>
            Na subtração começamos com uma quantidade
            e <strong>tiramos</strong> uma parte.
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
            Sobram <strong>3 maçãs</strong>.
          </p>
        `;

        next.textContent = "Continuar →";

        speak(
          "Vamos aprender subtração. " +
          "Subtrair significa tirar. " +
          "Cinco menos dois é igual a três."
        );

      } else if (lessonStep === 2) {

        title.textContent = "Vamos contar para trás! 🔢";

        text.textContent =
          "Na subtração podemos voltar números.";

        content.innerHTML = `
          <h2>Exemplo: 8 − 3</h2>

          <div class="lesson-example">
            8 − 3
          </div>

          <div class="step-list">

            <div class="step">
              <span class="step-number">1</span>
              <span>
                Começamos no <strong>8</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">2</span>
              <span>
                Voltamos 1: <strong>7</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">3</span>
              <span>
                Voltamos 1: <strong>6</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">4</span>
              <span>
                Voltamos 1: <strong>5</strong>.
              </span>
            </div>

          </div>

          <div class="lesson-example">
            8 − 3 = 5
          </div>
        `;

        next.textContent = "Continuar →";

        speak(
          "Começamos no oito e voltamos três números. " +
          "Sete, seis, cinco. " +
          "Então oito menos três é cinco."
        );

      } else if (lessonStep === 3) {

        title.textContent = "Agora vamos pensar! 🧠";

        text.textContent =
          "Veja o exemplo.";

        content.innerHTML = `
          <h2>Temos 7 balões 🎈</h2>

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
            3 balões foram embora.
          </p>

          <div class="lesson-example">
            7 − 3 = ?
          </div>

          <p>
            Conte três números para trás:
            <strong>6, 5, 4</strong>.
          </p>

          <div class="lesson-example">
            7 − 3 = 4
          </div>
        `;

        next.textContent = "Continuar →";

        speak(
          "Começamos no sete e voltamos três números. " +
          "Seis, cinco, quatro. " +
          "Então sete menos três é quatro."
        );

      } else {

        showFinalLesson();
      }
    }
  }


  // =====================================================
  // FINAL DA AULA
  // =====================================================

  function showFinalLesson() {

    const title = document.getElementById("lessonTitle");
    const text = document.getElementById("lessonText");
    const content = document.getElementById("lessonContent");
    const next = document.getElementById("lessonNextBtn");

    title.textContent = "Você está pronto! 🚀";

    text.textContent =
      "Agora vamos praticar juntos.";

    content.innerHTML = `
      <h2>Como vamos fazer?</h2>

      <div class="step-list">

        <div class="step">
          <span class="step-number">1</span>
          <span>Você lê a conta.</span>
        </div>

        <div class="step">
          <span class="step-number">2</span>
          <span>Você pensa na resposta.</span>
        </div>

        <div class="step">
          <span class="step-number">3</span>
          <span>Se precisar, pode pedir uma dica.</span>
        </div>

        <div class="step">
          <span class="step-number">4</span>
          <span>Se errar, o professor explica.</span>
        </div>

      </div>

      <div class="lesson-example">
        🧠 + 💪 = 🌟
      </div>

      <p>
        O mais importante não é apenas acertar.
        É aprender <strong>como pensar</strong>.
      </p>
    `;

    next.textContent = "Começar exercícios 🎯";

    speak(
      "Você está pronto. " +
      "Agora vamos praticar. " +
      "Se precisar de ajuda, pode pedir uma dica."
    );
  }


  // =====================================================
  // PRÓXIMO PASSO DA AULA
  // =====================================================

  function nextLesson() {

    if (lessonStep < 4) {

      lessonStep++;

      renderLesson();

    } else {

      startPractice();
    }
  }


  // =====================================================
  // VOLTAR DA AULA
  // =====================================================

  function backFromLesson() {

    goHome();
  }


  // =====================================================
  // COMEÇAR PRÁTICA
  // =====================================================

  function startPractice() {

    questionNumber = 0;
    correct = 0;
    wrong = 0;
    score = 0;
    streak = 0;

    hideScreens();

    practice.classList.remove("hidden");

    updateStats();

    generateQuestion();
  }


  // =====================================================
  // NÚMERO ALEATÓRIO
  // =====================================================

  function random(min, max) {

    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
  }


  // =====================================================
  // GERAR QUESTÃO
  // =====================================================

  function generateQuestion() {

    if (questionNumber >= TOTAL_QUESTIONS) {

      finishPractice();

      return;
    }

    questionNumber++;

    let maxNumber = 10;

    if (correct >= 2 && correct < 5) {
      maxNumber = 20;
    } else if (correct >= 5 && correct < 8) {
      maxNumber = 50;
    } else if (correct >= 8) {
      maxNumber = 100;
    }

    number1 = random(1, maxNumber);

    number2 = random(
      1,
      Math.min(10, maxNumber)
    );


    // Evita subtração negativa
    if (
      operation === "subtraction" &&
      number2 > number1
    ) {

      const temp = number1;

      number1 = number2;
      number2 = temp;
    }


    if (operation === "addition") {

      correctAnswer = number1 + number2;

    } else {

      correctAnswer = number1 - number2;
    }


    updateQuestion();

    showVisual();

    const feedback = document.getElementById("feedback");

    if (feedback) {
      feedback.classList.add("hidden");
    }

    if (answerInput) {

      answerInput.value = "";
      answerInput.disabled = false;

      setTimeout(() => {
        answerInput.focus();
      }, 100);
    }


    updateStats();


    const message =
      document.getElementById("practiceMessage");

    if (message) {

      if (operation === "addition") {

        message.textContent =
          "Pense: estamos juntando os números.";

      } else {

        message.textContent =
          "Pense: estamos tirando o segundo número do primeiro.";
      }
    }


    if (operation === "addition") {

      speak(
        `Quanto é ${number1} mais ${number2}?`
      );

    } else {

      speak(
        `Quanto é ${number1} menos ${number2}?`
      );
    }
  }


  // =====================================================
  // ATUALIZAR QUESTÃO
  // =====================================================

  function updateQuestion() {

    const questionNumberElement =
      document.getElementById("questionNumber");

    const operationLabel =
      document.getElementById("operationLabel");

    const question =
      document.getElementById("question");

    const progress =
      document.getElementById("progress");


    if (questionNumberElement) {

      questionNumberElement.textContent =
        questionNumber;
    }


    if (operationLabel) {

      operationLabel.textContent =
        operation === "addition"
          ? "ADIÇÃO"
          : "SUBTRAÇÃO";
    }


    if (question) {

      question.textContent =
        operation === "addition"
          ? `${number1} + ${number2} = ?`
          : `${number1} − ${number2} = ?`;
    }


    if (progress) {

      const percentage =
        (questionNumber / TOTAL_QUESTIONS) * 100;

      progress.style.width =
        `${percentage}%`;
    }
  }


  // =====================================================
  // OBJETOS VISUAIS
  // =====================================================

  function showVisual() {

    const area =
      document.getElementById("visualArea");

    if (!area) {
      return;
    }

    area.innerHTML = "";


    if (number1 <= 10 && number2 <= 10) {

      const firstEmoji =
        operation === "addition" ? "🔵" : "🟢";

      const secondEmoji = "🟡";


      for (let i = 0; i < number1; i++) {

        const item =
          document.createElement("span");

        item.className = "object";
        item.textContent = firstEmoji;

        area.appendChild(item);
      }


      const symbol =
        document.createElement("span");

      symbol.className = "object";

      symbol.textContent =
        operation === "addition"
          ? "➕"
          : "➖";

      area.appendChild(symbol);


      for (let i = 0; i < number2; i++) {

        const item =
          document.createElement("span");

        item.className = "object";
        item.textContent = secondEmoji;

        area.appendChild(item);
      }
    }
  }


  // =====================================================
  // VERIFICAR RESPOSTA
  // =====================================================

  function checkAnswer() {

    if (!answerInput) {
      return;
    }

    const value =
      answerInput.value.trim();


    if (value === "") {

      showFeedback(
        "wrong",
        "💡",
        "Digite uma resposta",
        "<p>Digite um número para eu verificar.</p>"
      );

      speak("Digite uma resposta primeiro.");

      return;
    }


    const userAnswer =
      Number(value);


    if (
      Number.isFinite(userAnswer) &&
      userAnswer === correctAnswer
    ) {

      handleCorrectAnswer();

    } else {

      handleWrongAnswer(userAnswer);
    }
  }


  // =====================================================
  // RESPOSTA CERTA
  // =====================================================

  function handleCorrectAnswer() {

    correct++;
    streak++;

    const points =
      streak >= 3 ? 15 : 10;

    score += points;


    showFeedback(
      "correct",
      "🎉",
      "Muito bem! Você acertou!",
      `
        <p>
          <strong>
            ${number1}
            ${operation === "addition" ? "+" : "−"}
            ${number2}
            =
            ${correctAnswer}
          </strong>
        </p>

        <p>
          Você ganhou ${points} pontos! ⭐
