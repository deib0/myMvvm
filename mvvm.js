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
function proxy(data){
    for(let key in data){
        Object.defineProperty(this,key,{
            configurable:true,
            get(){
                return this._data[key]
            },
            set(newVal){
                this._data[key]=newVal
            }
        })
    }
}

function Mvvm(options={}){
    // 将 options 挂载到实例上的 $options
    this.$options=options
    // 等同于 let data = this.$options.data;this._data=this.$options.data
    let data = this._data=this.$options.data
    // 数据劫持
    observe(data)
    // 数据代理
    proxy.call(this,data)

}



