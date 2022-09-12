import Watcher from "./watcher";
export default function compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    // 将 DOM 树中的节点放到内存中
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    replace(fragment);
    // 对整个代码片段替换的方法
    function replace(frag) {
        Array.from(frag.childNodes).forEach(function (node) {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;
            //  即是文本节点又有{{}}
            if (node.nodeType === 3 && reg.test(txt)) { 
                // 对一个符合的文本节点替换的方法
                !function replaceTxt() {
                    node.textContent = txt.replace(reg, (matched, placeholder) => {
                        new Watcher(vm, placeholder, replaceTxt);  // 监听变化，重新进行匹配替换内容
                        return placeholder.split('.').reduce((val, key) => {
                            return val[key];
                        }, vm);
                    });
                }();
            }
            // 如果该节点拥有子节点，那么递归 replace
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        });
    }
    vm.$el.appendChild(fragment);
}