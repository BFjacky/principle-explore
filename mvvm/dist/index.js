/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mvvm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mvvm.js */ \"./src/mvvm.js\");\n\r\nconst data = {\r\n    person: {\r\n        name: '陈云飞',\r\n        age: 20,\r\n        location: {\r\n            province: '河北省',\r\n            city: '唐山市',\r\n        }\r\n    },\r\n    love: ['前端', '摄影', '健身'],\r\n}\r\nconst mvvm = new _mvvm_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n    id: 'all',\r\n    data\r\n});\r\n\r\nsetTimeout(() => {\r\n    data.person.location.province = '黑龙江省';\r\n}, 1000);\r\nsetTimeout(() => {\r\n    data.person.location.city = '哈尔滨市';\r\n}, 2000);\r\nsetTimeout(() => {\r\n    data.love = ['睡觉']\r\n}, 1500)\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mvvm.js":
/*!*********************!*\
  !*** ./src/mvvm.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _observe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observe.js */ \"./src/observe.js\");\n\r\n\r\n//遍历该元素下的所有节点\r\nconst nodes = [];\r\nconst complieTemplate = function (domNode) {\r\n    //获得此节点的信息\r\n    if (domNode.nodeType === 3) {\r\n        //获得文本节点，替换文本节点中的内容\r\n        if (domNode.nodeValue) {\r\n            //正则表达式匹配{{}}中的内容\r\n            const patt = /(?<={{)[^}]+(?=}})/g;\r\n            const res = domNode.nodeValue.match(patt);\r\n            if (res) {\r\n                //如果有 {{}} 模板表达式\r\n                //记录该textNode 中所有的 模板变量\r\n                const datas = [];\r\n                res.forEach((data) => {\r\n                    datas.push(data);\r\n                })\r\n                domNode.datas = [];\r\n                datas.forEach((data) => {\r\n                    domNode.datas.push(data.split('.'));\r\n                })\r\n                //push到我们需要控制的nodes数组中\r\n                nodes.push(domNode);\r\n            }\r\n        }\r\n    }\r\n\r\n    const childNodes = domNode.childNodes;\r\n    if (!childNodes.length) {\r\n        //该元素没有子节点\r\n        return\r\n    }\r\n    childNodes.forEach((ele) => {\r\n        complieTemplate(ele);\r\n    })\r\n}\r\n\r\n\r\n//将数据渲染至视图层\r\nconst renderView = function (nodes, data) {\r\n    //生成新的nodeValue\r\n    const patt = /[{][{][\\w|\\.]+[}][}]/g;\r\n    nodes.forEach((node) => {\r\n        node.nodeValue = node.nodeTemplate.replace(patt, (res, index) => {\r\n            res = res.slice(2, -2);\r\n            const val = eval(`data.${res}`);\r\n            return val\r\n        })\r\n    })\r\n}\r\n\r\n\r\n//已知数据层发生变化，更新视图层\r\nconst updateView = function (path, data) {\r\n    const needUpdateNodes = [];\r\n    nodes.forEach((node) => {\r\n        node.datas.some((data) => {\r\n            //在该节点中，如果有和变化的数据相匹配的模板，则更新此节点的视图\r\n            for (let i = 0; i < path.length; i++) {\r\n                if (data.length - 1 < i) {\r\n                    needUpdateNodes.push(node);\r\n                    return true;\r\n                }\r\n                if (data[i] !== path[i]) {\r\n                    return false;\r\n                }\r\n                if (data.length - 1 === i) {\r\n                    needUpdateNodes.push(node);\r\n                    return true;\r\n                }\r\n            }\r\n        })\r\n    })\r\n    renderView(needUpdateNodes, data)\r\n\r\n}\r\n\r\n\r\nconst MVVM = function (prop) {\r\n    const containerNode = document.getElementById(prop.id);\r\n\r\n    //获得所有需要监听的dom节点\r\n    complieTemplate(containerNode);\r\n    //将所有的nodeValue中含有模板字符串的内容 转移到 nodeTemplate字段上\r\n    nodes.forEach((node) => {\r\n        node.nodeTemplate = node.nodeValue;\r\n    })\r\n\r\n    //首次渲染视图\r\n    renderView(nodes, prop.data);\r\n\r\n    Object(_observe_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(prop.data, (path) => {\r\n        //更新视图\r\n        updateView(path, prop.data);\r\n    })\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (MVVM);\n\n//# sourceURL=webpack:///./src/mvvm.js?");

/***/ }),

/***/ "./src/observe.js":
/*!************************!*\
  !*** ./src/observe.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//对象属性监听\r\nfunction objectWatch(obj, callback) {\r\n    //判断该变量为对象||数组||值\r\n    const observe = function (_obj, path) {\r\n        const type = Object.prototype.toString.call(_obj);\r\n        if (type === '[object Object]') {\r\n            traversal(_obj, path)\r\n        }\r\n        else if (type === '[object Array]') {\r\n            traversal(_obj, path)\r\n            cloneArray(_obj, path)\r\n        }\r\n    }\r\n\r\n    //递归遍历属性加上setter\r\n    const traversal = function (_obj, path) {\r\n\r\n        const _this = this;\r\n        Object.keys(_obj).forEach((prop) => {\r\n\r\n            let val = _obj[prop];\r\n\r\n            const newPath = [...path];\r\n\r\n            newPath.push(prop);\r\n\r\n            Object.defineProperty(_obj, prop, {\r\n                get: function () {\r\n                    return val;\r\n                },\r\n                set: function (newVal) {\r\n                    val = newVal;\r\n                    callback(newPath);\r\n                }\r\n            })\r\n            observe(val, newPath);\r\n\r\n        })\r\n    }\r\n\r\n    //重写数组原型链上的方法\r\n    const cloneArray = function (_array, path) {\r\n        const methods = ['copyWithin', 'fill', 'push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];\r\n        const newProto = Object.create(Array.prototype);\r\n        methods.forEach((method) => {\r\n            Object.defineProperty(newProto, method, {\r\n                value: function (newval) {\r\n                    // console.log(`重写数组中的方法:${method}`)\r\n                    const result = Array.prototype[method].call(_array, arguments);\r\n                    callback(path);\r\n                    return result;\r\n                },\r\n                enumerable: false,\r\n                configurable: false,\r\n                writable: true\r\n            })\r\n        })\r\n\r\n        _array.__proto__ = newProto;\r\n    }\r\n    observe(obj, [])\r\n}\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (objectWatch);\n\n//# sourceURL=webpack:///./src/observe.js?");

/***/ })

/******/ });