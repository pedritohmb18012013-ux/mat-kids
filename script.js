"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // =====================================================
  // PROFESSOR MATH
  // Sistema completo de ensino + prática
  // Compatível com o index.html enviado
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
    console.error("Professor Math: elementos principais não encontrados.");
    return;
  }

  // =====================================================
  // VOZ
  // =====================================================

  function speak(text) {
    if (!soundEnabled) return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);

    voice.lang = "pt-BR";
    voice.rate = 0.88;
    voice.pitch = 1.05;
    voice.volume = 1;

    window.speechSynthesis.speak(voice);
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;

    if (soundBtn) {
      soundBtn.textContent = soundEnabled ? "🔊" : "🔇";
    }

    if (!soundEnabled) {
      stopSpeech();
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

  // =====================================================
  // OPERAÇÃO
  // =====================================================

  function chooseOperation(selectedOperation) {
    operation = selectedOperation;
    lessonStep = 1;

    stopSpeech();
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

    if (lessonStep <= 3) {
      if (operation === "addition") {
        renderAdditionLesson(title, text, content, next);
      } else {
        renderSubtractionLesson(title, text, content, next);
      }
    } else {
      showFinalLesson();
    }
  }

  // =====================================================
  // AULA DE ADIÇÃO
  // =====================================================

  function renderAdditionLesson(title, text, content, next) {
    if (lessonStep === 1) {
      title.textContent = "O que é adição? ➕";
      text.textContent = "Adicionar significa juntar quantidades.";

      content.innerHTML = `
        <h2>Vamos aprender!</h2>

        <p>
          Quando fazemos uma adição, estamos
          <strong>juntando</strong> quantidades.
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
          Então, juntando 3 com 2, temos
          <strong>5</strong>.
        </p>
      `;

      next.textContent = "Continuar →";

      speak(
        "Vamos aprender adição. " +
        "Adicionar significa juntar. " +
        "Três mais dois é igual a cinco."
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
        "Contamos mais três: seis, sete, oito. " +
        "Então cinco mais três é oito."
      );

      return;
    }

    title.textContent = "Agora pense comigo! 🧠";
    text.textContent = "Vamos resolver um exemplo juntos.";

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
  }

  // =====================================================
  // AULA DE SUBTRAÇÃO
  // =====================================================

  function renderSubtractionLesson(title, text, content, next) {
    if (lessonStep === 1) {
      title.textContent = "O que é subtração? ➖";
      text.textContent = "Subtrair significa tirar uma quantidade.";

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

    title.textContent = "Agora vamos pensar! 🧠";
    text.textContent = "Veja como resolver este exemplo.";

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
  }

  // =====================================================
  // FINAL DA AULA
  // =====================================================

  function showFinalLesson() {
    const title = document.getElementById("lessonTitle");
    const text = document.getElementById("lessonText");
    const content = document.getElementById("lessonContent");
    const next = document.getElementById("lessonNextBtn");
    const step = document.getElementById("lessonStep");

    if (!title || !text || !content || !next) return;

    if (step) step.textContent = "4";

    title.textContent = "Você está pronto! 🚀";
    text.textContent = "Agora vamos praticar juntos.";

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
      render
