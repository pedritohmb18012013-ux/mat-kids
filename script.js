"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     CONFIGURAÇÕES
  ========================================= */

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


  /* =========================================
     ELEMENTOS PRINCIPAIS
  ========================================= */

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

  const answerInput = document.getElementById("answer");


  /* =========================================
     VERIFICAÇÃO
  ========================================= */

  if (
    !home ||
    !lesson ||
    !practice ||
    !result ||
    !additionBtn ||
    !subtractionBtn ||
    !lessonNextBtn ||
    !answerBtn
  ) {
    console.error(
      "Professor Math: elementos do HTML não encontrados."
    );

    return;
  }


  /* =========================================
     VOZ
  ========================================= */

  function speak(text) {

    if (!soundEnabled) {
      return;
    }

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }


  function stopSpeech() {

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }


  function toggleSound() {

    soundEnabled = !soundEnabled;

    if (soundBtn) {

      soundBtn.textContent =
        soundEnabled ? "🔊" : "🔇";
    }

    if (soundEnabled) {

      speak("A voz está ativada.");

    } else {

      stopSpeech();
    }
  }


  /* =========================================
     TELAS
  ========================================= */

  function hideScreens() {

    home.classList.add("hidden");
    lesson.classList.add("hidden");
    practice.classList.add("hidden");
    result.classList.add("hidden");
  }


  function showHome() {

    stopSpeech();

    hideScreens();

    home.classList.remove("hidden");
  }


  /* =========================================
     ESCOLHER OPERAÇÃO
  ========================================= */

  function chooseOperation(type) {

    operation = type;

    lessonStep = 1;

    hideScreens();

    lesson.classList.remove("hidden");

    renderLesson();
  }


  /* =========================================
     AULA
  ========================================= */

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
      document.getElementById("lessonNextBtn");


    if (!title || !text || !content || !step || !next) {
      console.error("Elementos da aula não encontrados.");
      return;
    }


    step.textContent = lessonStep;


    /* =====================================
       ADIÇÃO
    ===================================== */

    if (operation === "addition") {

      if (lessonStep === 1) {

        title.textContent =
          "O que é adição? ➕";

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
            Juntando 3 com 2,
            temos <strong>5</strong>.
          </p>
        `;

        next.textContent = "Continuar →";

        speak(
          "Vamos aprender adição. " +
          "Adicionar significa juntar quantidades. " +
          "Três mais dois é igual a cinco."
        );

        return;
      }


      if (lessonStep === 2) {

        title.textContent =
          "Vamos contar! 🔢";

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
                Mais 1 = <strong>6</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">3</span>
              <span>
                Mais 1 = <strong>7</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">4</span>
              <span>
                Mais 1 = <strong>8</strong>.
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
          "Contamos mais três: seis, sete, oito. " +
          "Então cinco mais três é oito."
        );

        return;
      }


      if (lessonStep === 3) {

        title.textContent =
          "Agora pense comigo! 🧠";

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

            <span class="object">⭐
