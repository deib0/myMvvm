import Dep from "./dep";
export default function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.exp = exp; // 添加到订阅中
    Dep.target = this;
    let val = vm;
    let arr = exp.split('.');
    arr.forEach(key => {
        val = val[key];
    });
    Dep.target = null;
}

Watcher.prototype.update = function () {
    let val = this.vm;
    let arr = this.exp.split('.');
    arr.forEach(key => {
        val = val[key];
    });
    this.fn(val);  // newVal
};