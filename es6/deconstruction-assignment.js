let times = 5;

//注意值的变化
let a = 0, b = 1;
while (times--) {
    console.log(a, b);
    [a, b] = [b, a + b];
}