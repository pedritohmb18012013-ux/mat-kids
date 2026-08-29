function renderAdditionLesson(title, text, content, next) {

  if (lessonStep === 1) {

    title.textContent = "➕ Vamos juntar!";
    text.textContent = "Escute o professor e conte junto.";

    content.innerHTML = `
      <div class="lesson-objects">
        <span class="object">🍎</span>
        <span class="object">🍎</span>
        <span class="object">🍎</span>
      </div>

      <div class="lesson-example">3</div>

      <div style="font-size:50px;text-align:center;">➕</div>

      <div class="lesson-objects">
        <span class="object">🍎</span>
        <span class="object">🍎</span>
      </div>

      <div class="lesson-example">2</div>

      <div style="font-size:45px;text-align:center;">⬇️</div>

      <div class="lesson-objects">
        <span class="object">🍎</span>
        <span class="object">🍎</span>
        <span class="object">🍎</span>
        <span class="object">🍎</span>
        <span class="object">🍎</span>
      </div>

      <div class="lesson-example">5</div>
    `;

    next.textContent = "Continuar →";

    speak(
      "Vamos brincar de juntar maçãs. " +
      "Primeiro temos três maçãs. " +
      "Conte comigo. Um, dois, três. " +
      "Agora chegaram mais duas maçãs. " +
      "Vamos contar tudo junto. " +
      "Um, dois, três, quatro, cinco. " +
      "Muito bem! Três mais duas é cinco."
    );

    return;
  }

  if (lessonStep === 2) {

    title.textContent = "🔢 Conte comigo!";
    text.textContent = "Vamos andar pelos números.";

    content.innerHTML = `
      <div class="lesson-example">5 + 3</div>

      <div class="lesson-objects">
        <span class="object">5️⃣</span>
        <span class="object">➡️</span>
        <span class="object">6️⃣</span>
        <span class="object">➡️</span>
        <span class="object">7️⃣</span>
        <span class="object">➡️</span>
        <span class="object">8️⃣</span>
      </div>

      <div class="lesson-example">8</div>
    `;

    next.textContent = "Continuar →";

    speak(
      "Agora vamos contar para frente. " +
      "Começamos no cinco. " +
      "Damos um passo e chegamos no seis. " +
      "Mais um passo, sete. " +
      "Mais um passo, oito. " +
      "Cinco mais três é oito."
    );

    return;
  }

  title.textContent = "🌟 Vamos pensar juntos!";
  text.textContent = "Conte as estrelas comigo.";

  content.innerHTML = `
    <div class="lesson-objects">
      <span class="object">⭐</span>
      <span class="object">⭐</span>
      <span class="object">⭐</span>
      <span class="object">⭐</span>
    </div>

    <div style="font-size:50px;text-align:center;">➕</div>

    <div class="lesson-objects">
      <span class="object">⭐</span>
      <span class="object">⭐</span>
      <span class="object">⭐</span>
    </div>

    <div style="font-size:45px;text-align:center;">⬇️</div>

    <div class="lesson-objects">
      <span class="object">⭐</span>
      <span class="object">⭐</span>
      <span class="object">⭐</span>
      <span class="object">⭐</span>
      <span class="object">⭐</span>
      <span class="object">⭐</span>
      <span class="object">⭐</span>
    </div>

    <div class="lesson-example">7</div>
  `;

  next.textContent = "Continuar →";

  speak(
    "Agora é sua vez de pensar comigo. " +
    "Temos quatro estrelas. " +
    "Depois chegam mais três estrelas. " +
    "Vamos contar todas. " +
    "Um, dois, três, quatro, cinco, seis, sete. " +
    "Muito bem! Quatro mais três é sete."
  );
}
