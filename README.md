# <center>react-multi-page-app</center>

## 介绍

react-multi-page-app 是一个基于 react 和 webpack5 的多页面应用架构，实现多页面便捷开发维护。

## 快速上手

```bash
git clone https://github.com/Felix-lucky/react-multi-page-app.git
```

## 安装依赖

```bash
npm install
```

## 开发

```bash
npm run dev
```

> http://localhost:9000/page1

## 打包

```bash
npm run build
```

## 目录结构

```txt
|____README.md
|____pacage.json
|____.babelrc
|____postcss.config.js
|____public
|____config
| |____webpack.common.js
| |____webpack.dev.js
| |____webpack.prod.js
| |____util.js
| |____index.html
|____src
| |____components
| |____utils
| |____pages
| | |____page1
| | | |____global.scss
| | | |____index.html
| | | |____index.jsx
| | |____page2
| | | |____global.scss
| | | |____index.html
| | | |____index.jsx
```
