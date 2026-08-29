/* Professor Math - aula visual para crianças que ainda não sabem ler */
"use strict";

document.addEventListener("DOMContentLoaded", function () {
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

  const $ = (id) => document.getElementById(id);

  const home = $("home");
  const lesson = $("lesson");
  const practice = $("practice");
  const result = $("result");

  if (!home || !lesson || !practice || !result) {
    console.error("Professor Math: telas principais não encontradas.");
    return;
  }

  function speak(text) {
    if (!soundEnabled || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "pt-BR";
    utterance.rate = 0.82;
    utterance.pitch = 1.08;
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

    if (soundBtn()) {
      soundBtn().textContent = soundEnabled ? "🔊" : "🔇";
    }

    if (!soundEnabled) {
      stopSpeech();
    } else {
      speak("A voz do Professor Math está ativada.");
    }
  }

  function soundBtn() {
    return $("soundBtn");
  }

  function hideScreens() {
    [home, lesson, practice, result].forEach(function (screen) {
      screen.classList.add("hidden");
    });
  }

  function goHome() {
    stopSpeech();
    waitingNextQuestion = false;
    hideScreens();
    home.classList.remove("hidden");
  }

  function chooseOperation(op) {
    operation = op;
    lessonStep = 1;

    stopSpeech();
    hideScreens();

    lesson.classList.remove("hidden");

    renderLesson();
  }

  /*
   * =====================================================
   * AULA
   * =====================================================
   *
   * A aula foi feita para depender o mínimo possível
   * de leitura.
   *
   * A criança vê objetos grandes e o professor fala.
   */

  function renderLesson() {
    const title = $("lessonTitle");
    const text = $("lessonText");
    const content = $("lessonContent");
    const step = $("lessonStep");
    const next = $("lessonNextBtn");

    if (!title || !text || !content || !step || !next) {
      console.error("Professor Math: elementos da aula não encontrados.");
      return;
    }

    step.textContent = lessonStep;

    if (lessonStep === 4) {
      showFinalLesson();
      return;
    }

    if (operation === "addition") {
      renderAdditionLesson(title, text, content, next);
    } else {
      renderSubtractionLesson(title, text, content, next);
    }
  }

  /*
   * =====================================================
   * ADIÇÃO - PASSO 1
   * =====================================================
   */

  function renderAdditionLesson(title, text, content, next) {
    if (lessonStep === 1) {
      title.textContent = "➕ JUNTAR";

      text.textContent =
        "Olhe as maçãs. Vamos juntar.";

      content.innerHTML = `
        <div style="
          text-align:center;
          padding:10px;
        ">

          <div style="
            font-size:4rem;
            margin-bottom:15px;
          ">
            🍎 🍎 🍎
          </div>

          <div style="
            font-size:3rem;
            margin:10px 0;
          ">
            ➕
          </div>

          <div style="
            font-size:4rem;
            margin-bottom:20px;
          ">
            🍎 🍎
          </div>

          <div class="lesson-example" style="
            font-size:2.2rem;
            padding:20px;
          ">
            3️⃣ ➕ 2️⃣
          </div>

          <div style="
            font-size:4rem;
            margin:20px 0;
          ">
            ⬇️
          </div>

          <div style="
            font-size:4rem;
          ">
            🍎 🍎 🍎 🍎 🍎
          </div>

          <div class="lesson-example" style="
            font-size:2.4rem;
            margin-top:20px;
          ">
            5️⃣ ⭐
          </div>

        </div>
      `;

      next.textContent = "Continuar →";

      speak(
        "Vamos aprender adição. " +
        "Adição é juntar. " +
        "Veja. Temos três maçãs. " +
        "Agora chegam mais duas maçãs. " +
        "Vamos juntar tudo. " +
        "Uma, duas, três, quatro, cinco. " +
        "Temos cinco maçãs."
      );

      return;
    }

    /*
     * =====================================================
     * ADIÇÃO - PASSO 2
     * =====================================================
     */

    if (lessonStep === 2) {
      title.textContent = "➕ VAMOS CONTAR";

      text.textContent =
        "Comece no 5 e conte mais 3.";

      content.innerHTML = `
        <div style="
          text-align:center;
          padding:10px;
        ">

          <div style="
            font-size:4rem;
            margin-bottom:20px;
          ">
            5️⃣
          </div>

          <div style="
            font-size:2.8rem;
            line-height:1.8;
          ">
            5️⃣ ➡️ 6️⃣ ➡️ 7️⃣ ➡️ 8️⃣
          </div>

          <div style="
            font-size:4rem;
            margin:25px 0;
          ">
            👆
          </div>

          <div class="lesson-example" style="
            font-size:2.5rem;
          ">
            5️⃣ ➕ 3️⃣ = 8️⃣
          </div>

          <div style="
            font-size:3rem;
            margin-top:25px;
          ">
            🎉
          </div>

        </div>
      `;

      next.textContent = "Continuar →";

      speak(
        "Agora vamos contar. " +
        "Começamos no cinco. " +
        "Mais um: seis. " +
        "Mais um: sete. " +
        "Mais um: oito. " +
        "Então cinco mais três é oito."
      );

      return;
    }

    /*
     * =====================================================
     * ADIÇÃO - PASSO 3
     * =====================================================
     */

    title.textContent = "🧠 AGORA VOCÊ VÊ";

    text.textContent =
      "Vamos juntar as estrelas.";

    content.innerHTML = `
      <div style="
        text-align:center;
        padding:10px;
      ">

        <div style="
          font-size:3.8rem;
          line-height:1.5;
        ">
          ⭐ ⭐ ⭐ ⭐
        </div>

        <div style="
          font-size:3rem;
          margin:10px 0;
        ">
          ➕
        </div>

        <div style="
          font-size:3.8rem;
          line-height:1.5;
        ">
          ⭐ ⭐ ⭐
        </div>

        <div style="
          font-size:3.5rem;
          margin:20px 0;
        ">
          ⬇️
        </div>

        <div class="lesson-example" style="
          font-size:2.5rem;
        ">
          4️⃣ ➕ 3️⃣ = ❓
        </div>

        <div style="
          font-size:3.5rem;
          margin:20px 0;
        ">
          👆
        </div>

        <div style="
          font-size:2.4rem;
          line-height:1.6;
        ">
          4️⃣ ➡️ 5️⃣ ➡️ 6️⃣ ➡️ 7️⃣
        </div>

        <div class="lesson-example" style="
          font-size:2.5rem;
          margin-top:20px;
        ">
          4️⃣ ➕ 3️⃣ = 7️⃣
        </div>

      </div>
    `;

    next.textContent = "Continuar →";

    speak(
      "Agora vamos pensar juntos. " +
      "Temos quatro estrelas. " +
      "Chegam mais três estrelas. " +
      "Começamos no quatro. " +
      "Cinco, seis, sete. " +
      "A resposta é sete."
    );
  }

  /*
   * =====================================================
   * SUBTRAÇÃO - PASSO 1
   * =====================================================
   */

  function renderSubtractionLesson(title, text, content, next) {
    if (lessonStep === 1) {
      title.textContent = "➖ TIRAR";

      text.textContent =
        "Olhe as maçãs. Vamos tirar.";

      content.innerHTML = `
        <div style="
          text-align:center;
          padding:10px;
        ">

          <div style="
            font-size:4rem;
            line-height:1.5;
          ">
            🍎 🍎 🍎 🍎 🍎
          </div>

          <div style="
            font-size:3rem;
            margin:15px 0;
          ">
            ➖
          </div>

          <div style="
            font-size:4rem;
            margin-bottom:15px;
          ">
            ❌ 🍎 🍎
          </div>

          <div style="
            font-size:3.5rem;
            margin:15px 0;
          ">
            ⬇️
          </div>

          <div style="
            font-size:4rem;
          ">
            🍎 🍎 🍎
          </div>

          <div class="lesson-example" style="
            font-size:2.5rem;
            margin-top:20px;
          ">
            5️⃣ ➖ 2️⃣ = 3️⃣
          </div>

          <div style="
            font-size:3rem;
            margin-top:20px;
          ">
            🎉
          </div>

        </div>
      `;

      next.textContent = "Continuar →";

      speak(
        "Vamos aprender subtração. " +
        "Subtração é tirar. " +
        "Temos cinco maçãs. " +
        "Vamos tirar duas maçãs. " +
        "Tiramos uma. " +
        "Tiramos outra. " +
        "Agora sobraram três maçãs."
      );

      return;
    }

    /*
     * =====================================================
     * SUBTRAÇÃO - PASSO 2
     * =====================================================
     */

    if (lessonStep === 2) {
      title.textContent = "➖ VAMOS VOLTAR";

      text.textContent =
        "Comece no 8 e volte 3.";

      content.innerHTML = `
        <div style="
          text-align:center;
          padding:10px;
        ">

          <div style="
            font-size:4rem;
            margin-bottom:20px;
          ">
            8️⃣
          </div>

          <div style="
            font-size:2.8rem;
            line-height:1.8;
          ">
            8️⃣ ➡️ 7️⃣ ➡️ 6️⃣ ➡️ 5️⃣
          </div>

          <div style="
            font-size:4rem;
            margin:25px 0;
          ">
            👈
          </div>

          <div class="lesson-example" style="
            font-size:2.5rem;
          ">
            8️⃣ ➖ 3️⃣ = 5️⃣
          </div>

          <div style="
            font-size:3rem;
            margin-top:25px;
          ">
            🌟
          </div>

        </div>
      `;

      next.textContent = "Continuar →";

      speak(
        "Agora vamos fazer uma subtração. " +
        "Começamos no oito. " +
        "Voltamos um: sete. " +
        "Voltamos um: seis. " +
        "Voltamos um: cinco. " +
        "Então oito menos três é cinco."
      );

      return;
    }

    /*
     * =====================================================
     * SUBTRAÇÃO - PASSO 3
     * =====================================================
     */

    title.textContent = "🧠 AGORA VOCÊ VÊ";

    text.textContent =
      "Vamos tirar os balões.";

    content.innerHTML = `
      <div style="
        text-align:center;
        padding:10px;
      ">

        <div style="
          font-size:3.7rem;
          line-height:1.5;
        ">
          🎈 🎈 🎈 🎈
        </div>

        <div style="
          font-size:3.7rem;
          line-height:1.5;
        ">
          🎈 🎈 🎈
        </div>

        <div style="
          font-size:3rem;
          margin:10px 0;
        ">
          ➖
        </div>

        <div style="
          font-size:3.5rem;
          margin:15px 0;
        ">
          ❌ 🎈 🎈 🎈
        </div>

        <div style="
          font-size:3.5rem;
          margin:20px 0;
        ">
          ⬇️
        </div>

        <div class="lesson-example" style="
          font-size:2.5rem;
        ">
          7️⃣ ➖ 3️⃣ = ❓
        </div>

        <div style="
          font-size:2.4rem;
          line-height:1.6;
          margin-top:20px;
        ">
          7️⃣ ➡️ 6️⃣ ➡️ 5️⃣ ➡️ 4️⃣
        </div>

        <div class="lesson-example" style="
          font-size:2.5rem;
          margin-top:20px;
        ">
          7️⃣ ➖ 3️⃣ = 4️⃣
        </div>

      </div>
    `;

    next.textContent = "Continuar →";

    speak(
      "Agora vamos pensar juntos. " +
      "Temos sete balões. " +
      "Três balões vão embora. " +
      "Começamos no sete. " +
      "Voltamos um: seis. " +
      "Voltamos um: cinco. " +
      "Voltamos um: quatro. " +
      "A resposta é quatro."
    );
  }

  /*
   * =====================================================
   * FINAL DA AULA
   * =====================================================
   */

  function showFinalLesson() {
    const title = $("lessonTitle");
    const text = $("lessonText");
    const content = $("lessonContent");
    const next = $("lessonNextBtn");
    const step = $("lessonStep");

    if (!title || !text || !content || !next) return;

    if (step) {
      step.textContent = "4";
    }

    title.textContent = "🚀 AGORA É SUA VEZ!";

    text.textContent =
      "Vamos fazer contas juntos.";

    content.innerHTML = `
      <div style="
        text-align:center;
        padding:10px;
      ">

        <div style="
          font-size:5rem;
          margin-bottom:20px;
        ">
          🧑‍🏫
        </div>

        <div style="
          font-size:3.5rem;
          margin:20px 0;
        ">
          👀 🧠 💪
        </div>

        <div class="lesson-example" style="
          font-size:2.3rem;
          padding:22px;
        ">
          👀 OLHE
        </div>

        <div class="lesson-example" style="
          font-size:2.3rem;
          padding:22px;
          margin-top:12px;
        ">
          🧠 PENSE
        </div>

        <div class="lesson-example" style="
          font-size:2.3rem;
          padding:22px;
          margin-top:12px;
        ">
          💪 TENTE
        </div>

        <div style="
          font-size:4rem;
          margin-top:25px;
        ">
          🌟 🎯 🌟
        </div>

      </div>
    `;

    next.textContent = "Começar exercícios 🎯";

    speak(
      "Você está pronto! " +
      "Agora é sua vez. " +
      "Olhe a conta. " +
      "Pense com calma. " +
      "Se precisar, eu posso dar uma dica. " +
      "Vamos começar!"
    );
  }

  function nextLesson() {
    if (lessonStep < 4) {
      lessonStep++;
      renderLesson();
    } else {
      startPractice();
    }
  }

  /*
   * =====================================================
   * PRÁTICA
   * =====================================================
   */

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

  function random(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
  }

  function generateQuestion() {
    if (questionNumber >= TOTAL_QUESTIONS) {
      finishPractice();
      return;
    }

    waitingNextQuestion = false;

    questionNumber++;
    hintLevel = 0;

    /*
     * Para uma criança pequena, começamos
     * com números pequenos.
     */

    let max;

    if (correct < 3) {
      max = 5;
    } else if (correct < 6) {
      max = 10;
    } else if (correct < 8) {
      max = 20;
    } else {
      max = 50;
    }

    number1 = random(1, max);

    number2 = random(
      1,
      Math.min(5, max)
    );

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

    resetFeedback();

    resetAnswer();

    updateStats();

    const message = $("practiceMessage");

    if (message) {
      message.textContent =
        operation === "addition"
          ? "➕ Vamos juntar!"
          : "➖ Vamos tirar!";
    }

    if (operation === "addition") {
      speak(
        `Vamos fazer uma conta. ` +
        `${number1} mais ${number2}. ` +
        `Pense e tente responder.`
      );
    } else {
      speak(
        `Vamos fazer uma conta. ` +
        `${number1} menos ${number2}. ` +
        `Pense e tente responder.`
      );
    }
  }

  function updateQuestion() {
    const questionNumberElement =
      $("questionNumber");

    const operationLabel =
      $("operationLabel");

    const question =
      $("question");

    const progress =
      $("progress");

    if (questionNumberElement) {
      questionNumberElement.textContent =
        questionNumber;
    }

    if (operationLabel) {
      operationLabel.textContent =
        operation === "addition"
          ? "ADIÇÃO ➕"
          : "SUBTRAÇÃO ➖";
    }

    if (question) {
      question.textContent =
        operation === "addition"
          ? `${number1} + ${number2} = ?`
          : `${number1} − ${number2} = ?`;
    }

    if (progress) {
      progress.style.width =
        `${(questionNumber / TOTAL_QUESTIONS) * 100}%`;
    }
  }

  /*
   * =====================================================
   * VISUAL DA CONTA
   * =====================================================
   */

  function showVisual() {
    const area = $("visualArea");

    if (!area) return;

    area.innerHTML = "";

    /*
     * Mostra os objetos quando os números são pequenos.
     */

    if (
      number1 <= 10 &&
      number2 <= 10
    ) {
      const firstEmoji =
        operation === "addition"
          ? "🔵"
          : "🟢";

      for (
        let i = 0;
        i < number1;
        i++
      ) {
        const item =
          document.createElement("span");

        item.className = "object";

        item.textContent =
          firstEmoji;

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

        item.textContent =
          operation === "addition"
            ? "🟡"
            : "🔴";

        area.appendChild(item);
      }

      /*
       * Na subtração mostramos também
       * visualmente o que será retirado.
       */

      if (operation === "subtraction") {
        const explanation =
          document.createElement("div");

        explanation.style.width =
          "100%";

        explanation.style.textAlign =
          "center";

        explanation.style.fontSize =
          "1.8rem";

        explanation.style.marginTop =
          "12px";

        explanation.textContent =
          "🔴 = tirar";

        area.appendChild(explanation);
      }
    }
  }

  /*
   * =====================================================
   * RESPOSTA
   * =====================================================
   */

  function resetAnswer() {
    const input = $("answer");
    const button = $("answerBtn");

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

  function resetFeedback() {
    const feedback = $("feedback");

    if (feedback) {
      feedback.classList.add("hidden");
    }
  }

  function showFeedback(
    type,
    icon,
    title,
    html
  ) {
    const feedback =
      $("feedback");

    const feedbackIcon =
      $("feedbackIcon");

    const feedbackTitle =
      $("feedbackTitle");

    const feedbackText =
      $("feedbackText");

    if (!feedback) return;

    feedback.classList.remove(
      "hidden"
    );

    feedback.classList.remove(
      "correct",
      "wrong"
    );

    feedback.classList.add(type);

    if (feedbackIcon) {
      feedbackIcon.textContent =
        icon;
    }

    if (feedbackTitle) {
      feedbackTitle.textContent =
        title;
    }

    if (feedbackText) {
      feedbackText.innerHTML =
        html;
    }
  }

  /*
   * =====================================================
   * PASSOS DE CONTAGEM
   * =====================================================
   */

  function createCountingSteps(
    start,
    amount,
    addition
  ) {
    let html =
      `<div class="step-list">`;

    let current = start;

    for (
      let i = 1;
      i <= amount;
      i++
    ) {
      current =
        addition
          ? current + 1
          : current - 1;

      html += `
        <div class="step">

          <span class="step-number">
            ${i}
          </span>

          <span>
            ${addition ? "Mais" : "Menos"}
            1 =
            <strong>${current}</strong>
          </span>

        </div>
      `;
    }

    html += "</div>";

    return html;
  }

  function checkAnswer() {
    if (waitingNextQuestion) {
      return;
    }

    const input =
      $("answer");

    if (!input) return;

    const value =
      input.value.trim();

    if (value === "") {
      showFeedback(
        "wrong",
        "💡",
        "Vamos tentar!",
        `
          <div style="
            text-align:center;
            font-size:1.3rem;
          ">
            <div style="
              font-size:4rem;
              margin-bottom:15px;
            ">
              👆
            </div>

            <p>
              Coloque um número.
            </p>
          </div>
        `
      );

      speak(
        "Coloque um número para responder."
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
      handleCorrect();
    } else {
      handleWrong(userAnswer);
    }
  }

  /*
   * =====================================================
   * ACERTO
   * =====================================================
   */

  function handleCorrect() {
    correct++;
    streak++;

    const points =
      streak >= 3
        ? 15
        : 10;

    score += points;

    showFeedback(
      "correct",
      "🎉",
      "ACERTOU!",
      `
        <div style="
          text-align:center;
        ">

          <div style="
            font-size:4rem;
            margin-bottom:10px;
          ">
            🌟
          </div>

          <div style="
            font-size:2rem;
          ">
            ${number1}
            ${operation === "addition" ? "+" : "−"}
            ${number2}
            =
            ${correctAnswer}
          </div>

          <p>
            ⭐ +${points} pontos!
          </p>

        </div>
      `
    );

    const message =
      $("practiceMessage");

    if (message) {
      message.textContent =
        streak >= 3
          ? "🔥 Você está arrasando!"
          : "👏 Muito bem!";
    }

    speak(
      `Muito bem! Você acertou. ` +
      `A resposta é ${correctAnswer}.`
    );

    updateStats();

    lockAnswer();

    waitingNextQuestion = true;

    setTimeout(
      function () {
        generateQuestion();
      },
      1600
    );
  }

  /*
   * =====================================================
   * ERRO
   * =====================================================
   */

  function handleWrong(userAnswer) {
    wrong++;

    streak = 0;

    hintLevel++;

    const symbol =
      operation === "addition"
        ? "+"
        : "−";

    const steps =
      createCountingSteps(
        number1,
        number2,
        operation === "addition"
      );

    showFeedback(
      "wrong",
      "💡",
      "VAMOS JUNTOS",
      `
        <div style="
          text-align:center;
        ">

          <div style="
            font-size:3.5rem;
          ">
            🧑‍🏫
          </div>

          <p>
            Vamos fazer devagar.
          </p>

          ${steps}

          <div class="lesson-example" style="
            font-size:2rem;
            margin-top:15px;
          ">
            ${number1}
            ${symbol}
            ${number2}
            =
            ${correctAnswer}
          </div>

        </div>
      `
    );

    const message =
      $("practiceMessage");

    if (message) {
      message.textContent =
        "💪 Não tem problema. Vamos aprender!";
    }

    if (operation === "addition") {
      speak(
        `Não tem problema. ` +
        `Vamos juntos. ` +
        `Comece no ${number1}. ` +
        `Conte mais ${number2}. ` +
        `A resposta é ${correctAnswer}.`
      );
    } else {
      speak(
        `Não tem problema. ` +
        `Vamos juntos. ` +
        `Comece no ${number1}. ` +
        `Volte ${number2} números. ` +
        `A resposta é ${correctAnswer}.`
      );
    }

    updateStats();
  }

  function lockAnswer() {
    const input =
      $("answer");

    const button =
      $("answerBtn");

    if (input) {
      input.disabled = true;
    }

    if (button) {
      button.disabled = true;
    }
  }

  /*
   * =====================================================
   * DICA
   * =====================================================
   */

  function showHint() {
    if (waitingNextQuestion) {
      return;
    }

    hintLevel++;

    let text = "";

    if (operation === "addition") {
      if (hintLevel === 1) {
        text = `
          <div style="
            text-align:center;
            font-size:1.3rem;
          ">

            <div style="
              font-size:4rem;
            ">
              ➕
            </div>

            <p>
              Vamos <strong>juntar</strong>.
            </p>

            <div style="
              font-size:3rem;
            ">
              ${"🔵".repeat(
                Math.min(number1, 10)
              )}
            </div>

            <div style="
              font-size:2.5rem;
            ">
              ➕
            </div>

            <div style="
              font-size:3rem;
            ">
              ${"🟡".repeat(
                Math.min(number2, 10)
              )}
            </div>

          </div>
        `;
      } else {
        const numbers =
          [];

        for (
          let i = 1;
          i <= number2;
          i++
        ) {
          numbers.push(
            number1 + i
          );
        }

        text = `
          <div style="
            text-align:center;
          ">

            <div style="
              font-size:3rem;
            ">
              👆
            </div>

            <p>
              Conte comigo:
            </p>

            <div style="
              font-size:2rem;
              font-weight:bold;
            ">
              ${numbers.join(" ➡️ ")}
            </div>

          </div>
        `;
      }

      speak(
        `É uma adição. ` +
        `Vamos juntar. ` +
        `Comece no ${number1} e conte mais ${number2}.`
      );
    } else {
      if (hintLevel === 1) {
        text = `
          <div style="
            text-align:center;
            font-size:1.3rem;
          ">

            <div style="
              font-size:4rem;
            ">
              ➖
            </div>

            <p>
              Vamos <strong>tirar</strong>.
            </p>

            <div style="
              font-size:3rem;
            ">
              ${"🟢".repeat(
                Math.min(number1, 10)
              )}
            </div>

            <div style="
              font-size:2.5rem;
            ">
              ➖
            </div>

            <div style="
              font-size:3rem;
            ">
              ${"🔴".repeat(
                Math.min(number2, 10)
              )}
            </div>

          </div>
        `;
      } else {
        const numbers =
          [];

        for (
          let i = 1;
          i <= number2;
          i++
        ) {
          numbers.push(
            number1 - i
          );
        }

        text = `
          <div style="
            text-align:center;
          ">

            <div style="
              font-size:3rem;
            ">
              👈
            </div>

            <p>
              Conte para trás:
            </p>

            <div style="
              font-size:2rem;
              font-weight:bold;
            ">
              ${numbers.join(" ➡️ ")}
            </div>

          </div>
        `;
      }

      speak(
        `É uma subtração. ` +
        `Vamos tirar. ` +
        `Comece no ${number1} e conte para trás ${number2}.`
      );
    }

    showFeedback(
      "wrong",
      "💡",
      "DICA DO PROFESSOR",
      text
    );
  }

  /*
   * =====================================================
   * EXPLICAR
   * =====================================================
   */

  function explainQuestion() {
    if (waitingNextQuestion) {
      return;
    }

    const symbol =
      operation === "addition"
        ? "+"
        : "−";

    const steps =
      createCountingSteps(
        number1,
        number2,
        operation === "addition"
      );

    const visual =
      operation === "addition"
        ? `
          <div style="
            font-size:3rem;
            text-align:center;
          ">
            🔵 🔵 🔵
            <br>
            ➕
            <br>
            🟡 🟡
          </div>
        `
        : `
          <div style="
            font-size:3rem;
            text-align:center;
          ">
            🟢 🟢 🟢 🟢 🟢
            <br>
            ➖
            <br>
            🔴 🔴
          </div>
        `;

    showFeedback(
      "wrong",
      "🧑‍🏫",
      "VAMOS APRENDER",
      `
        ${visual}

        <div style="
          text-align:center;
          margin-top:15px;
        ">
          ${steps}

          <div class="lesson-example" style="
            font-size:2rem;
            margin-top:15px;
          ">
            ${number1}
            ${symbol}
            ${number2}
            =
            ${correctAnswer}
          </div>
        </div>
      `
    );

    if (operation === "addition") {
      speak(
        `Vamos resolver. ` +
        `Na adição nós juntamos. ` +
        `Começamos no ${number1}. ` +
        `Contamos mais ${number2}. ` +
        `A resposta é ${correctAnswer}.`
      );
    } else {
      speak(
        `Vamos resolver. ` +
        `Na subtração nós tiramos. ` +
        `Começamos no ${number1}. ` +
        `Voltamos ${number2}. ` +
        `A resposta é ${correctAnswer}.`
      );
    }
  }

  /*
   * =====================================================
   * ESTATÍSTICAS
   * =====================================================
   */

  function updateStats() {
    if ($("score")) {
      $("score").textContent =
        score;
    }

    if ($("correct")) {
      $("correct").textContent =
        correct;
    }

    if ($("wrong")) {
      $("wrong").textContent =
        wrong;
    }

    if ($("streak")) {
      $("streak").textContent =
        streak;
    }

    const attempts =
      correct + wrong;

    const accuracy =
      attempts === 0
        ? 0
        : Math.round(
            (correct / attempts) * 100
          );

    if ($("accuracy")) {
      $("accuracy").textContent =
        `${accuracy}%`;
    }
  }

  /*
   * =====================================================
   * FINAL
   * =====================================================
   */

  function finishPractice() {
    waitingNextQuestion = true;

    stopSpeech();

    hideScreens();

    result.classList.remove(
      "hidden"
    );

    const accuracy =
      correct + wrong === 0
        ? 0
        : Math.round(
            (correct / (correct + wrong)) * 100
          );

    if ($("finalScore")) {
      $("finalScore").textContent =
        score;
    }

    if ($("finalCorrect")) {
      $("finalCorrect").textContent =
        correct;
    }

    if ($("finalWrong")) {
      $("finalWrong").textContent =
        wrong;
    }

    if ($("finalAccuracy")) {
      $("finalAccuracy").textContent =
        `${accuracy}%`;
    }

    let title =
      "Muito bem! 🌟";

    let emoji =
      "🏆";

    let message =
      "Você terminou a atividade!";

    if (accuracy >= 90) {
      title =
        "Excelente! 🏆";

      emoji =
        "🌟";

      message =
        "Você foi incrível!";
    } else if (accuracy >= 70) {
      title =
        "Muito bom! 👏";

      emoji =
        "😊";

      message =
        "Você está aprendendo muito bem!";
    } else {
      title =
        "Boa tentativa! 💪";

      emoji =
        "🌱";

      message =
        "Não desista. Vamos tentar novamente!";
    }

    if ($("resultTitle")) {
      $("resultTitle").textContent =
        title;
    }

    if ($("resultEmoji")) {
      $("resultEmoji").textContent =
        emoji;
    }

    if ($("resultText")) {
      $("resultText").textContent =
        `Você acertou ${correct} de ${TOTAL_QUESTIONS} questões.`;
    }

    if ($("resultMessage")) {
      $("resultMessage").textContent =
        message;
    }

    speak(
      `Você terminou! ` +
      `Acertou ${correct} de ${TOTAL_QUESTIONS}. ` +
      `Muito bem!`
    );
  }

  /*
   * =====================================================
   * BOTÕES
   * =====================================================
   */

  function bind(
    id,
    event,
    handler
  ) {
    const element =
      $(id);

    if (element) {
      element.addEventListener(
        event,
        handler
      );
    }
  }

  bind(
    "soundBtn",
    "click",
    toggleSound
  );

  bind(
    "additionBtn",
    "click",
    function () {
      chooseOperation(
        "addition"
      );
    }
  );

  bind(
    "subtractionBtn",
    "click",
    function () {
      chooseOperation(
        "subtraction"
      );
    }
  );

  bind(
    "lessonBackBtn",
    "click",
    goHome
  );

  bind(
    "lessonNextBtn",
    "click",
    nextLesson
  );

  bind(
    "practiceBackBtn",
    "click",
    goHome
  );

  bind(
    "answerBtn",
    "click",
    checkAnswer
  );

  bind(
    "hintBtn",
    "click",
    showHint
  );

  bind(
    "explainBtn",
    "click",
    explainQuestion
  );

  bind(
    "restartBtn",
    "click",
    startPractice
  );

  bind(
    "homeBtn",
    "click",
    goHome
  );

  /*
   * =====================================================
   * ENTER
   * =====================================================
   */

  bind(
    "answer",
    "keydown",
    function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
      }
    }
  );

  /*
   * =====================================================
   * INÍCIO
   * =====================================================
   */

  hideScreens();

  home.classList.remove(
    "hidden"
  );

  console.log(
    "Professor Math carregado corretamente."
  );
});
