function Parent() {
    let number = 1;
    return function addNumber() {
        number++;
        console.log(number)
    }
}

const fromParent = Parent();
fromParent();