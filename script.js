"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     PROFESSOR MATH
     Sistema completo de ensino + exercícios
  ===================================================== */

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
  let answered = false;

  const TOTAL_QUESTIONS = 10;


  /* =====================================================
     ELEMENTOS
  ===================================================== */

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


  /* =====================================================
     VERIFICAÇÃO
  ===================================================== */

  const requiredElements = [
    home,
    lesson,
    practice,
    result,
    additionBtn,
    subtractionBtn,
    soundBtn,
    lessonBackBtn,
    lessonNextBtn,
    practiceBackBtn,
    answerBtn,
    hintBtn,
    explainBtn,
    restartBtn,
    homeBtn,
    answerInput
  ];

  if (requiredElements.some(function (element) {
    return !element;
  })) {

    console.error(
      "Professor Math: algum elemento do HTML não foi encontrado."
    );

    return;
  }


  /* =====================================================
     VOZ
  ===================================================== */

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
    voice.rate = 0.88;
    voice.pitch = 1.05;
    voice.volume = 1;

    window.speechSynthesis.speak(voice);
  }


  /* =====================================================
     SOM
  ===================================================== */

  function toggleSound() {

    soundEnabled = !soundEnabled;

    soundBtn.textContent = soundEnabled
      ? "🔊"
      : "🔇";

    if (soundEnabled) {

      speak("A voz está ativada.");

    } else if ("speechSynthesis" in window) {

      window.speechSynthesis.cancel();
    }
  }


  /* =====================================================
     TELAS
  ===================================================== */

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


  /* =====================================================
     ESCOLHER OPERAÇÃO
  ===================================================== */

  function chooseOperation(selectedOperation) {

    operation = selectedOperation;
    lessonStep = 1;

    hideScreens();

    lesson.classList.remove("hidden");

    renderLesson();
  }


  /* =====================================================
     AULA
  ===================================================== */

  function renderLesson() {

    const title = document.getElementById("lessonTitle");
    const text = document.getElementById("lessonText");
    const content = document.getElementById("lessonContent");
    const step = document.getElementById("lessonStep");

    step.textContent = lessonStep;


    /* =================================================
       ADIÇÃO
    ================================================= */

    if (operation === "addition") {

      if (lessonStep === 1) {

        title.textContent = "O que é adição? ➕";

        text.textContent =
          "Adicionar significa juntar.";

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
            Juntando 3 com 2, temos
            <strong>5</strong>.
          </p>
        `;

        lessonNextBtn.textContent = "Continuar →";

        speak(
          "Vamos aprender adição. " +
          "Adicionar significa juntar quantidades. " +
          "Três mais dois é igual a cinco."
        );

      } else if (lessonStep === 2) {

        title.textContent = "Vamos contar! 🔢";

        text.textContent =
          "Podemos usar a contagem para somar.";

        content.innerHTML = `
          <h2>Exemplo: 5 + 3</h2>

          <div class="lesson-example">
            5 + 3 = ?
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

        lessonNextBtn.textContent = "Continuar →";

        speak(
          "Começamos no cinco. " +
          "Depois contamos mais três: " +
          "seis, sete, oito. " +
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

        lessonNextBtn.textContent = "Continuar →";

        speak(
          "Começamos no quatro e contamos mais três. " +
          "Cinco, seis, sete. " +
          "Então quatro mais três é sete."
        );

      } else {

        showFinalLesson();
      }


    /* =================================================
       SUBTRAÇÃO
    ================================================= */

    } else {

      if (lessonStep === 1) {

        title.textContent = "O que é subtração? ➖";

        text.textContent =
          "Subtrair significa tirar.";

        content.innerHTML = `
          <h2>Vamos aprender!</h2>

          <p>
            Quando fazemos uma subtração,
            começamos com uma quantidade
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

        lessonNextBtn.textContent = "Continuar →";

        speak(
          "Vamos aprender subtração. " +
          "Subtrair significa tirar uma quantidade. " +
          "Cinco menos dois é igual a três."
        );

      } else if (lessonStep === 2) {

        title.textContent = "Vamos contar para trás! 🔢";

        text.textContent =
          "Na subtração podemos voltar números.";

        content.innerHTML = `
          <h2>Exemplo: 8 − 3</h2>

          <div class="lesson-example">
            8 − 3 = ?
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
                Voltamos 1 = <strong>7</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">3</span>
              <span>
                Voltamos 1 = <strong>6</strong>.
              </span>
            </div>

            <div class="step">
              <span class="step-number">4</span>
              <span>
                Voltamos 1 = <strong>5</strong>.
              </span>
            </div>

          </div>

          <div class="lesson-example">
            8 − 3 = 5
          </div>
        `;

        lessonNextBtn.textContent = "Continuar →";

        speak(
          "Começamos no oito e voltamos três números. " +
          "Sete, seis, cinco. " +
          "Então oito menos três é cinco."
        );

      } else if (lessonStep === 3) {

        title.textContent = "Agora vamos pensar! 🧠";

        text.textContent =
          "Veja este exemplo.";

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

        lessonNextBtn.textContent = "Continuar →";

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


  /* =====================================================
     FINAL DA AULA
  ===================================================== */

  function showFinalLesson() {

    const title = document.getElementById("lessonTitle");
    const text = document.getElementById("lessonText");
    const content = document.getElementById("lessonContent");

    title.textContent = "Você está pronto! 🚀";

    text.textContent =
      "Agora vamos praticar juntos.";

    content.innerHTML = `
      <h2>Como vamos fazer?</h2>

      <div class="step-list">

        <div class="step">
          <span class="step-number">1</span>
          <span>
            Você lê a conta.
          </span>
        </div>

        <div class="step">
          <span class="step-number">2</span>
          <span>
            Você pensa na resposta.
          </span>
        </div>

        <div class="step">
          <span class="step-number">3</span>
          <span>
            Se precisar, pode pedir uma dica.
          </span>
        </div>

        <div class="step">
          <span class="step-number">4</span>
          <span>
            Se errar, o professor explica.
          </span>
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

    lessonNextBtn.textContent =
      "Começar exercícios 🎯";

    speak(
      "Você está pronto. " +
      "Agora vamos praticar. " +
      "Se precisar, eu vou ajudar você."
    );
  }


  /* =====================================================
     PRÓXIMO PASSO DA AULA
  ===================================================== */

  function nextLesson() {

    if (lessonStep < 4) {

      lessonStep++;

      renderLesson();

    } else {

      startPractice();
    }
  }


  /* =====================================================
     VOLTAR DA AULA
  ===================================================== */

  function backFromLesson() {

    goHome();
  }


  /* =====================================================
     COMEÇAR EXERCÍCIOS
  ===================================================== */

  function startPractice() {

    questionNumber = 0;
    correct = 0;
    wrong = 0;
    score = 0;
    streak = 0;

    answered = false;

    hideScreens();

    practice.classList.remove("hidden");

    updateStats();

    generateQuestion();
  }


  /* =====================================================
     NÚMERO ALEATÓRIO
  ===================================================== */

  function random(min, max) {

    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
  }


  /* =====================================================
     GERAR CONTA
  ===================================================== */

  function generateQuestion() {

    if (questionNumber >= TOTAL_QUESTIONS) {

      finishPractice();

      return;
    }

    questionNumber++;

    answered = false;


    /*
      A dificuldade aumenta conforme
      a criança vai acertando.
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


    number1 = random(1, max);

    number2 = random(
      1,
      Math.min(10, max)
    );


    /*
      Na subtração não permitimos
      resultado negativo.
    */

    if (
      operation === "subtraction" &&
      number2 > number1
    ) {

      const temp = number1;

      number1 = number2;
      number2 = temp;
    }


    if (operation === "addition") {

      correctAnswer =
        number1 + number2;

    } else {

      correctAnswer =
        number1 - number2;
    }


    updateQuestion();

    showVisual();

    const feedback =
      document.getElementById("feedback");

    feedback.classList.add("hidden");

    answerInput.value = "";
    answerInput.disabled = false;

    answerInput.focus();

    updateStats();


    if (operation === "addition") {

      document.getElementById("practiceMessage")
        .textContent =
        "P
