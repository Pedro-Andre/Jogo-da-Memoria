"use strict"

const container = document.querySelector('.container')
const select = document.querySelector('#select')
const imagensCard = [
  'abobora',
  'boneco',
  'bruxa',
  'caixao',
  'espantalho',
  'livro',
  'olho',
  'teia',
  'zumbi'
]
let primeiroCard = '';
let segundoCard = '';

// CRIA A ESTRUTURA DO CARD
const cardElement = (tag, nomeDaClasse) => {
  const element = document.createElement(tag);
  element.className = nomeDaClasse;
  return element;
}

//  MODAL APARECE QND O JOGO É FINALIZADO
const modalFimDeJogo = () => {
  const modal = document.querySelector('.modal')
  const button = document.querySelector('.button')
  button.addEventListener('click', () => {
    document.location.reload(true);

  })
  const teia = document.querySelector('.teia')
  teia.addEventListener('click', () => {
    document.location.reload(true);
  })

  setTimeout(() => {
    modal.parentNode.style.display = "block"
  }, 1000)
}

// VERIFICA SE TODAS AS CARTAS ESTÃO VIRADAS E FINALIZA O JOGO
const verificaFimDeJogo = () => {
  const cardsRevelados = document.querySelectorAll('.matched')

  if (cardsRevelados.length === 18) {
    modalFimDeJogo();
  }
}

// COMPARA AS CARTAS, SE IGUAIS (DESABILITA ELAS), SE DIFERENTES (O JOGO CONTINUA)
const comparaCards = () => {
  const primeiraImg = primeiroCard.getAttribute('data-imagem')
  const segundaImg = segundoCard.getAttribute('data-imagem')

  if (primeiraImg === segundaImg) {
    primeiroCard.classList.add('matched')
    segundoCard.classList.add('matched')

    primeiroCard = '';
    segundoCard = '';

    verificaFimDeJogo();

  } else {
    setTimeout(() => {

      primeiroCard.classList.remove('visible')
      segundoCard.classList.remove('visible')

      primeiroCard = '';
      segundoCard = '';
    }, 750);
  }
}

// ADICIONA A AÇÃO DE VIRAR E DESVIRAR O CARD
const revelarCarta = ({ target }) => {
  if (target.parentNode.className.includes('visible')) {
    return
  }

  if (primeiroCard === '') {
    target.parentNode.classList.add('visible')
    primeiroCard = target.parentNode
  } else if (segundoCard === '') {
    target.parentNode.classList.add('visible')
    segundoCard = target.parentNode

    comparaCards();
  }
}

// CRIA O CARD
const createCard = (img) => {
  const card = cardElement('div', 'card')
  const back = cardElement('div', 'card-back card-face')
  const front = cardElement('div', 'card-front card-face')

  front.style.backgroundImage = `url('../assets/imgs/${img}.svg')`
  front.style.backgroundRepeat = 'no-repeat'
  front.style.backgroundColor = 'var(--gray)'
  front.style.backgroundPosition = 'center'

  card.appendChild(back)
  card.appendChild(front)

  card.addEventListener('click', revelarCarta)
  card.setAttribute('data-imagem', img)

  return card;
}

// CRIA O JOGO (ADICIONA OS CARDS NO GRID)
const createGame = () => {
  const imagensDuplicadas = [...imagensCard, ...imagensCard]

  const embaralharImagens = imagensDuplicadas.sort(() => Math.random() - 0.5);

  embaralharImagens.forEach((img) => {
    const card = createCard(img);
    container.appendChild(card);
  })
}
createGame();

const backCard = document.querySelectorAll('.card-back')
const frontCard = document.querySelectorAll('.card-front')

// VELOCIDADE DO FACIL
function nvlFacil() {
  backCard.forEach(c => {
    c.style.transition = 'transform .5s ease-in-out'
  })
  frontCard.forEach(c => {
    c.style.transition = 'transform .5s ease-in-out'
  })
}

// VELOCIDADE DO MEDIO
function nvlMedio() {
  backCard.forEach(c => {
    c.style.transition = 'transform .3s ease-in-out'
  })
  frontCard.forEach(c => {
    c.style.transition = 'transform .3s ease-in-out'
  })
}

// VELOCIDADE DO DIFICIL
function nvlDificil() {
  backCard.forEach(c => {
    c.style.transition = 'transform .15s ease-in-out'
  })
  frontCard.forEach(c => {
    c.style.transition = 'transform .15s ease-in-out'
  })
}

// ALTERA VELOCIADADE DE ACORDO COM A DIFICULDADE
function mudouDificuldade() {
  const nvlValue = select.options[select.selectedIndex].value

  if (nvlValue === 'facil') {
    nvlFacil();
  }
  if (nvlValue === 'medio') {
    nvlMedio();
  }
  if (nvlValue === 'dificil') {
    nvlDificil();
  }
}
