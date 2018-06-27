//对象属性监听
function objectWatch(obj, callback) {
    //判断该变量为对象||数组||值
    const observe = function (_obj, path) {
        const type = Object.prototype.toString.call(_obj);
        if (type === '[object Object]') {
            traversal(_obj, path)
        }
        else if (type === '[object Array]') {
            traversal(_obj, path)
            cloneArray(_obj, path)
        }
    }

    //递归遍历属性加上setter
    const traversal = function (_obj, path) {

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
            observe(val, newPath);

        })
    }

    //重写数组原型链上的方法
    const cloneArray = function (_array, path) {
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
    observe(obj, [])
}


export default objectWatch