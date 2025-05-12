// funciones generadoras

// función generadora
function* generate() {
    console.log('invoked 1st time');
    yield 1;
    console.log('invoked 2nd time');
    yield 2;
}

// creamos una instancia del generador
let gen = generate()


console.log(gen);

let result = gen.next();
console.log(result);

result = gen.next();
console.log(result);

result = gen.next();
console.log(result);


for (const g of generate()) {
    console.log(g);
}


function* forever() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

let f = forever();
console.log(f.next()); // 0
console.log(f.next()); // 1
console.log(f.next()); // 2


// Iteradores
class Sequence {
    constructor( start = 0, end = Infinity, interval = 1 ) {
        this.start = start;
        this.end = end;
        this.interval = interval;
    }
    *[Symbol.iterator]() {
        for( let index = this.start; index <= this.end; index += this.interval ) {
            yield index;
        }
    }
}

let oddNumbers = new Sequence(1, 10, 2);

for (const num of oddNumbers) {
    console.log(num);
}
