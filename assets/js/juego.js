let deck = [];
let carta;
let puntosJugador = 0;
let creandoImg;
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const smalls = document.querySelectorAll('small');
const divJugadorCartas = document.querySelector('#jugador-cartas');
const divComputadoraCartas = document.querySelector('#computadora-cartas');

// FUNCION PARA CREAR UNA NUEVA BARAJA
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (tipo of tipos) {
        for (especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    // USAMOS LA LIBRERIA underscore PARA PODER UTILIZAR LA FUNCION _.shuffle Y HACER QUE NOS REVUELVA EL ARRAY
    return _.shuffle(deck);
};
// FUNCION PARA SACAR LA ULTIMA CARTA
const pedirCarta = () => {
    if (deck.length != 0) {
        return deck.pop()
    } else {
        alert('No hay cartas en el deck');
        throw 'No hay cartas en el deck';
    }
};
// DANDO VALOR A LAS CARTAS
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    if (isNaN(valor)) {
        // Los A valen 11 y las demas letras valen 10
        return (valor === 'A') ? 11 : 10;
    } else {
        return parseInt(valor);
    }
}
// COMPUTER TURN
const turnoComputadora = (puntosJugador) => {
    puntosComputadora = 0;
    do {
        if (puntosJugador > 21) {
            alert("Gano la computadora");
            break;
        }
        if((puntosComputadora == 21) && puntosJugador > 21){
            alert("Gano la computadora");
            break;
        }
        if((puntosComputadora > puntosJugador) && (puntosComputadora > 21)){
            alert("Gano el Jugador");
        }
        if(puntosComputadora == puntosJugador){
            alert("Empataron");
        }
        if((puntosJugador < 21) && puntosComputadora > 21){
            alert("Gano el Jugador");
        }
        carta = pedirCarta();
        valorCartaR = valorCarta(carta);
        puntosComputadora += valorCartaR;
        creandoImg = document.createElement('img');
        creandoImg.src = `assets/cartas/${carta}.png`;
        creandoImg.classList = 'carta';
        divComputadoraCartas.append(creandoImg);
        smalls[1].innerText = puntosComputadora;
    } while ((puntosJugador > puntosComputadora) && (puntosComputadora < 21))
}

// HACER DECK
deck = crearDeck();

// REMOVIENDO CARTA
btnPedir.addEventListener('click', () => {
    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        alert('Perdiste. Te pasaste de 21 puntos');
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        alert('Genial. Tienes 21 puntos');
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else {
        carta = pedirCarta();
        valorCartaR = valorCarta(carta);
        puntosJugador += valorCartaR;
        btnPedir.disabled = (puntosJugador >= 21) ? true : false;
        // ADD CARDS TO PLAYER DIV
        creandoImg = document.createElement('img');
        creandoImg.src = `assets/cartas/${carta}.png`;
        creandoImg.classList = 'carta';
        divJugadorCartas.append(creandoImg);
        smalls[0].innerText = puntosJugador; // AGREGANDO PUTOS A JUGADOR
        if (btnPedir.disabled) {
            if (puntosJugador === 21) {
                alert('Genial. Tienes 21 puntos');
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            } else {
                alert('Perdiste. Te pasaste de 21 puntos');
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            }
        }
    }
});
btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
});