import compile from "./utils/compile";
import observe from "./utils/observe";
import proxy from "./utils/proxy";
export default function Mvvm(options={}){
    // 将 options 挂载到实例上的 $options
    this.$options=options
    // 等同于 let data = this.$options.data;this._data=this.$options.data
    let data = this._data=this.$options.data
    // 数据劫持
    observe(data)
    // 数据代理
    proxy(data,this)
    // 编译    
+   compile(options.el, this)
}



