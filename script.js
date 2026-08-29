"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     ESTADO
  ========================================= */

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

  const TOTAL_QUESTIONS = 10;


  /* =========================================
     ELEMENTOS
  ========================================= */

  const home =
    document.getElementById("home");

  const lesson =
    document.getElementById("lesson");

  const practice =
    document.getElementById("practice");

  const result =
    document.getElementById("result");


  /* =========================================
     VERIFICAR ELEMENTOS
  ========================================= */

  if (
    !home ||
    !lesson ||
    !practice ||
    !result
  ) {

    console.error(
      "Professor Math: elementos principais não encontrados."
    );

    return;
  }


  /* =========================================
     VOZ
  ========================================= */

  function speak(text) {

    if (!soundEnabled) return;

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const voice =
      new SpeechSynthesisUtterance(text);

    voice.lang = "pt-BR";
    voice.rate = 0.88;
    voice.pitch = 1.05;
    voice.volume = 1;

    window.speechSynthesis.speak(voice);
  }


  function toggleSound() {

    soundEnabled = !soundEnabled;

    const button =
      document.getElementById("soundBtn");

    if (soundEnabled) {

      button.textContent = "🔊";

      speak(
        "A voz está ativada."
      );

    } else {

      button.textContent = "🔇";

      window.speechSynthesis.cancel();
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


  function goHome() {

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    hideScreens();

    home.classList.remove("hidden");
  }


  /* =========================================
     ESCOLHER OPERAÇÃO
  ========================================= */

  function chooseOperation(selectedOperation) {

    operation = selectedOperation;

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


    step.textContent = lessonStep;


    /* =====================================
       ADIÇÃO
    ===================================== */

    if (operation === "addition") {

      if (lessonStep === 1) {

        title.textContent =
          "O que é adição? ➕";

        text.textContent =
          "Adicionar significa juntar.";

        content.innerHTML = `

          <h2>Vamos aprender!</h2>

          <p>
            Quando fazemos uma adição,
            estamos <strong>juntando</strong>
            duas ou mais quantidades.
          </p>

          <div class="lesson-objects">

            <span class="object">🍎</span>
            <span class="object">🍎</span>
            <span class="object">🍎</span>

            <span class="object">+</span>

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
            Portanto, juntando 3 com 2,
            temos <strong>5</strong>.
          </p>

        `;

        next.textContent =
          "Continuar →";

        speak(
          "Vamos aprender adição. " +
          "Adicionar significa juntar quantidades."
        );

      }

      else if (lessonStep === 2) {

        title.textContent =
          "Podemos contar! 🔢";

        text.textContent =
          "Vamos usar a contagem para fazer a conta.";

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

        next.textContent =
          "Continuar →";

        speak(
          "Começamos no cinco. " +
          "Depois contamos mais três: seis, sete, oito. " +
          "Então cinco mais três é oito."
        );

      }

      else if (lessonStep === 3) {

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

            <span class="object">+</span>

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

        next.textContent =
          "Continuar →";

        speak(
          "Começamos no quatro e contamos mais três. " +
          "Cinco, seis, sete. " +
          "Então quatro mais três é sete."
        );

      }

      else {

        showFinalLesson();

      }

    }


    /* =====================================
       SUBTRAÇÃO
    ===================================== */

    else {

      if (lessonStep === 1) {

        title.textContent =
          "O que é subtração? ➖";

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

        next.textContent =
          "Continuar →";

        speak(
          "Vamos aprender subtração. " +
          "Subtrair significa tirar uma quantidade."
        );

      }

      else if (lessonStep === 2) {

        title.textContent =
          "Vamos contar para trás! 🔢";

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

        next.textContent =
          "Continuar →";

        speak(
          "Começamos no oito e voltamos três números. " +
          "Sete, seis, cinco. " +
          "Então oito menos três é cinco."
        );

      }

      else if (lessonStep === 3) {

        title.textContent =
          "Agora vamos pensar! 🧠";

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

        next.textContent =
          "Continuar →";

        speak(
          "Começamos no sete e voltamos três números. " +
          "Seis, cinco, quatro. " +
          "Então sete menos três é quatro."
        );

      }

      else {

        showFinalLesson();

      }

    }
  }


  /* =========================================
     ÚLTIMA PARTE DA AULA
  ========================================= */

  function showFinalLesson() {

    const title =
      document.getElementById("lessonTitle");

    const text =
      document.getElementById("lessonText");

    const content =
      document.getElementById("lessonContent");

    const next =
      document.getElementById("lessonNextBtn");


    title.textContent =
      "Você está pronto! 🚀";

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

    next.textContent =
      "Começar exercícios 🎯";


    speak(
      "Você está pronto. " +
      "Agora vamos praticar. " +
      "Se precisar, eu vou ajudar você."
    );
  }


  /* =========================================
     PRÓXIMO PASSO
  ========================================= */

  function nextLesson() {

    if (lessonStep < 4) {

      lessonStep++;

      renderLesson();

    } else {

      startPractice();
    }
  }


  /* =========================================
     COMEÇAR PRÁTICA
  ========================================= */

  function startPractice() {

    questionNumber = 0;
    correct = 0;
    wrong = 0;
    score = 0;
    streak = 0;
    hintLevel = 0;

    hideScreens();

    practice.classList.remove("hidden");

    updateStats();

    generateQuestion();
  }


  /* =========================================
     ALEATÓRIO
  ========================================= */

  function random(min, max) {

    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
  }


  /* =========================================
     GERAR CONTA
  ========================================= */

  function generateQuestion() {

    if (questionNumber >= TOTAL_QUESTIONS) {

      finishPractice();

      return;
    }


    questionNumber++;

    hintLevel = 0;


    /*
      A dificuldade começa pequena.
      Conforme a criança acerta,
      os números aumentam.
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

    number2 =
      random(
        1,
        Math.min(10, max)
      );


    /*
      Evitar resultado negativo
      no começo.
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


    const input =
      document.getElementById("answer");

    input.value = "";

    input.disabled = false;

    input.focus();


    updateStats();


    if (operation === "addition") {

      document.getElementById("practiceMessage")
        .textContent =
        "Pense: estamos juntando os números.";

      speak(
        `Quanto é ${number1} mais ${number2}?`
      );

    } else {

      document.getElementById("practiceMessage")
        .textContent =
        "Pense: estamos tirando o segundo número do primeiro.";

      speak(
        `Quanto é ${number1} menos ${number2}?`
      );
    }
  }


  /* =========================================
     ATUALIZAR CONTA
  ========================================= */

  function updateQuestion() {

    document.getElementById("questionNumber")
      .textContent =
      questionNumber;


    document.getElementById("operationLabel")
      .textContent =
      operation === "addition"
        ? "ADIÇÃO"
        : "SUBTRAÇÃO";


    document.getElementById("question")
      .textContent =
      operation === "addition"
        ? `${number1} + ${number2} = ?`
        : `${number1} − ${number2} = ?`;


    const percentage =
      (questionNumber / TOTAL_QUESTIONS) * 100;


    document.getElementById("progress")
      .style.width =
      `${percentage}%`;
  }


  /* =========================================
     OBJETOS VISUAIS
  ========================================= */

  function showVisual() {

    const area =
      document.getElementById("visualArea");

    area.innerHTML = "";


    if (
      number1 <= 10 &&
      number2 <= 10
    ) {

      for (
        let i = 0;
        i < number1;
        i++
      ) {

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


      for (
        let i = 0;
        i < number2;
        i++
      ) {

        const item =
          document.createElement("span");

        item.className = "object";

        item.textContent = "🟡";

        area.appendChild(item);
      }
    }
  }


  /* =========================================
     VERIFICAR
  ========================================= */

  function checkAnswer() {

    const input =
      document.getElementById("answer");

    const value =
      input.value.trim();


    if (value === "") {

      showFeedback(
        "wrong",
        "💡",
        "Digite uma resposta",
        "Digite um número para podermos verificar."
      );

      speak(
        "Digite uma resposta primeiro."
      );

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


  /* =========================================
     ACERTO
  ========================================= */

  function correctAnswerHandler() {

    correct++;

    streak++;


    let points = 10;

    if (streak >= 3) {
      points = 15;
    }

    score += points;


    showFeedback(
      "correct",
      "🎉",
      "Muito bem! Você acertou!",
      `
        <div>
          <strong>
            ${number1}
            ${operation === "addition" ? "+" : "−"}
            ${number2}
            =
            ${correctAnswer}
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
        ? "Você está mandando muito bem! 🔥"
        : "Muito bem! Você pensou direitinho! 👏";


    speak(
      `Muito bem! Você acertou. ` +
      `A resposta é ${correctAnswer}.`
    );


    updateStats();


    setTimeout(function () {

      generateQuestion();

    }, 1800);
  }


  /* =========================================
     ERRO
  ========================================= */

  function wrongAnswerHandler(userAnswer) {

    wrong++;

    streak = 0;

    hintLevel = 1;


    const symbol =
      operation === "addition"
        ? "+"
        : "−";


    let explanation = "";


    if (operation === "addition") {

      explanation = `

        <p>
          Você respondeu
          <strong>${userAnswer}</strong>.
        </p>

        <p>
          Vamos devagar.
        </p>

        <p>
          Começamos no
          <strong>${number1}</strong>
          e contamos mais
          <strong>${number2}</strong>.
        </p>

        ${createCountingSteps(
          number1,
          number2,
          true
        )}

        <p>
          Portanto:
          <strong>
            ${number1}
            +
            ${number2}
            =
            ${correctAnswer}
          </strong>
        </p>

      `;

    } else {

      explanat
