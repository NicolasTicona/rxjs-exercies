var subject = new rxjs.Subject();
var { Observable, interval, fromEvent, of, from, pipe } = rxjs
var { map, take, first } = rxjs.operators

// const obeservable = new Observable(observer => {
//     observer.next(1)
//     observer.next({ hola: 'hola' })
//     observer.complete()
// })

// obeservable.subscribe({
//     next(x) {
//         console.log("a", x)
//     },
//     complete() {
//         console.log("done")
//     }
// })

// obeservable.subscribe({
//     next(x) {
//         console.log("b", x)
//     },
//     complete() {
//         console.log("done")
//     }
// })

// const observable = new Observable((subscriber) => {
//     const id = setInterval(() => {
//         subscriber.next('hi')
//     }, 1000);
// })

// observable.subscribe((x) => {
//     console.log(x)
// })

const numeros = of(1, 2, 3, 4, 5)
numeros.pipe(map(x => x * x))
    .subscribe(resp => {
        console.log(resp)
    })