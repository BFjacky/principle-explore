//0-1背包问题
/**
 * 
 * @param {number} V  背包容量为V
 * @param {array} objs 存放物品的数组 => 价值:obj.p , 重量:obj.v
 */
const V = 10;
const objs = [{ p: 3, v: 3 }, { p: 5, v: 10 }, { p: 3, v: 2 }, { p: 7, v: 11 }, { p: 1, v: 1 }];


//动态规划核心，保存已经求解出来的问题不再用递归实现，直接在数组中得到结果
const max = [];
for (const obj of objs) {
    max.push({ in: undefined, out: undefined })
}

//该函数的意义:求出一个给定的v和objs所对应的最优解
const solute = function (V, objs) {
    //如果只有一件物品了
    if (objs.length === 1) {
        if (objs[0].v <= V) {
            return objs[0].p;
        } else {
            return 0;
        }
    }
    //如果没有剩余容量了
    if (!V) {
        return 0;
    }
    //在objs中找出第一个能放进去的物品
    for (let i = 0; i < objs.length; i++) {
        if (objs[i].v <= V) {
            if (max[i].in === undefined && max[i].out === undefined) {
                //将objs[i]放进去的最优解
                const newObjs = objs.slice(0, i).concat(objs.slice(i + 1))
                const res1 = solute(V - objs[i].v, newObjs)
                //不将objs[i]放进去的最优解
                const res2 = solute(V, newObjs)
                //将结果存入到max数组中
                max[i].in = res1;
                max[i].out = res2;
            }


            if (max[i].in + objs[i].p > max[i].out) {
                return max[i].in + objs[i].p;
            }
            else {
                return max[i].out;
            }
        }
    }

    //有两件物品以上，未找到物品重量小于背包剩余容量的物品
    return 0;
}


console.log(solute(V, objs))
