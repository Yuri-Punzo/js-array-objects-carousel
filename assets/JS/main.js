/* CONSEGNA:
Dato un array di oggetti letterali con:
url dell’immagine
titolo
descrizione Creare un carosello come nella foto allegata.

Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

Milestone 2:
Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.

BONUS 1 (opzionale):
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

BONUS 2  (opzionale):
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

BONUS 3  (opzionale):
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

STRUTTURA DATI:
Ecco la struttura dati da usare (le immagini sono le stesse della volta scorsa)

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];
*/




/* creo array con i path delle immagini */
const slidesList = [
    "./assets/img/01 Spiderman - Miles Morales.webp",
    "./assets/img/02 Ratchet & Clank - Rift Apart.webp",
    "./assets/img/03 Fortnite.webp",
    "./assets/img/04 Stray.webp",
    "./assets/img/05 Avengers.webp"
]

/* seleziono dove mettere le immagini */
const slidesElement = document.querySelector(".carousel");

/* getto la base per il mio counter e per poi passare alle imagini successive con ++ 
   (inoltre se vado a cambiare "= 0" in "= X" posso far partire le slide da un img diversa)*/
let visibleImg = 0;

/*  -creo un ciclo for
    -al suo interno creo una var slideslocation che prenda l'url della img dall'array
    -grazie alla var slidesHtml vado ad assegnare la classe visible solo alla prima immagine (i === 0) usando il metodo if ristretto visto stamani con Fabio
    -con .insertAdjacentHTML di fatto inserisco l'immagine nell'html */
for (let i = 0; i < slidesList.length; i++) {
    const slideLocation = slidesList[i]
    console.log(slideLocation);
    const slidesHtml = `<img class="${i === visibleImg ? 'visible' : ''}" src="${slideLocation}" alt="">`
    slidesElement.insertAdjacentHTML("beforeend", slidesHtml)
    console.log(slidesHtml);
}

/* creo due variabile che selezionino i pulsanti per farli poi funzionare */
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

/*  adesso voglio cambiare immagine con il click di next:
    vado a selezionare tutte le immagini con una var allImg
    creo una variabile (currentSlide) per poter selezionare l'img visibile al momento
    (dato che visibleImg ha valore zero pescherà la prima immagine)
    poi gli tolgo la classe visible con classlist.remove facendola sparire
    devo far andare avanti il counter di visibleImg con ++
    (var visibleImg creata prima del ciclo for e che di fatto "tiene il conto" per noi)
    inserito if, leggi sotto perché etcc..
    dopo if creo una var nextImg per l'img a seguire
    assegno alla img a seguire la classe visible per farla apparire */
function nextFunction() {
    const allImg = document.querySelectorAll('.carousel > img');
    console.log("all img", allImg);
    const currentSlide = allImg[visibleImg];
    console.log(currentSlide);
    currentSlide.classList.remove("visible");
    visibleImg++;
    /* il problema si creava qua quando dopo l'incremento i numeri di visibleImg andavano fuori dal range dell'array (0-4) con questo if, controllo il numero e lo modifico per farlo ciclare  0 1 2 3 4 0 1 2 3 4 0 1 etcc.  */
    if (visibleImg === slidesList.length) {
        visibleImg = 0;
    }
    const nextImg = allImg[visibleImg];
    console.log(nextImg);
    nextImg.classList.add("visible")
}

/* ora ricopio da sopra ma con -- per fare il previous img */
function prevFunction() {
    const allImg = document.querySelectorAll('.carousel > img');
    const currentSlide = allImg[visibleImg];
    console.log(currentSlide);
    currentSlide.classList.remove("visible");
    visibleImg--;
    /* stessa cosa di sopra ma al rovescio, se il valore scende sotto lo zero lo riportiamo al numero massimale dell'array, ovvero 4*/
    if (visibleImg === -1) {
        visibleImg = 4;
    }
    const prevImg = allImg[visibleImg];
    console.log(prevImg);
    prevImg.classList.add("visible")
}