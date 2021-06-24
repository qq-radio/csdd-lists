# csdd-lists

**Personal Consumption List Platform 个人消费清单平台**

## 写在最前

这个项目最开始的初衷是希望自己少买买买、多存钱来着~让自己对每个月的支出有个大概规划，避免盲目消费。原本只想简单的增删改查而已，后来为了隐私添加了密码登录，为了分析消费趋势添加了echarts图以及添加了多语言切换等功能，具体可看下面演示

## 快速启动

```
# csdd-lists 根路径
npm i 
npm run serve
# server 文件夹 （记得先启用mongodb）
nodemon index.js
```

## 前端技术栈

- vue3
- vue-router
- vuex
- axios
- element-plus
- bootstrap
- echarts
- sass
- vue-i18n

## 后端技术栈

- node
- express
- mongodb

## 目录结构说明

```
.
├─ package.json                       配置、依赖管理
├─ server                             
│    ├─ api.js                        服务器请求接口封装
│    ├─ db.js                         mongodb数据库封装
│    ├─ index.js                      服务器入口文件
│    ├─ jwt.js
│    └─ lists.csv                    （可导入mongodb使用）
├─ src
│    ├─ App.vue
│    ├─ assets
│    │    ├─ allCss                   views、components文件夹下的各个vue单文件对应的less样式
│    │    │    ├─ About.less
│    │    │    ├─ App.less
│    │    │    ├─ Graphics.less
│    │    │    ├─ Home.less
│    │    │    ├─ Login.less
│    │    │    └─ Table.less
│    │    ├─ bgImg.jpg
│    │    └─ iconfont
│    │           └─ ...
│    ├─ components                    子组件文件夹
│    │    ├─ Graphics.vue
│    │    ├─ More.vue
│    │    └─ Table.vue
│    ├─ i18n.js                       多语言配置
│    ├─ language                      多语言json数据
│    │    ├─ cn.json
│    │    └─ en.json
│    ├─ main.js
│    ├─ router
│    │    └─ index.js
│    ├─ store
│    │    └─ index.js
│    └─ views                         页面文件夹
│           ├─ Home.vue
│           ├─ Login.vue
│           └─ Test.vue
└─ vue.config.js                      跨域、打包等配置
```

## 功能演示

- **登录、页面展示*

![1](README.assets/1.gif)

- **（表格页）切换多语言、切换年度、新增数据、修改数据、删除数据**

![2](README.assets/2.gif)

- **（趋势图页-折线图）切换多语言、切换年度**

![3](README.assets/3.gif)

- **（趋势图页-饼图）切换多语言、切换年度、切换月份**

![4](README.assets/4.gif)

## 后续功能

当初想实现的功能大致都实现了，剩下的都是小问题了，后续遇到啥再修修补补吧~
