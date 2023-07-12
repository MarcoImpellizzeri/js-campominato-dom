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