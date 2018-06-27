//最长公共子序列
function longest(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    //如果最后
    if (!len1 || !len2) {
        return 0;
    }
    if (len1 === 1 || len2 === 1) {
        if (str1.charAt[0] === str2.charAt[0]) return 1;
        return 0;
    }
    //如果最后一个字符相等
    if (str1.charAt(len1 - 1) === str2.charAt(len2 - 1)) {
        return longest(str1.slice(0, -1), str2.slice(0, -1)) + 1;
    }

    //如果最后一个字符不相等则 max(str1[0,len-1]&str2[0,len-2]  ||  str1[0,len-2]&str2[0,len-1])
    if (longest(str1, str2.slice(0, -1)) > longest(str1.slice(0, -1), str2)) {
        return longest(str1, str2.slice(0, -1));
    } else {
        return longest(str1.slice(0, -1), str2);
    }
}
