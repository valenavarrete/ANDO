const questions = [
  {
    text: "1. Tienes la tarde libre para recorrer la ciudad ¿Cómo eliges el lugar al que quieres ir?",
    options: {
      A: "Busco si hay alguna exposición o feria",
      B: "Le pregunto a un local cuál es su lugar favorito para turistear",
      C: "Busco el lugar más famoso de la ciudad",
      D: "Reviso si hay algún sitio histórico que no conozca aún"
    }
  },
  {
    text: "2. Empiezas a caminar y te encuentras con…",
    options: {
      A: "Un artista pintando en vivo",
      B: "Una tienda de antigüedades",
      C: "Un lugar que no habías visto antes",
      D: "Una cafetería con temática de flores"
    }
  },
  {
    text: "3. Paras a descansar en una plaza ¿Qué estás mirando?",
    options: {
      A: "Al señor que está tocando tu canción favorita",
      B: "Las calles que salen de la plaza, para ver por cuál seguir",
      C: "Lo lindo del lugar, la verdad te quedarías toda la tarde",
      D: "La placa con el nombre de la estatua que tienes frente a ti"
    }
  },
  {
    text: "4. Retomas el camino y te encuentras con una feria. ¿A qué parte vas primero?",
    options: {
      A: "Al puesto de cosas hechas en cerámica",
      B: "Al primer puesto y recorro todos en orden",
      C: "Al puesto de artesanías",
      D: "A comprar un souvenir lindo"
    }
  },
  {
    text: "5. ¡Ups! Chocaste con un detective y te pide ayuda para resolver un misterio. ¿Cuál eliges?",
    options: {
      A: "Averiguar quién es el artista del mural más famoso del barrio",
      B: "Encontrar un camino secreto para llegar a un mirador escondido",
      C: "Descubrir cuáles son los lugares más famosos de la ciudad",
      D: "Investigar qué evento importante pasó dentro de un edificio antiguo"
    }
  },
  {
    text: "6. Se hace tarde y ya tienes hambre ¿Dónde decides comer?",
    options: {
      A: "En un lugar raro con decoración llamativa",
      B: "En un carrito local (food truck)",
      C: "En un café lindo",
      D: "En una picada que te recomendaron"
    }
  },
  {
    text: "7. Después de comer, decides ver el atardecer ¿Dónde vas?",
    options: {
      A: "A una plaza con música en vivo",
      B: "A un mirador",
      C: "No me muevo, hay que mirar el cielo",
      D: "Una calle con arquitectura antigua"
    }
  }
];

const types = {
  A: "CREANDO",
  B: "EXPLORANDO",
  C: "CAPTURANDO",
  D: "RECORDANDO"
};

const descriptions = {
  CREANDO: "Buscas experiencias culturales activas y expresivas, ligadas al arte urbano y la producción local.",
  EXPLORANDO: "Disfrutas perderte en la ciudad, descubrir rincones escondidos y caminar sin rumbo fijo.",
  CAPTURANDO: "Te guías por la belleza visual del entorno, la arquitectura llamativa y las composiciones urbanas.",
  RECORDANDO: "Estás interesado en el pasado de la ciudad, sus relatos, patrimonio y memoria colectiva."
};

let current = 0;
const answers = [];

function renderQuestion() {
  const question = questions[current];
  document.getElementById("question-text").innerText = question.text;
  const container = document.getElementById("options-container");
  container.innerHTML = "";

  for (const [key, text] of Object.entries(question.options)) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => {
      answers[current] = key;
      renderQuestion();
      document.getElementById("next-button").style.display = "inline";
    };
    if (answers[current] === key) {
      btn.style.backgroundColor = "#d0e8ff";
    }
    container.appendChild(btn);
  }

  document.getElementById("back-button").disabled = current === 0;
  document.getElementById("next-button").style.display = answers[current] ? "inline" : "none";
  document.getElementById("next-button").innerText = current === questions.length - 1 ? "Ver resultado" : "Siguiente →";
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (current > 0) {
    current--;
    renderQuestion();
  }
}

function showResult() {
  const count = { CREANDO: 0, EXPLORANDO: 0, CAPTURANDO: 0, RECORDANDO: 0 };
  for (const letter of answers) {
    const type = types[letter];
    count[type]++;
  }

  const finalType = Object.entries(count).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("result-text").innerHTML = `<strong>${finalType}</strong>: ${descriptions[finalType]}`;
}

renderQuestion();
