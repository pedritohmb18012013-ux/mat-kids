/* =========================================
   PROFESSOR MATH
   Sistema educativo de adição e subtração
========================================= */


let selectedLevel = 1;
let currentOperation = "addition";

let number1 = 0;
let number2 = 0;
let correctAnswer = 0;

let questionCount = 0;
let correctCount = 0;
let wrongCount = 0;
let score = 0;
let streak = 0;

let soundEnabled = true;

const totalQuestions = 10;


/* =========================================
   VOZ
========================================= */

function speak(text) {

  if (!soundEnabled) return;

  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(text);

  voice.lang = "pt-BR";
  voice.rate = 0.9;
  voice.pitch = 1.05;
  voice.volume = 1;

  window.speechSynthesis.speak(voice);
}


function toggleSound() {

  soundEnabled = !soundEnabled;

  const button = document.getElementById("soundButton");

  if (soundEnabled) {

    button.textContent = "🔊";

    speak("Som ativado!");

  } else {

    button.textContent = "🔇";

    window.speechSynthesis.cancel();
  }
}


/* =========================================
   NÍVEL
========================================= */

function selectLevel(level) {

  selectedLevel = level;

  document.querySelectorAll(".level").forEach(button => {
    button.classList.remove("active");
  });

  const selectedButton =
    document.querySelector(`[data-level="${level}"]`);

  if (selectedButton) {
    selectedButton.classList.add("active");
  }

  let message = "";

  if (level === 1) {
    message = "Nível fácil escolhido!";
  }

  if (level === 2) {
    message = "Nível normal escolhido!";
  }

  if (level === 3) {
    message = "Nível desafio escolhido!";
  }

  speak(message);
}


/* =========================================
   COMEÇAR
========================================= */

function startGame(operation) {

  currentOperation = operation;

  questionCount = 0;
  correctCount = 0;
  wrongCount = 0;
  score = 0;
  streak = 0;

  document.getElementById("menuScreen")
    .classList.add("hidden");

  document.getElementById("resultScreen")
    .classList.add("hidden");

  document.getElementById("gameScreen")
    .classList.remove("hidden");

  updateStats();

  if (operation === "addition") {

    document.getElementById("operationName")
      .textContent = "ADIÇÃO";

    document.getElementById("teacherMessage")
      .textContent =
      "Vamos aprender a juntar números! 😊";

    speak(
      "Vamos aprender adição! " +
      "Adição significa juntar quantidades."
    );

  } else {

    document.getElementById("operationName")
      .textContent = "SUBTRAÇÃO";

    document.getElementById("teacherMessage")
      .textContent =
      "Vamos aprender a tirar números! 😊";

    speak(
      "Vamos aprender subtração! " +
      "Subtração significa tirar uma quantidade de outra."
    );
  }

  setTimeout(() => {
    generateQuestion();
  }, 1000);
}


/* =========================================
   GERAR CONTA
========================================= */

function generateQuestion() {

  if (questionCount >= totalQuestions) {
    finishGame();
    return;
  }

  questionCount++;

  let maxNumber;

  if (selectedLevel === 1) {
    maxNumber = 10;
  }

  if (selectedLevel === 2) {
    maxNumber = 50;
  }

  if (selectedLevel === 3) {
    maxNumber = 100;
  }


  number1 = randomNumber(0, maxNumber);
  number2 = randomNumber(0, maxNumber);


  /*
    Na subtração vamos evitar resultado negativo.
    Assim a criança aprende primeiro
    a subtrair quantidades sem números negativos.
  */

  if (
    currentOperation === "subtraction" &&
    number2 > number1
  ) {

    const temporary = number1;

    number1 = number2;
    number2 = temporary;
  }


  if (currentOperation === "addition") {

    correctAnswer = number1 + number2;

    document.getElementById("question").textContent =
      `${number1} + ${number2} = ?`;

  } else {

    correctAnswer = number1 - number2;

    document.getElementById("question").textContent =
      `${number1} − ${number2} = ?`;
  }


  document.getElementById("questionNumber")
    .textContent = questionCount;

  document.getElementById("answer").value = "";

  document.getElementById("feedback")
    .className = "feedback hidden";

  document.getElementById("answer").focus();

  updateStats();
}


/* =========================================
   NÚMERO ALEATÓRIO
========================================= */

function randomNumber(min, max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}


/* =========================================
   VERIFICAR RESPOSTA
========================================= */

