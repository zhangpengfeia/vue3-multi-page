# Vue 3 + TypeScript + Vite
1. 装依赖
npm install

2. 创建页面
命令创建多页面:
> npm run new
手动创建:
直接在 src/pages 中新建项目，然后在 multiPages.json 中添加一条项目记录

3. 运行
单独运行多页面:
> npm run start --pro=proname // proname 项目名称
可以在开一个cmd窗口运行第二个项目

4. 打包
现在只能单独打包:
> npm run build --pro=proname // proname 项目名称

打包后目录
```js
// dist

├─proname1
│  ├─css
│  └─js
    index.html
└─proname2
    ├─css
    └─js
    index.html
```
