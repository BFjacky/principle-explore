const demo = function (...values) {
    console.log(values.length);
}
demo();
demo(1, 2, 3)


//箭头函数
function foo1() {
    setTimeout(() => {
        console.log('id:', this);
    }, 100);
}
function foo2() {
    setTimeout(function () {
        console.log('id:', this);
    }, 100);
}
var id = 21;

foo1.call({ id: 42 });
foo2.call({ id: 21 })