var subject = new rxjs.Subject();
var { Observable, interval, fromEvent, of, from, pipe } = rxjs
var { map, take } = rxjs.operators

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

const observable = new Observable((subscriber) => {
    const id = setInterval(() => {
        subscriber.next('hi')
    }, 1000);
})

observable.subscribe((x) => {
    console.log(x)
})