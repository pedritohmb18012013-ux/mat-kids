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
      renderLesson();
    } else {
      startPractice();
    }
  }

  // =====================================================
  // PRÁTICA
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
  // ALEATÓRIO
  // =====================================================

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // =====================================================
  // GERAR QUESTÃO
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

    if (operation === "addition") {
      number2 = random(1, Math.min(10, max));
      correctAnswer = number1 + number2;
    } else {
      number2 = random(1, Math.min(10, number1));
      correctAnswer = number1 - number2;
    }

    updateQuestion();
    showVisual();
    resetFeedback();
    resetAnswer();
    updateStats();

    const message = document.getElementById("practiceMessage");

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
      speak(`Quanto é ${number1} mais ${number2}?`);
    } else {
      speak(`Quanto é ${number1} menos ${number2}?`);
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
      questionNumberElement.textContent = questionNumber;
    }

    if (operationLabel) {
      operationLabel.textContent =
        operation === "addition" ? "ADIÇÃO" : "SUBTRAÇÃO";
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

      progress.style.width = `${percentage}%`;
    }
  }

  // =====================================================
  // VISUAL
  // =====================================================

  function showVisual() {
    const area = document.getElementById("visualArea");

    if (!area) return;

    area.innerHTML = "";

    if (number1 <= 10 && number2 <= 10) {
      for (let i = 0; i < number1; i++) {
        const item = document.createElement("span");
        item.className = "object";
        item.textContent =
          operation === "addition" ? "🔵" : "🟢";
        area.appendChild(item);
      }

      const symbol = document.createElement("span");
      symbol.className = "object";
      symbol.textContent =
        operation === "addition" ? "➕" : "➖";
      area.appendChild(symbol);

      for (let i = 0; i < number2; i++) {
        const item = document.createElement("span");
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
    const input = document.getElementById("answer");
    const button = document.getElementById("answerBtn");

    if (input) {
      input.value = "";
      input.disabled = false;

      setTimeout(function () {
        try {
          input.focus();
        } catch (e) {}
      }, 50);
    }

    if (button) {
      button.disabled = false;
      button.textContent = "Verificar resposta ✓";
    }
  }

  // =====================================================
  // RESETAR FEEDBACK
  // =====================================================

  function resetFeedback() {
    const feedback = document.getElementById("feedback");

    if (feedback) {
      feedback.classList.add("hidden");
    }
  }

  // =====================================================
  // VERIFICAR RESPOSTA
  // =====================================================

  function checkAnswer() {
    if (waitingNextQuestion) return;

    const input = document.getElementById("answer");

    if (!input) return;

    const value = input.value.trim();

    if (value === "") {
      showFeedback(
        "wrong",
        "💡",
        "Digite uma resposta",
        "<p>Digite um número para podermos verificar.</p>"
      );

      speak("Digite uma resposta primeiro.");
      input.focus();

      return;
    }

    const userAnswer = Number(value);

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
  // ACERTO
  // =====================================================

  function handleCorrectAnswer() {
    correct++;
    streak++;

    const points = streak >= 3 ? 15 : 10;
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
        </p>
      `
    );

    const message = document.getElementById("practiceMessage");

    if (message) {
      message.textContent =
        streak >= 3
          ? "Você está mandando muito bem! 🔥"
          : "Muito bem! Você pensou direitinho! 👏";
    }

    speak(
      `Muito bem! Você acertou. ` +
      `A resposta é ${correctAnswer}.`
    );

    updateStats();

    waitingNextQuestion = true;

    const input = document.getElementById("answer");
    const button = document.getElementById("answerBtn");

    if (input) input.disabled = true;
    if (button) button.disabled = true;

    setTimeout(function () {
      generateQuestion();
    }, 1600);
  }

  // =====================================================
  // ERRO
  // =====================================================

  function handleWrongAnswer(userAnswer) {
    wrong++;
    streak = 0;
    hintLevel = 1;

    let explanation = "";

    if (operation === "addition") {
      explanation = `
        <p>
          Você respondeu <strong>${userAnswer}</strong>.
        </p>

        <p>
          Vamos pensar juntos.
        </p>

        <p>
          Começamos no <strong>${number1}</strong>
          e contamos mais <strong>${number2}</strong>.
        </p>

        ${createCountingSteps(number1, number2, true)}

        <p>
          Portanto:
          <strong>
            ${number1} + ${number2} = ${correctAnswer}
          </strong>
        </p>
      `;
    } else {
      explanation = `
        <p>
          Você respondeu <strong>${userAnswer}</strong>.
        </p>

        <p>
          Vamos pensar juntos.
        </p>

        <p>
          Começamos no <strong>${number1}</strong>
          e voltamos <strong>${number2}</strong>.
        </p>

        ${createCountingSteps(number1, number2, false)}

        <p>
          Portanto:
          <strong>
            ${number1} − ${number2} = ${correctAnswer}
          </strong>
        </p>
      `;
    }

    showFeedback(
      "wrong",
      "💡",
      "Quase! Vamos aprender juntos.",
      explanation
    );

    const message = document.getElementById("practiceMessage");

    if (message) {
      message.textContent =
        "Não tem problema errar. Vamos entender juntos! 💪";
    }

    speak(
      `Não tem problema. Vamos aprender. ` +
      `A resposta correta é ${correctAnswer}.`
    );

    updateStats();
  }

  // =====================================================
  // PASSOS DE CONTAGEM
  // =====================================================

  function createCountingSteps(start, amount, adding) {
    let html = '<div class="step-list">';

    let current = start;

    for (let i = 1; i <= amount; i++) {
      current = adding ? current + 1 : current - 1;

      html += `
        <div class="step">
          <span class="step-number">${i}</span>
          <span>
            ${adding ? "Mais" : "Menos"} 1 =
            <strong>${current}</strong>
          </span>
        </div>
      `;
    }

    html += "</div>";

    return html;
  }

  // =====================================================
  // FEEDBACK
  // =====================================================

  function showFeedback(type, icon, title, text) {
    const feedback = document.getElementById("feedback");
    const feedbackIcon = document.getElementById("feedbackIcon");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackText = document.getElementById("feedbackText");

    if (!feedback) return;

    feedback.classList.remove("hidden");

    if (feedbackIcon) {
      feedbackIcon.textContent = icon;
    }

    if (feedbackTitle) {
      feedbackTitle.textContent = title;
    }

    if (feedbackText) {
      feedbackText.innerHTML = text;
    }

    feedback.classList.remove("feedback-correct");
    feedback.classList.remove("feedback-wrong");

    if (type === "correct") {
      feedback.classList.add("feedback-correct");
    } else {
      feedback.classList.add("feedback-wrong");
    }
  }

  // =====================================================
  // DICA
  // =====================================================

  function giveHint() {
    if (waitingNextQuestion) return;

    hintLevel++;

    let text = "";

    if (operation === "addition") {
      if (hintLevel === 1) {
        text = `
          <p>
            💡 Comece no <strong>${number1}</strong>
            e conte mais <strong>${number2}</strong>.
          </p>
        `;

        speak(
          `Comece no ${number1} e conte mais ${number2}.`
        );
      } else if (hintLevel === 2) {
        text = `
          <p>
            Conte assim:
            <strong>${getCountingText(number1, number2, true)}</strong>
          </p>
        `;

        speak(
          `Conte: ${getCountingSpeech(number1, number2, true)}.`
        );
      } else {
        text = `
          <p>
            🔎 A resposta está bem perto!
          </p>

          <p>
            <strong>${number1} + ${number2} = ${correctAnswer}</strong>
          </p>
        `;

        speak(`A resposta é ${correctAnswer}.`);
      }
    } else {
      if (hintLevel === 1) {
        text = `
          <p>
            💡 Comece no <strong>${number1}</strong>
            e volte <strong>${number2}</strong> números.
          </p>
        `;

        speak(
          `Comece no ${number1} e volte ${number2} números.`
        );
      } else if (hintLevel === 2) {
        text = `
          <p>
            Conte para trás:
            <strong>${getCountingText(number1, number2, false)}</strong>
          </p>
        `;

        speak(
          `Conte para trás: ${getCountingSpeech(number1, number2, false)}.`
        );
      } else {
        text = `
          <p>
            🔎 Vamos conferir juntos:
          </p>

          <p>
            <strong>${number1} − ${number2} = ${correctAnswer}</strong>
          </p>
        `;

        speak(`A resposta é ${correctAnswer}.`);
      }
    }

    showFeedback(
      "wrong",
      "💡",
      "Dica do Professor",
      text
    );
  }

  // =====================================================
  // TEXTO DE CONTAGEM
  // =====================================================

  function getCountingText(start, amount, adding) {
    const numbers = [];
    let current = start;

    for (let i = 0; i < amount; i++) {
      current = adding ? current + 1 : current - 1;
      numbers.push(current);
    }

    return numbers.join(", ");
  }

  function getCountingSpeech(start, amount, adding) {
    return getCountingText(start, amount, adding)
      .replace(/, /g, ", ");
  }

  // =====================================================
  // EXPLICAR
  // =====================================================

  function explainQuestion() {
    if (waitingNextQuestion) return;

    let text = "";

    if (operation === "addition") {
      text = `
        <p>
          ➕ Na adição, nós <strong>juntamos</strong>.
        </p>

        <p>
          Temos ${number1} e juntamos mais ${number2}.
        </p>

        ${createCountingSteps(number1, number2, true)}

        <div class="lesson-example">
          ${number1} + ${number2} = ${correctAnswer}
        </div>
      `;

      speak(
        `Na adição nós juntamos. ` +
        `Começamos no ${number1} e contamos mais ${number2}. ` +
        `A resposta é ${correctAnswer}.`
      );
    } else {
      text = `
        <p>
          ➖ Na subtração, nós <strong>tiramos</strong>.
        </p>

        <p>
          Temos ${number1} e tiramos ${number2}.
        </p>

        ${createCountingSteps(number1, number2, false)}

        <div class="lesson-example">
          ${number1} − ${number2} = ${correctAnswer}
        </div>
      `;

      speak(
        `Na subtração nós tiramos. ` +
        `Começamos no ${number1} e voltamos ${number2}. ` +
        `A resposta é ${correctAnswer}.`
      );
    }

    showFeedback(
      "wrong",
      "🧑‍🏫",
      "Vamos aprender!",
      text
    );
  }

  // =====================================================
  // ESTATÍSTICAS
  // =====================================================

  function updateStats() {
    const scoreElement = document.getElementById("score");
    const correctElement = document.getElementById("correct");
    const wrongElement = document.getElementById("wrong");
    const accuracyElement = document.getElementById("accuracy");
    const streakElement = document.getElementById("streak");

    if (scoreElement) {
      scoreElement.textContent = score;
    }

    if (correctElement) {
      correctElement.textContent = correct;
    }

    if (wrongElement) {
      wrongElement.textContent = wrong;
    }

    if (streakElement) {
      streakElement.textContent = streak;
    }

    if (accuracyElement) {
      const attempts = correct + wrong;

      const accuracy =
        attempts === 0
          ? 0
          : Math.round((correct / attempts) * 100);

      accuracyElement.textContent = `${accuracy}%`;
    }
  }

  // =====================================================
  // FINALIZAR
  // =====================================================

  function finishPractice() {
    waitingNextQuestion = true;
    stopSpeech();

    hideScreens();
    result.classList.remove("hidden");

    const accuracy =
      correct + wrong === 0
        ? 0
        : Math.round((correct / (correct + wrong)) * 100);

    const finalScore =
      document.getElementById("finalScore");

    const finalCorrect =
      document.getElementById("finalCorrect");

    const finalWrong =
      document.getElementById("finalWrong");

    const finalAccuracy =
      document.getElementById("finalAccuracy");

    const resultTitle =
      document.getElementById("resultTitle");

    const resultText =
      document.getElementById("resultText");

    const resultEmoji =
      document.getElementById("resultEmoji");

    const resultMessage =
      document.getElementById("resultMessage");

    if (finalScore) {
      finalScore.textContent = score;
    }

    if (finalCorrect) {
      finalCorrect.textContent = correct;
    }

    if (finalWrong) {
      finalWrong.textContent = wrong;
    }

    if (finalAccuracy) {
      finalAccuracy.textContent = `${accuracy}%`;
    }

    if (accuracy >= 90) {
      if (resultEmoji) resultEmoji.textContent = "🏆";
      if (resultTitle) resultTitle.textContent = "Incrível!";
      if (resultText) {
        resultText.textContent =
          "Você mostrou que sabe muito de matemática!";
      }
      if (resultMessage) {
        resultMessage.innerHTML =
          "Você está pronto para um desafio ainda maior! 🌟";
      }
    } else if (accuracy >= 70) {
      if (resultEmoji) resultEmoji.textContent = "🎉";
      if (resultTitle) resultTitle.textContent = "Muito bem!";
      if (resultText) {
        resultText.textContent =
          "Você está aprendendo muito bem!";
      }
      if (resultMessage) {
        resultMessage.innerHTML =
          "Continue praticando e você ficará ainda melhor! 💪";
      }
    } else {
      if (resultEmoji) resultEmoji.textContent = "🌱";
      if (resultTitle) resultTitle.textContent = "Boa tentativa!";
      if (resultText) {
        resultText.textContent =
          "Errar também faz parte de aprender.";
      }
      if (resultMessage) {
        resultMessage.innerHTML =
          "Vamos praticar mais um pouco. O Professor Math está aqui para ajudar! 🧑‍🏫";
      }
    }

    speak(
      `Você terminou. ` +
      `Acertou ${correct} de ${TOTAL_QUESTIONS}. ` +
      `Sua precisão foi de ${accuracy} por cento. ` +
      `Você fez ${score} pontos.`
    );
  }

  // =====================================================
  // EVENTOS DOS BOTÕES
  // =====================================================

  if (soundBtn) {
    soundBtn.addEventListener("click", toggleSound);
  }

  if (additionBtn) {
    additionBtn.addEventListener("click", function () {
      chooseOperation("addition");
    });
  }

  if (subtractionBtn) {
    subtractionBtn.addEventListener("click", function () {
      chooseOperation("subtraction");
    });
  }

  if (lessonBackBtn) {
    lessonBackBtn.addEventListener("click", function () {
      goHome();
    });
  }

  if (lessonNextBtn) {
    lessonNextBtn.addEventListener("click", function () {
      nextLesson();
    });
  }

  if (practiceBackBtn) {
    practiceBackBtn.addEventListener("click", function () {
      stopSpeech();
      waitingNextQuestion = false;
      goHome();
    });
  }

  if (answerBtn) {
    answerBtn.addEventListener("click", function () {
      checkAnswer();
    });
  }

  if (hintBtn) {
    hintBtn.addEventListener("click", function () {
      giveHint();
    });
  }

  if (explainBtn) {
    explainBtn.addEventListener("click", function () {
      explainQuestion();
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", function () {
      startPractice();
    });
  }

  if (homeBtn) {
    homeBtn.addEventListener("click", function () {
      goHome();
    });
  }

  // =====================================================
  // ENTER PARA RESPONDER
  // =====================================================

  const answerInput = document.getElementById("answer");

  if (answerInput) {
    answerInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
      }
    });
  }

  // =====================================================
  // INÍCIO
  // =====================================================

  hideScreens();
  home.classList.remove("hidden");

  console.log("Professor Math carregado com sucesso.");
});