function checkAnswer() {

  const input =
    document.getElementById("answer");

  const userAnswer =
    Number(input.value);


  if (input.value.trim() === "") {

    showFeedback(
      "wrong",
      "Digite uma resposta primeiro. 😊"
    );

    speak("Digite uma resposta para continuarmos.");

    return;
  }


  if (userAnswer === correctAnswer) {

    correctCount++;
    streak++;

    /*
      Quanto maior a sequência,
      maior a recompensa.
    */

    let points = 10;

    if (streak >= 3) {
      points += 5;
    }

    score += points;


    showFeedback(
      "correct",
      `🎉 Muito bem! Você acertou!<br>
       <strong>${number1} ${currentOperation === "addition" ? "+" : "−"} ${number2} = ${correctAnswer}</strong><br>
       Você ganhou ${points} pontos! ⭐`
    );


    document.getElementById("teacherMessage")
      .textContent =
      streak >= 3
        ? "Uau! Você está mandando muito bem! 🔥"
        : "Muito bem! Continue assim! 👏";


    speak(
      streak >= 3
        ? "Excelente! Você está em uma sequência incrível!"
        : "Muito bem! Você acertou!"
    );


    updateStats();


    setTimeout(() => {

      generateQuestion();

    }, 1800);


  } else {

    wrongCount++;
    streak = 0;


    const explanation =
      createExplanation(userAnswer);


    showFeedback(
      "wrong",
      `😊 Quase! Não tem problema, vamos aprender.<br><br>
       ${explanation}`
    );


    document.getElementById("teacherMessage")
      .textContent =
      "Não desista! Vamos descobrir juntos. 💪";


    speak(
      "Quase! Não tem problema. " +
      "Vamos descobrir juntos."
    );


    updateStats();
  }
}


/* =========================================
   EXPLICAÇÃO DO ERRO
========================================= */

function createExplanation(userAnswer) {

  let explanation = "";


  if (currentOperation === "addition") {

    explanation =
      `Vamos contar juntos:<br><br>
       Começamos com <strong>${number1}</strong>.<br>
       Depois acrescentamos mais <strong>${number2}</strong>.<br><br>
       O resultado é <strong>${correctAnswer}</strong>.`;

  } else {

    explanation =
      `Vamos pensar juntos:<br><br>
       Começamos com <strong>${number1}</strong>.<br>
       Tiramos <strong>${number2}</strong>.<br><br>
       Sobram <strong>${correctAnswer}</strong>.`;
  }


  return explanation;
}


/* =========================================
   DICA
========================================= */

function showHint() {

  let hint = "";


  if (currentOperation === "addition") {

    hint =
      `💡 Dica:<br><br>
       Comece pelo número <strong>${number1}</strong>
       e conte mais <strong>${number2}</strong>.`;

  } else {

    hint =
      `💡 Dica:<br><br>
       Comece com <strong>${number1}</strong>
       e retire <strong>${number2}</strong>.`;
  }


  showFeedback("correct", hint);

  speak(
    currentOperation === "addition"
      ? `Comece com ${number1} e conte mais ${number2}.`
      : `Comece com ${number1} e retire ${number2}.`
  );
}


/* =========================================
   FEEDBACK
========================================= */

function showFeedback(type, message) {

  const feedback =
    document.getElementById("feedback");

  feedback.className =
    `feedback ${type}`;

  feedback.innerHTML = message;
}


/* =========================================
   ESTATÍSTICAS
========================================= */

function updateStats() {

  document.getElementById("score")
    .textContent = score;

  document.getElementById("streak")
    .textContent = streak;

  document.getElementById("correct")
    .textContent = correctCount;

  document.getElementById("wrong")
    .textContent = wrongCount;


  const total =
    correctCount + wrongCount;

  let accuracy = 0;

  if (total > 0) {

    accuracy =
      Math.round(
        (correctCount / total) * 100
      );
  }


  document.getElementById("accuracy")
    .textContent = `${accuracy}%`;
}


/* =========================================
   FINAL
========================================= */

function finishGame() {

  document.getElementById("gameScreen")
    .classList.add("hidden");

  document.getElementById("resultScreen")
    .classList.remove("hidden");


  const total =
    correctCount + wrongCount;

  const accuracy =
    total > 0
      ? Math.round(
          (correctCount / total) * 100
        )
      : 0;


  document.getElementById("finalScore")
    .textContent = score;

  document.getElementById("finalCorrect")
    .textContent = correctCount;

  document.getElementById("finalWrong")
    .textContent = wrongCount;

  document.getElementById("finalAccuracy")
    .textContent = `${accuracy}%`;


  let message = "";


  if (accuracy === 100) {

    message =
      "🏆 Perfeito! Você acertou todas as contas!";

  } else if (accuracy >= 80) {

    message =
      "🌟 Excelente! Você está aprendendo muito bem!";

  } else if (accuracy >= 60) {

    message =
      "👏 Muito bom! Continue praticando.";

  } else {

    message =
      "💪 Continue treinando. Errar também faz parte de aprender!";
  }


  document.getElementById("resultMessage")
    .textContent = message;


  speak(
    `${message} Você fez ${correctCount} acertos e ganhou ${score} pontos.`
  );
}


/* =========================================
   REINICIAR
========================================= */

function restartGame() {

  startGame(currentOperation);
}


/* =========================================
   VOLTAR PARA O MENU
========================================= */

function goHome() {

  window.speechSynthesis.cancel();

  document.getElementById("gameScreen")
    .classList.add("hidden");

  document.getElementById("resultScreen")
    .classList.add("hidden");

  document.getElementById("menuScreen")
    .classList.remove("hidden");
}


/* =========================================
   ENTER PARA RESPONDER
========================================= */

document.addEventListener("keydown", function(event) {

  if (
    event.key === "Enter" &&
    !document.getElementById("gameScreen")
      .classList.contains("hidden")
  ) {

    checkAnswer();
  }

});
