const squareCountsSelect = document.querySelector("[name='squareCounts']")
const btnStart = document.querySelector("#btn-start");

/**
 * 
 * @type {HTMLElement}
 */
const myContainer = document.querySelector(".my-container");

// non si mettono le parentesi alla funzione tra parentesi perche` 
// e` una funzione nominata
btnStart.addEventListener("click", onBtnClick)

// funzione per le azioni che avverranno al click del pulsante 
function onBtnClick() {
    // leggo il valore della select
    const squareCounts = parseInt(squareCountsSelect.value);

    console.log("valore scelto", squareCounts);

    // devo genrare la griglia
    const gridList = createGrid(squareCounts);

    console.log(gridList);

    // invoco la funzione che si occupera di aggiungere al DOM i vari quadrati
    printGrid(myContainer, gridList)

    // array delle bombe per modalita`
    const allBomb = arraybomb(squareCounts);
}

/**
 * Genera un singolo quadrato e lo ritorna
 * 
 * @param {string} squareContent contenuto testuale da inserire all'interno dei quadrati
 * @param {string} squareCounts numero totale di quadrati da creare
 * 
 * @returns {HTMLDivElement}
 */
function createSingleSquare(squareContent, squareCounts) {
    const square = document.createElement("div");

    const squarePerRow = Math.sqrt(squareCounts);

    square.classList.add("grid-square");
    square.innerHTML = squareContent;
    square.style.flexBasis = `calc(100% / ${squarePerRow})`;

    square.addEventListener("click", function () {
        square.classList.toggle("bg-info");

        console.log(square.innerHTML);
    })

    return square;
}

/**
 * Dato un numero di celle, crea tutta la griglia
 * 
 * @param {number} squareNumber numero di quadrati da creare all'innterno della griglia
 * @returns {HTMLDivElement[]}
 */
function createGrid(squareNumber) {
    const grid = [];
    // salvo in una variabile l'output della funzione createSinglesquare
    for (let i = 0; i < squareNumber; i++) {
        const newSquare = createSingleSquare(i + 1, squareNumber);

        grid.push(newSquare);
    }

    return grid;
}

/**
 * aggiunge ad un elemento HTML la lista dei quadrati
 * 
 * @param {HTMLElement} container
 * @param {HTMLDivElement[]} squareList
 */
function printGrid(container, squareList) {
    // reset del contenuto del container
    container.innerHTML = "";

    for (let i = 0; i < squareList.length; i++) {
        container.append(squareList[i]);
    }
}

// CONSEGNA 'JS-CAMPOMINATO-DOM'
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati -
// abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
// (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, 
// cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// devo creare un array di 16 numeri 
/**
 * 
 * @param {number} squareCounts 
 */
function arraybomb(squareCounts) {
    const numberBomb = [];

    for (let i = 0; i < 16; i++) {
        const casualNumber = Math.floor(Math.random() * squareCounts) + 1;
        numberBomb.push(casualNumber);
    }

    console.log(numberBomb);
}