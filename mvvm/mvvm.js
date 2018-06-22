//对象属性监听
const objectWatch = function (obj, callback) {
    //判断该变量为对象||数组||值
    this.observe = function (_obj, path) {
        const type = Object.prototype.toString.call(_obj);
        if (type === '[object Object]') {
            this.traversal(_obj, path)
        }
        else if (type === '[object Array]') {
            this.traversal(_obj, path)
            this.cloneArray(_obj, path)
        }
    }

    //递归遍历属性加上setter
    this.traversal = function (_obj, path) {

        const _this = this;
        Object.keys(_obj).forEach((prop) => {

            let val = _obj[prop];

            const newPath = [...path];

            newPath.push(prop);

            Object.defineProperty(_obj, prop, {
                get: function () {
                    return val;
                },
                set: function (newVal) {
                    val = newVal;
                    callback(newPath);
                }
            })
            _this.observe(val, newPath);

        })
    }

    //重写数组原型链上的方法
    this.cloneArray = function (_array, path) {
        const methods = ['copyWithin', 'fill', 'push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
        const newProto = Object.create(Array.prototype);
        methods.forEach((method) => {
            Object.defineProperty(newProto, method, {
                value: function (newval) {
                    // console.log(`重写数组中的方法:${method}`)
                    const result = Array.prototype[method].call(_array, arguments);
                    callback(path);
                    return result;
                },
                enumerable: false,
                configurable: false,
                writable: true
            })
        })

        _array.__proto__ = newProto;
    }
    this.observe(obj, [])
}


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
