const arr = [1, 2, 3, 4, 5];
const wait = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, 300);
    })
}


arr.forEach(async (e) => {
    if (e === 1) {
        await wait();
    }
    console.log(e)
})




