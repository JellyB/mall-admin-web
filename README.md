## 运行项目

### 1. 下载代码到本地

```js
git clone git push --all https://coding.jd.com/i18n-dependency/user-monitor-static.git user-monitor-static
```

### 2. 安装依赖

```js
cnpm install
```


### 3. 移除安装失败组件

#### 3.1 tui-editor 依赖错误

```js
[40/54] Installing cssom@0.3.x[tui-editor@1.3.3 › tui-chart@3.11.3 › raphael@git+https://github.com/nhn/raphael.git#2.2.0-c] install raphael from git raphael@git+https://github.com/nhn/raphael.git#2.2.0-c, may be very slow, please keep patience
```

1. package.json 中 删除 "tui-editor": "1.3.3", 

2. components 组件中移除 MarkdownEditor 组件

3. views/components-demo markdown.vue 移除

5. 移除引用

```js
@/views/components-demo/markdown in ./src/router/modules/components.js
{
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    },
```

### 4. 运行项目

```js
cnpm run dev
```

### 5 解决启动错误

#### 5.1 使用 core-js 3

```js
* @/components/MarkdownEditor in ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.
3.0@babel-loader/lib!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.10.1@vue-loade
r/lib??vue-loader-options!./src/views/components-demo/markdown.vue?vue&type=script&lang=js&
* core-js/modules/es.array.push.js in ./node_modules/_@babel_runtime@7.20.7@@babel/runtime/helpers/esm/objectSpread2.js, ./node_modules
/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.3.0@babel-loader/lib!./node_modules/_cache-load
er@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.10.1@vue-loader/lib??vue-loader-options!./src/components/Brea
dcrumb/index.vue?vue&type=script&lang=js& and 17 others
* core-js/modules/es.array.unshift.js in ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-l
oader@8.3.0@babel-loader/lib!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.10.1@v
ue-loader/lib??vue-loader-options!./src/components/DndList/index.vue?vue&type=script&lang=js&, ./src/vendor/Export2Excel.js and 1 other
* core-js/modules/es.error.cause.js in ./node_modules/_@babel_runtime@7.20.7@@babel/runtime/helpers/esm/regeneratorRuntime.js, ./src/co
mponents/Tinymce/dynamicLoadScript.js and 6 others
* core-js/modules/es.object.proto.js in ./node_modules/_@babel_runtime@7.20.7@@babel/runtime/helpers/esm/regeneratorRuntime.js
* core-js/modules/es.regexp.dot-all.js in ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-
loader@8.3.0@babel-loader/lib!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.10.1@
vue-loader/lib??vue-loader-options!./src/components/ThemePicker/index.vue?vue&type=script&lang=js&, ./src/utils/index.js
* core-js/modules/es.typed-array.at.js in ./src/components/ImageCropper/utils/data2blob.js, ./src/vendor/Export2Excel.js
* core-js/modules/es.typed-array.find-last-index.js in ./src/components/ImageCropper/utils/data2blob.js, ./src/vendor/Export2Excel.js
* core-js/modules/es.typed-array.find-last.js in ./src/components/ImageCropper/utils/data2blob.js, ./src/vendor/Export2Excel.js
* core-js/modules/web.atob.js in ./src/components/ImageCropper/utils/data2blob.js
* core-js/modules/web.dom-exception.constructor.js in ./src/components/ImageCropper/utils/data2blob.js
* core-js/modules/web.dom-exception.stack.js in ./src/components/ImageCropper/utils/data2blob.js
* core-js/modules/web.dom-exception.to-string-tag.js in ./src/components/ImageCropper/utils/data2blob.js
```

```bash
cnpm install core-js@3
```

### 6. 启动成功

```js
  App running at:
  - Local:   http://localhost:9527/ 
  - Network: http://10.0.63.190:9527/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

## 精简项目

### 1. 删除 src/views 下的源码，保留

- dashboard：首页
- error-page：异常页面
- login：登录
- redirect：重定向


### 2. 对 src/router/index 进行相应修改

```js
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]
```


```bash
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
```

### 3. 删除 src/router/modules 文件夹

删除 src/router/index.js 中

```js
/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'
```

### 4. 删除 src/vendor 文件夹


## 项目配置 setting.js

- title：站点标题，进入某个页面后，格式为：
```js
  title: 'user-monitor',
```
- 
- showSettings：是否显示右侧悬浮配置按钮
- tagsView：是否显示页面标签功能条
- fixedHeader：是否将头部布局固定
- sidebarLogo：菜单栏中是否显示LOGO
- errorLog：默认显示错误日志的环境

## 项目结构

- api：接口请求
- assets：静态资源
- components：通用组件
- directive：自定义指令
- filters：自定义过滤器
- icons：图标组件
- layout：布局组件
- router：路由配置
- store：状态管理
- styles：自定义样式
- utils：通用工具方法
- - auth.js：token 存取
- - permission.js：权限检查
- - request.js：axios 请求封装
- - index.js：工具方法
- views：页面
- permission.js：登录认证和路由跳转
- settings.js：全局配置
- main.js：全局入口文件
- App.vue：全局入口组件