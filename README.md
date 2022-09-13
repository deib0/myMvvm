# myMvvm
安装
```
yarn add friday-mvvvm
```
使用
```
<!DOCTYPE html>
<html lang="en">
<body>
    <div id="app">{{number}}<button id="addButton">+1</button></div>
    <script type="module">
        import Mvvm from 'fridy-mvvvm'
        let mvvm = new Mvvm({
            el: '#app',
            data: { 
                number:0
            }
        });
        const addButton =document.querySelector('#addButton')
        addButton.addEventListener('click',()=>mvvm.number+=1)
    </script>
</body>
</html>
```
