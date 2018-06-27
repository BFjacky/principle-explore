import MVVM from './mvvm.js'
const data = {
    person: {
        name: '陈云飞',
        age: 20,
        location: {
            province: '河北省',
            city: '唐山市',
        }
    },
    love: ['前端', '摄影', '健身'],
}
const mvvm = new MVVM({
    id: 'all',
    data
});

setTimeout(() => {
    data.person.location.province = '黑龙江省';
}, 1000);
setTimeout(() => {
    data.person.location.city = '哈尔滨市';
}, 2000);
setTimeout(() => {
    data.love = ['睡觉']
}, 1500)