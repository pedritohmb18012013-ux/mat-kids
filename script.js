"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // PROFESSOR MATH
  // Sistema de ensino de adição e subtração
  // =====================================================

  const TOTAL_QUESTIONS = 10;

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
  let hintLevel = 0;

  let soundEnabled = true;
  let waitingNextQuestion = false;

  // =====================================================
  // ELEMENTOS
  // =====================================================

  const home = document.getElementById("home");
  const lesson = document.getElementById("lesson");
  const practice = document.getElementById("practice");
  const result = document.getElementById("result");

  const soundBtn = document.getElementById("soundBtn");

  const additionBtn = document.getElementById("additionBtn");
  const subtractionBtn = document.getElementById("subtractionBtn");

  const lessonBackBtn = document.getElementById("lessonBackBtn");
  const lessonNextBtn = document.getElementById("lessonNextBtn");

  const practiceBackBtn = document.getElementById("practiceBackBtn");

  const answerBtn = document.getElementById("answerBtn");
  const hintBtn = document.getElementById("hintBtn");
  const explainBtn = document.getElementById("explainBtn");

  const restartBtn = document.getElementById("restartBtn");
  const homeBtn = document.getElementById("homeBtn");

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
    if (!soundEnabled) return;

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;

    if (soundBtn) {
      soundBtn.textContent = soundEnabled ? "🔊" : "🔇";
    }

    if (!soundEnabled) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      speak("A voz do Professor Math está ativada.");
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
    stopSpeech();

    hideScreens();
    home.classList.remove("hidden");
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
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
      console.error("Professor Math: elementos da aula não encontrados.");
      return;
    }

    step.textContent = lessonStep;

    if (operation === "addition") {
      renderAdditionLesson(title, text, content, next);
    } else {
      renderSubtractionLesson(title, text, content, next);
    }
  }

  // =====================================================
  // AULA DE ADIÇÃO
  // =====================================================

  function renderAdditionLesson(title, text, content, next) {

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
        "Adicionar significa juntar. " +
        "Três maçãs mais duas maçãs são cinco maçãs."
      );

      return;
    }

    if (lessonStep === 2) {

      title.textContent = "Vamos contar! 🔢";

      text.textContent =
        "Podemos usar a contagem para resolver uma adição.";

      content.innerHTML = `
        <h2>Exemplo: 5 + 3</h2>

        <div class="lesson-example">
          5 + 3
        </div>

        <div class="step-list">

          <div class="step">
            <span class="step-number">1</span>
            <span>Começamos no <strong>5</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">2</span>
            <span>Mais 1 = <strong>6</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">3</span>
            <span>Mais 1 = <strong>7</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">4</span>
            <span>Mais 1 = <strong>8</strong>.</span>
          </div>

        </div>

        <div class="lesson-example">
          5 + 3 = 8
        </div>
      `;

      next.textContent = "Continuar →";

      speak(
        "Começamos no cinco. " +
        "Agora contamos mais três: seis, sete, oito. " +
        "Por isso, cinco mais três é oito."
      );

      return;
    }

    if (lessonStep === 3) {

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
          Começamos no 4 e contamos:
          <strong>5, 6, 7</strong>.
        </p>

        <div class="lesson-example">
          4 + 3 = 7
        </div>
      `;

      next.textContent = "Continuar →";

      speak(
        "Começamos no quatro. " +
        "Contamos mais três: cinco, seis, sete. " +
        "Então quatro mais três é sete."
      );

      return;
    }

    showFinalLesson();
  }

  // =====================================================
  // AULA DE SUBTRAÇÃO
  // =====================================================

  function renderSubtractionLesson(title, text, content, next) {

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
        "Se temos cinco maçãs e tiramos duas, sobram três."
      );

      return;
    }

    if (lessonStep === 2) {

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
            <span>Começamos no <strong>8</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">2</span>
            <span>Voltamos 1 = <strong>7</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">3</span>
            <span>Voltamos 1 = <strong>6</strong>.</span>
          </div>

          <div class="step">
            <span class="step-number">4</span>
            <span>Voltamos 1 = <strong>5</strong>.</span>
          </div>

        </div>

        <div class="lesson-example">
          8 − 3 = 5
        </div>
      `;

      next.textContent = "Continuar →";

      speak(
        "Começamos no oito. " +
        "Voltamos três números: sete, seis, cinco. " +
        "Então oito menos três é cinco."
      );

      return;
    }

    if (lessonStep === 3) {

      title.textContent = "Agora vamos pensar! 🧠";

      text.textContent =
        "Veja como resolver este exemplo.";

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
        "Começamos no sete. " +
        "Voltamos três números: seis, cinco, quatro. " +
        "Então sete menos três é quatro."
      );

      return;
    }

    showFinalLesson();
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
          <span>Leia a conta.</span>
        </div>

        <div class="step">
          <span class="step-number">2</span>
          <span>Pense na resposta.</span>
        </div>

        <div class="step">
          <span class="step-number">3</span>
          <span>Se precisar, peça uma dica.</span>
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
      "Se precisar de ajuda, eu vou explicar."
    );
  }

  // =====================================================
  // PRÓXIMA ETAPA DA AULA
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
  // COMEÇAR PRÁTICA
  // =====================================================

  function startPractice() {

    questionNumber = 0;
    correct = 0;
    wrong = 0;
    score = 0;
    streak = 0;
    hintLevel = 0;
    waitingNextQuestion = false;

    hideScreens();
    practice.classList.remove("hidden");

    updateStats();
    generateQuestion();
  }

  // =====================================================
  // NÚMERO ALEATÓRIO
  // =====================================================

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // =====================================================
  // GERAR CONTA
  // =====================================================

  function generateQuestion() {

    if (questionNumber >= TOTAL_QUESTIONS) {
      finishPractice();
      return;
    }

    waitingNextQuestion = false;

    questionNumber++;
    hintLevel = 0;

    let max;

    // Dificuldade progressiva
    if (correct < 2) {
      max = 10;
    } else if (correct < 5) {
      max = 20;
    } else if (correct < 8) {
      max = 50;
    } else {
      max = 100;
    }

    number1 = random(1, max);

    number2 = random(
      1,
      Math.min(10, max)
    );

    // Subtração nunca fica negativa
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
    resetFeedback();
    resetAnswer();

    updateStats();

    const practiceMessage =
      document.getElementById("practiceMessage");

    if (practiceMessage) {

      if (operation === "addition") {
        practiceMessage.textContent =
          "Pense: estamos juntando os números.";
      } else {
        practiceMessage.textContent =
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
  // ATUALIZAR PERGUNTA
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

    if (!area) return;

    area.innerHTML = "";

    // Só mostra objetos quando os números são pequenos
    if (number1 <= 10 && number2 <= 10) {

      for (let i = 0; i < number1; i++) {

        const item =
          document.createElement("span");

        item.className = "object";

        item.textContent =
          operation === "addition"
            ? "🔵"
            : "🟢";

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

        item.textContent = "🟡";

        area.appendChild(item);
      }
    }
  }

  // =====================================================
  // RESETAR RESPOSTA
  // =====================================================

  function resetAnswer() {

    const input =
      document.getElementById("answer");

    const button =
      document.getElementById("answerBtn");

    if (input) {
      input.value = "";
      input.disabled = false;
      input.focus();
    }

    if (button) {
      button.disabled = false;
      button.textContent =
        "Verificar resposta ✓";
    }
  }

  // =====================================================
  // RESETAR FEEDBACK
  // =====================================================

  function resetFeedback() {

    const feedback =
      document.getElementById("feedback");

    if (feedback) {
      feedback.classList.add("hidden");
    }
  }

  // =====================================================
  // VERIFICAR RESPOSTA
  // =====================================================

  function checkAnswer() {

    if (waitingNextQuestion) {
      return;
    }

    const input =
      document.getElementById("answer");

    if (!input) return;

    const value =
      input.value.trim();

    if (value === "") {

      showFeedback(
        "wrong",
        "💡",
        "Digite uma resposta",
        "<p>Digite um número para podermos verificar.</p>"
      );

      speak(
        "Digite uma resposta primeiro."
      );

      input.focus();

      return;
    }

    const userAnswer =
      Number(value);

    if (
      Number.isFinite(userAnswer) &&
      userAnswer === correctAnswer
    ) {

      correctAnswerHandler();

    } else {

      wrongAnswerHandler(userAnswer);
    }
  }

  // =====================================================
  // ACERTO
  // =====================================================

  function correctAnswerHandler() {

    correct++;
    streak++;

    let points = 10;

    if (streak >= 3) {
      points = 15;
    }

    score += points;

    showFeedback(
      "corre
