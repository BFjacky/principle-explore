const { fengexian } = require("../utils/index");

//TODO: 留个疑问 自执行函数执行时的this指针是否指向window||global(看来应该是的)
function Parent() {
    this.name = "cyf"
    this.print = function () {
        console.log(this.name);
        (function () {
            console.log(this.name)
        }());
    }
}
new Parent().print()


fengexian()
//TODO: 去获得new Num().n1的时候 会首先找该对象是否有该属性 如若没有才会在原型链上寻找
function Num() {
    this.n1 = 0;
}
Num.prototype = { n1: 10, n2: 100 };
console.log(new Num().n1, new Num().n2);


//TODO: 不加var的变量是全局变量
fengexian();
(function () {
    a = 4;
    b = 5;
})();
console.log(b);
console.log(a);

//TODO:
fengexian();
var cc = 'lala';
var bb = 'dada';
function demo() {
    console.log(cc + bb)
}
demo()


//TODO: 
fengexian();
const arr = [1, 2, 3, 4];
setTimeout(() => {
    arr.forEach(e => {
        console.log(e);
    })
}, 0);
console.log('便利完成')





