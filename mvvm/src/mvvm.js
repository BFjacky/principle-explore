import objectWatch from "./observe.js"

//遍历该元素下的所有节点
const nodes = [];
const complieTemplate = function (domNode) {
    //获得此节点的信息
    if (domNode.nodeType === 3) {
        //获得文本节点，替换文本节点中的内容
        if (domNode.nodeValue) {
            //正则表达式匹配{{}}中的内容
            const patt = /(?<={{)[^}]+(?=}})/g;
            const res = domNode.nodeValue.match(patt);
            if (res) {
                //如果有 {{}} 模板表达式
                //记录该textNode 中所有的 模板变量
                const datas = [];
                res.forEach((data) => {
                    datas.push(data);
                })
                domNode.datas = [];
                datas.forEach((data) => {
                    domNode.datas.push(data.split('.'));
                })
                //push到我们需要控制的nodes数组中
                nodes.push(domNode);
            }
        }
    }

    const childNodes = domNode.childNodes;
    if (!childNodes.length) {
        //该元素没有子节点
        return
    }
    childNodes.forEach((ele) => {
        complieTemplate(ele);
    })
}


//将数据渲染至视图层
const renderView = function (nodes, data) {
    //生成新的nodeValue
    const patt = /[{][{][\w|\.]+[}][}]/g;
    nodes.forEach((node) => {
        node.nodeValue = node.nodeTemplate.replace(patt, (res, index) => {
            res = res.slice(2, -2);
            const val = eval(`data.${res}`);
            return val
        })
    })
}


//已知数据层发生变化，更新视图层
const updateView = function (path, data) {
    const needUpdateNodes = [];
    nodes.forEach((node) => {
        node.datas.some((data) => {
            //在该节点中，如果有和变化的数据相匹配的模板，则更新此节点的视图
            for (let i = 0; i < path.length; i++) {
                if (data.length - 1 < i) {
                    needUpdateNodes.push(node);
                    return true;
                }
                if (data[i] !== path[i]) {
                    return false;
                }
                if (data.length - 1 === i) {
                    needUpdateNodes.push(node);
                    return true;
                }
            }
        })
    })
    renderView(needUpdateNodes, data)

}


const MVVM = function (prop) {
    const containerNode = document.getElementById(prop.id);

    //获得所有需要监听的dom节点
    complieTemplate(containerNode);
    //将所有的nodeValue中含有模板字符串的内容 转移到 nodeTemplate字段上
    nodes.forEach((node) => {
        node.nodeTemplate = node.nodeValue;
    })

    //首次渲染视图
    renderView(nodes, prop.data);

    objectWatch(prop.data, (path) => {
        //更新视图
        updateView(path, prop.data);
    })

}

export default MVVM;