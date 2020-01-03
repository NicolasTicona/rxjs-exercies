var subject = new rxjs.Subject();
var { Observable, interval, fromEvent, of, from, pipe } = rxjs
var { map, take } = rxjs.operators


subjectAnimation = new rxjs.Subject()

// Recibimos los eventos de click en los elementos y llamamos el observer subject
var HTMLBoxes = document.getElementsByClassName('box')
var boxes = from(HTMLBoxes)
    .subscribe(element => {
        return fromEvent(element, 'click')
            .subscribe(e => subject.next(e))
    })


var maxRandom = Math.floor(Math.random() * (10) + 1)
    // console.log(maxRandom)

var randomPatternArray = setRandomValues();
console.log(randomPatternArray)
var randomPatternArrayObs = interval(500).pipe(take(maxRandom), map(el => randomPatternArray[el]))
    .subscribe(el => {
        console.log(el)
        el.style.animation = "pulsed .3s ease"
        setTimeout(() => {
            el.style.animation = ""
        }, 400)
    })



function setRandomValues() {
    let num = 1;
    let array = []
    for (let i = 1; i <= maxRandom; i++) {
        num = Math.floor(Math.random() * (HTMLBoxes.length) + 1);
        array.push(HTMLBoxes[num - 1])
    }
    return array;
}



// Defino el array del patron del usuario
userPatternArray = []

// Creo un observable que va a crear el patron del usuario
var userPattern = new Observable(subscriber => {
    subscriber.next(userPatternArray)
});

// Recibo los elementos del patron y me suscribo al observable
subject.subscribe({
    next(element) {
        userPattern.subscribe({
            next(array) { array.push(element.target) }
        })
    }
})

// Luego añado la animacion de click
subject.subscribe({
    next(element) {
        obsAnimation(element).subscribe(subjectAnimation)
    }
})

// La funcion devuelve un observable que recibe un object que sera el observer
function obsAnimation(element) {
    return new Observable(subjectAnimation.next(element))
}

subjectAnimation.subscribe({
    next(elem) {
        console.log(elem)
        elem.target.style.animation = "pulsed .3s ease"
        setTimeout(() => {
            elem.target.style.animation = ""
        }, 400)
    }
})



// Compara Arrays
var boton = document.getElementById('boton')

fromEvent(boton, 'click').subscribe(e => {
    compare(randomPatternArray, userPatternArray)
})

function compare(randomPatternArray, userPatternArray) {

    let igual = true;

    for (let i = 0; i < maxRandom; i++) {
        if (randomPatternArray[i] != userPatternArray[i]) {
            igual = false;
        }
    }

    if (igual) {
        alert('Bien Hecho!')
    } else {
        alert('Patron incorrecto')
    }
}