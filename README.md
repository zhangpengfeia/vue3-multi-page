# Vue 3 + TypeScript + Vit
## 创建页面
命令创建多页面
npm run proname:描述

## 运行
npm run start
> http://localhost:5000/pages/项目名称/index.html

单独运行多页面
npm run start --pro=proname // proname 项目名称

## 打包
现在只能单独打包
npm run build --pro=proname // proname 项目名称

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