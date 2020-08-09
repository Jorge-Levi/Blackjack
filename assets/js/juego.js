let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

const crearDeck = () =>{
    for(let i = 2 ; i <=10 ; i++){
        for(tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for(tipo of tipos){
        for(especial of especiales){
            deck.push(especial + tipo);
        }
    }
    // USAMOS LA LIBRERIA underscore PARA PODER UTILIZAR LA FUNCION _.shuffle Y HACER QUE NOS REVUELVA EL ARRAY
    return _.shuffle(deck); 
};
deck = crearDeck();
