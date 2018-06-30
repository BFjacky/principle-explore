function bibao() {
    let a = 1;
    let b = 1;
    return function () {
        console.log(++a);
        a = b;
    }
}

const print = bibao();
print();
print();
print();