// 求数组中元素两两不相邻的子序列最大和

//获得一个数组 的 不相邻子序列最大和
function maxSum(array) {
    if (array.length === 2) {
        if (array[1] > array[0]) {
            return array[1];
        } else {
            return array[0];
        }
    }
    if (array.length === 3) {
        if (array[0] + array[2] >= array[1]) {
            return array[0] + array[2];
        }
        else {
            return array[1]
        }
    }

    if (array.length === 4) {
        //以数组前两个为基础进行比较
        if (array[0] + maxSum(array.slice(2)) > array[1] + array[3]) {
            return array[0] + maxSum(array.slice(2))
        } else {
            return array[1] + array[3]
        }
    }

    if (array.length >= 5) {
        //以数组前两个为基础进行比较
        if (array[0] + maxSum(array.slice(2)) > array[1] + maxSum(array.slice(3))) {
            return array[0] + maxSum(array.slice(2))
        } else {
            return array[1] + maxSum(array.slice(3))
        }
    }
}


console.log(maxSum([9,3,6,11,2]))    //20
console.log(maxSum([9,3,4,7,11]))    //24
