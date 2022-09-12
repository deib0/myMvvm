export default function observe(data={}){
    // 如果不是对象则返回
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