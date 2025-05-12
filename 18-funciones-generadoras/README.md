# Introducción a los generadores en javascript

En Javascript, una función regular se ejecuta basada en el modelo ejecución hasta completar. No se puede pausar a mitar y continuar desde donde se había pausado, por ejemplo:

```javascript
function foo() {
    console.log('I');
    console.log('cannot');
    console.log('pause');
}
```

La función `foo()` se ejecuta de arriba a abajo. La única forma de salir de `foo()` es devolviendo un elemento o lanzando un error. Si invoca la función `foo()` nuevamente, comenzará la ejecución de arriba hacia abajo.

```javascript
foo();
```

La salida será:
```bash
I
cannot
pause
```

ES6 introduce un nuevo tipo de función que es diferente de una función regular: generador de funciones o generador.

Un generador puede hacer una pausa a mitad de camino y luego continuar desde donde se detuvo. Por ejemplo:

```javascript
function* generate() {
    console.log('invoked 1st time');
    yield 1;
    console.log('invoked 2nd time');
    yield 2;
}
```

Examinemos la función `generate()` en detalle.

- Primero, vemos el asterisco (`*`) después de la palabra clave `function`. El asterisco indica que `generate()` es un generador, no una función normal.
- En segundo lugar, la declaración de `yield` (la traducción es rendir a modo de rendir cuentas) devuelve un valor y detiene la ejecución de la función.


El siguiente código invoca el generador `generate()`:

```javascript
let gen = generate();
```

Cuando invocas el generador `generate()`:

- Primero, no ve nada en la consola. Si `generate()` fuera una función regular, esperaría ver algunos mensajes.
- En segundo lugar, obtiene algo de `generate()` como valor devuelto.


Mostraremos el valor devuelto en la consola:

```javascript
console.log(gen)
```

y veremos como resultado:

```bash
generate {<suspended>}
```

Entonces, un generador devuelve un objeto `Generator` sin ejecutar su cuerpo cuando se invoca.

El objeto Generator devuelve otro objeto con dos propiedades: `done` y `value`. En otras palabras, un objeto Generator es iterable.

Lo siguiente llama al método `next()` en el objeto Generator:

```javascript
let result = gen.next();
console.log(result);
```

que nos devuelve:

```javascript
invoked 1st time
{value: 1, done: false}
```

Como se puede observar, el objeto `Generator` ejecuta su cuerpo que genera el mensaje 'invoked 1st time' en la línea 1 y devuelve el valor 1 en la línea 2.

La declaración de `yield` devuelve 1 y detiene el generador en la línea 2.

De manera similar, el siguiente código invoca el método `next()` del generador por segunda vez:

```javascript
result = gen.next();
console.log(result);
```

Salida:

```javascript
invoked 2nd time
{ value: 2, done: false }
```

Esta vez, el generador reanuda su ejecución desde la línea 3 que genera el mensaje 'invocado por segunda vez' y devuelve (o cede) 2.

Lo siguiente invoca el método `next()` del objeto generador por tercera vez:

```javascript
result = gen.next();
console.log(result);
```

y nos devuelve:

```javascript
{ value: undefined, done: true }
```

Dado que un generador es iterable, se puede usar el bucle `for ... of`:

```javascript
for (const g of generate()) {
    console.log(g);
}
```

## Secuencias infinitas

En el siguiente ejemplo generamos una secuencia infinita:

```javascript
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
```

## Iteradores con generadores

Cuando se implementa un iterador, se ha de definir manualmente el método `next()`. En el método `next()`, también se debe guardar manualmente el estado del elemento actual.

Dado que los generadores son iterables, pueden ayudarlo a simplificar el código para implementar el iterador.

El siguiente es un iterador de secuencia de iterador:

```javascript
class Sequence {
    constructor( start = 0, end = Infinity, interval = 1 ) {
        this.start = start;
        this.end = end;
        this.interval = interval;
    }
    [Symbol.iterator]() {
        let counter = 0;
        let nextIndex = this.start;
        return  {
            next: () => {
                if ( nextIndex < this.end ) {
                    let result = { value: nextIndex,  done: false }
                    nextIndex += this.interval;
                    counter++;
                    return result;
                }
                return { value: counter, done: true };
            }
        }
    }
}
```

Y esta es la nueva clase usando un generador:

```javascript
class Sequence {
    constructor( start = 0, end = Infinity, interval = 1 ) {
        this.start = start;
        this.end = end;
        this.interval = interval;
    }
    * [Symbol.iterator]() {
        for( let index = this.start; index <= this.end; index += this.interval ) {
            yield index;
        }
    }
}
```

Como se puede ver, el método `Symbol.iterator` es mucho más simple usando el generador.

La siguiente secuencia de comandos utiliza el iterador de secuencia para generar una secuencia de números impares del 1 al 10:







