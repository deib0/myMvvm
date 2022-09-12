export default function proxy(data,vm){
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