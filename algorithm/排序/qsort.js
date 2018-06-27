const qsort = function (array, begin = 0, end = array ? array.length - 1 : 0) {
    if (!array || array.length === 0) {
        return [];
    }

    let leftIndex = begin;
    let rightIndex = end;
    let flagIndex = begin;
    const flagValue = array[leftIndex];

    //默认升序排序
    while (rightIndex > leftIndex) {
        while (true) {
            if (array[rightIndex] < flagValue) {
                array = swap(array, rightIndex, flagIndex);
                flagIndex = rightIndex;
                break;
            }
            if (rightIndex <= flagIndex) break;
            rightIndex--
        }
        while (true) {
            if (array[leftIndex] > flagValue) {
                array = swap(array, leftIndex, flagIndex);
                flagIndex = leftIndex;
                break;
            }
            if (leftIndex >= flagIndex) break;
            leftIndex++;
        }
    }

    if (begin < leftIndex) {
        qsort(array, begin, leftIndex - 1);
    }
    if (end > rightIndex) {
        qsort(array, rightIndex + 1, end);
    }

    return array
}



const swap = function (arr, index1, index2) {
    const tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;
    return arr
}


console.log(qsort([5, 1, 3, 7, 2, 9, 6, 4, 0, 11, -4]))