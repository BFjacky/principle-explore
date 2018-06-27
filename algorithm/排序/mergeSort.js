//归并排序
function mergeSort(arr1, arr2) {
    let mergedArray1, mergedArray2;
    if (arr1.length === 1 && arr2.length === 1) {
        return mergeTwoArray(arr1, arr2);
    }
    if (arr1.length === 1 || arr2.length === 1) {
        let mergedArray;
        if (arr1.length === 1) {
            const [subArr1, subArr2] = sliceArray(arr2);
            mergedArray = mergeSort(subArr1, subArr2);
            return mergeTwoArray(arr1, mergedArray);
        } else {
            const [subArr1, subArr2] = sliceArray(arr1);
            mergedArray = mergeSort(subArr1, subArr2);
            return mergeTwoArray(mergedArray, arr2);
        }
    }
    if (arr1.length > 1) {
        const [subArr1, subArr2] = sliceArray(arr1);
        mergedArray1 = mergeSort(subArr1, subArr2);
    }
    if (arr2.length > 1) {
        const [subArr1, subArr2] = sliceArray(arr2);
        mergedArray2 = mergeSort(subArr1, subArr2);
    }


    return mergeTwoArray(mergedArray1, mergedArray2)
}



//均分两个数组
function sliceArray(array) {
    const half = array.length / 2;
    const arr1 = array.slice(0, half);
    const arr2 = array.slice(half);
    return [arr1, arr2];
}



//将两个有序序列合并为一个有序序列
function mergeTwoArray(arr1, arr2) {

    let newArray = [];
    let arr1Index = 0;
    let arr2Index = 0;
    while (arr1Index <= arr1.length - 1) {
        while (arr2Index <= arr2.length - 1) {
            if (arr2[arr2Index] <= arr1[arr1Index]) {
                newArray.push(arr2[arr2Index]);
                arr2Index++;
                continue;
            }
            break;
        }
        newArray.push(arr1[arr1Index]);
        arr1Index++;
    }


    if (arr1Index < arr1.length) {
        //将arr1的后面部分放到 newArray
        arr1 = arr1.slice(arr1Index);
        newArray = newArray.concat(arr1)
    }


    if (arr2Index < arr2.length) {
        //将arr2的后面部分放到 newArray
        arr2 = arr2.slice(arr2Index, );
        newArray = newArray.concat(arr2)
    }


    return newArray;
}


