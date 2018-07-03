//es6中的proxy，用于修改某些元素的默认行为
const proxy = new Proxy({ name: 'cyf' }, {
    get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        // console.log(target, key, value, receiver)
        return Reflect.set(target, key, value, receiver)
    }
})

proxy.name = 'chenyunfei'
console.log(proxy.name)


//将proxy添加到person的原型链上
const person = Object.create(proxy);
console.log(proxy.name)





//使用Proxy实现观察者模式
class Observer {
    receive(ele) {
        console.log(`观察者监听到了改变`, ele)
    }
}
class Subject {
    constructor() {
        this.observers = [];
        //为Subject添加proxy
        const _this = this;
        const proxy = new Proxy(this, {
            get: function (target, key, receiver) {
                return Reflect.get(target, key, receiver);
            },
            set: function (target, key, value, receiver) {
                //通知观察者
                _this.notifyObserver();
                return Reflect.set(target, key, value, receiver)
            }
        })
        return proxy;
    }
    addObserver(observer) {
        this.observers.push(observer)
    }
    notifyObserver() {
        this.observers.forEach((e) => {
            e.receive()
        })
    }
}

const observer1 = new Observer();
const subject = new Subject();
subject.addObserver(observer1);
subject.name = 1;
