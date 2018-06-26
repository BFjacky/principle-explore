'use strict'
//ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。
// if (true)
//     function demo() {

//     }

//彻底冻结对象
const constantify = function (obj) {
    Object.freeze(obj);

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
            constantify(obj[key]);
        }
    })

}


//node环境顶层对象
// console.log(global)
var name = 'chenyunfei';
console.log(global.name)