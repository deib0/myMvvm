export default function Dep() {
    this.subs = [];
}

Dep.prototype.addSub = function (sub) {
    console.log(this.subs)
    if(this.subs.length>=10){
        this.subs.shift()
    }
    this.subs.push(sub);
};
Dep.prototype.notify = function () {
    this.subs.forEach(sub=>sub.update())
};