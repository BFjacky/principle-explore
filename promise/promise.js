function Promise(todofn) {
    const _this = this;

    let status = 'pending';

    const thenTodoFnList = [];

    this.then = function (thenTodoFn) {
        thenTodoFnList.push(thenTodoFn);
        return this;
    }

    this.resolve = function (value) {
        //promise内部调用了resolve方法
        status = 'fullFilled';
        setTimeout(() => {
            let index = -1;
            thenTodoFnList.every((thenTodoFn) => {
                index++;
                if (thenTodoFn instanceof Promise) {
                    //在串行then中发现了一个promise,将thenTodoFnList中接下来的方法均绑定到新的promise中
                    for (let i = index + 1; i < thenTodoFnList.length; i++) {
                        thenTodoFn.then(thenTodoFnList[i]);
                    }

                    return false;
                } else {
                    value = thenTodoFn(value)
                    return true
                }
            })
        }, 0);
    }

    todofn(this.resolve);
}

const p1 = new Promise(function (resolve) {
    setTimeout(function () {
        resolve(1);
    }, 100);
});
const p2 = new Promise(function (resolve) {
    setTimeout(function () {
        resolve(3);
    }, 100);
});
p1.then(
    function (res) {
        console.log(`1:`, res); return 2;
    }
).then(
    function (res) { console.log(`2:`, res) }
).then(p2)
    .then(function (res) { console.log(`3:`, res) });


