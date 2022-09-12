function observe(data={}){
    // this.options.data 如果不是对象则返回
    if(typeof data !== 'object')return
    for(let key in data){
        let val =data[key]
        if(typeof val === 'object')observe(val)
        Object.defineProperty(data,key,{
            configurable:true,
            get(){return val},
            set(newVal){
                if(val===newVal)return
                val =newVal
                observe(newVal)
                console.log('数据更新了')
            }
        })    
    }
}
function proxy(data,vm){
    for(let key in data){
        Object.defineProperty(vm,key,{
            configurable:true,
            get(){
                return vm._data[key]
            },
            set(newVal){
                vm._data[key]=newVal
            }
        })
    }
}
// 创建compile函数
function compile(el, vm) {
    // 将el挂载到实例上方便调用
    vm.$el = document.querySelector(el);
    // fragment 不在 DOM 树中，不会引起回流，更佳的性能
    let fragment = document.createDocumentFragment();
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);    // 此时将el中的内容放入内存中
    }
    // 对el里面的内容进行替换
    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}
            // 即是文本节点又有大括号的情况{{}}
            if (node.nodeType === 3 && reg.test(txt)) { 
                let result ={}
                let matchStr=txt.match(reg)
                // 处理字符串
                matchStr.forEach(item=>{
                    let formatStr =item.slice(2).slice(0,-2).split('.')
                    let val=vm
                    formatStr.forEach(item=>val=val[item])
                    result[item]=val
                })
                for(let key in result){
                    txt=txt.replace(key, result[key]).trim()
                }
                node.textContent=txt
            }
            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        });
    }
    replace(fragment);  // 替换内容
    vm.$el.appendChild(fragment);   // 再将文档碎片放入el中
}

function Mvvm(options={}){
    // 将 options 挂载到实例上的 $options
    this.$options=options
    // 等同于 let data = this.$options.data;this._data=this.$options.data
    let data = this._data=this.$options.data
    // 数据劫持
    observe(data)
    // 数据代理
    proxy(data,this)
    // 编译    
+   compile(options.el, this);

}



