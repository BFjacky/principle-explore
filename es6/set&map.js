//set 数据结构，Es6中提供了Set数据结构，set结构中不会添加重复的值
const arr = [1,2,3,4,5,5,6];
const set = new Set (arr);
console.log(set)

//像set中添加一个对象,这里的不添加重复的obj还是指的引用，而非堆中的实际值
const obj = {name:'cyf'};
const obj2 = {name:'cyf'};
set.add(obj);
set.add(obj2);
console.log(set)

