'use strict'

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

const squareCountsSelect = document.querySelector("[name='squareCounts']")
const btnStart = document.querySelector("#btn-start");
const messageEndGame = document.querySelector("#message-end-game");

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

    // array delle bombe per modalita`
    const bombNumbers = arraybomb(squareCounts);

    // invoco la funzione che si occupera di aggiungere al DOM i vari quadrati
    printGrid(myContainer, gridList);

    // Dichiarazione di una variabile booleana per tenere traccia dello stato del gioco
    let gameEnded = false;
    hideEndGameMessage(); // Nasconde il messaggio di fine gioco

    let clickedSquares = 0; // Contatore dei quadrati cliccati

    // un ciclo for che compara i numeri degli square con i valori casuali dell'arrayBomb
    for (let i = 0; i < gridList.length; i++) {
        const square = gridList[i];
        const squareNumber = i + 1;

        square.addEventListener("click", function () {
            if (gameEnded) {
                return; // Se il gioco è terminato, non fare nulla
            }


            if (bombNumbers.includes(squareNumber)) {
                square.classList.add("bg-danger"); // Colora di rosso se è una bomba
                endGame("Hai perso! Hai calpestato una bomba.");
            } else {
                square.classList.add("bg-info"); // Altrimenti colora di azzurro
                clickedSquares++;
            }

            if (clickedSquares === gridList.length - bombNumbers.length) {
                endGame("Hai vinto! Hai completato il gioco senza calpestare una bomba.");
            }
        });
    }

    /**
     * 
     * @param {string} message 
     */
    // Funzione per mostrare il messaggio di fine gioco
    function endGame(message) {
        messageEndGame.textContent = message + " il tuo punteggio e " + clickedSquares + ".";
        gameEnded = true; // Imposta lo stato del gioco come terminato
    }

    // Funzione per nascondere il messaggio di fine gioco
    function hideEndGameMessage() {
        messageEndGame.textContent = "";
    }

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



// devo creare un array di 16 numeri 
/**
 * 
 * @param {number} squareCounts 
 */
function arraybomb(squareCounts) {
    const numberBomb = [];

    while (numberBomb.length < 16) {
        const casualNumber = Math.floor(Math.random() * squareCounts) + 1;

        if (!numberBomb.includes(casualNumber)) {
            numberBomb.push(casualNumber);
        }
    }

    console.log(numberBomb);
    return numberBomb;
}
