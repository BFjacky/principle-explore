function ObserverList() {
    this.list = [];
}
ObserverList.prototype.add = function (observer) {
    this.list.push(observer);
}
ObserverList.prototype.remove = function (observer) {
    for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] === observer) {
            this.list.splice(i, 1);
            return;
        }
    }
}
ObserverList.prototype.length = function () {
    return this.list.length;
}
ObserverList.prototype.get = function (index) {
    return this.list[index];
}



function Subject() {
    this.observerList = new ObserverList();
}
Subject.prototype.addObservers = function (observers) {
    observers.forEach((observer) => {
        this.observerList.add(observer);
    })
}
Subject.prototype.removeObserver = function (observer) {
    this.observerList.remove(observer);
}
Subject.prototype.notify = function (context) {
    if (this.observerList.length() === 0) {
        return;
    }
    for (let i = 0; i < this.observerList.length(); i++) {
        this.observerList.get(i).receive()
    }
}

function Observer(name) {
    this.name = name;
    //订阅者接收发布者发送的消息 
    this.receive = function () {
        console.log(`订阅者${name}收到了消息`)
    }
}


//test--------------------------------------test
const subject = new Subject();
const observer1 = new Observer('1号')
const observer2 = new Observer('2号')
const observer3 = new Observer('3号')
subject.addObservers([observer1, observer2, observer3])
subject.notify();
