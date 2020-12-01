

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//REFERENCIAS DEL HTML
const btnNuevoJuego = document.querySelector('#btnNuevoJuego');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

//Esta función crea una nueva baraja;
const crearDeck = () => {
    for (let i = 2; i <= 10; i++){
        for (let tipo of tipos) {
            deck.push( i + tipo );
        }
    }

    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push( esp + tipo);
        }
    }

    //console.log(deck);
    deck = _.shuffle( deck );
    return deck;
}

crearDeck();

//Esta función me permite tomar una carta;
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'Ya no quedan cartas en la baraja';
    }
    const carta = deck.pop();
    return carta;
}

//pedirCarta();

// esta función sirve para cambiar los valores de las cartas y quite la letra
const valorCarta = ( carta ) => {
    const valor = carta.substring(0,carta.length - 1);  // sirve para sacar el ultimo caracter
    return ( isNaN(valor) )
    ? (valor === 'A') ? 11 : 10
    : valor * 1 ;
}
const valor = valorCarta( pedirCarta() );

//Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerHTML = puntosComputadora;

        //Crear la carta
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Empate');
        } else if (puntosMinimos > 21) {
            alert('Gana la computadora');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('Gana la computadora');
        }
    }, 10);
}


//Eventos de botones
btnNuevoJuego.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerHTML = 0;
    puntosHTML[1].innerHTML = 0;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerHTML = puntosJugador;

    //Crear la carta
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    //no sobrepasar los 21 puntos jugador
    if (puntosJugador > 21){
        console.warn('Lo siento perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if ( puntosJugador === 21 ) {
        console.warn('21, Genial!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});
