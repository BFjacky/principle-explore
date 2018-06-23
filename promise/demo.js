const arr =[1,2,3,4]; 
const arr2 = [];

function push(arr){
    arr2.push(arr);
}
push(...arr)
console.log(arr2)