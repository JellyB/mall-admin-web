# 环境配置

## 配置taobao镜像

题外话
http://npm.taobao.org和 http://registry.npm.taobao.org 将在 2022.06.30 号正式下线和停止 DNS 解析。

由于国内使用npm会很慢,这里推荐使用淘宝NPM镜像（http://registry.npmmirror.com） 

$ npm install -g cnpm –registry=http://registry.npmmirror.com

## 安装node.js

从node.js官网下载并安装node，安装过程很简单，一路“下一步”就可以了（傻瓜式安装）。 
安装完成之后，打开命令行工具，输入 node -v，如下图，如果出现相应的版本号，则说明安装成功，例如下图

## npm

npm包管理器，是集成在node中的，所以，直接输入 npm -v就会如下图所示，显示出npm的版本信息

## 安装cnpm

由于有些npm有些资源被屏蔽或者是国外资源的原因，经常会导致用npm安装依赖包的时候失败，所有我还需要npm的国内镜像—cnpm。

在命令行中输入 

```bash
$ npm install -g cnpm –registry=http://registry.npmmirror.com
```

然后等待，安装完成如下图。

## 安装vue-cli脚手架构建工具

在命令行中运行命令 npm install -g vue-cli ，然后等待安装完成。 
通过以上三部，我们需要准备的环境和工具都准备好了，接下来就开始使用vue-cli来构建项目。

## 用vue-cli构建项目

要创建项目，首先我们要选定目录，然后再命令行中把目录转到选定的目录。在这里，我选择桌面来存放新建的项目，则我们需要先把目录cd到指定目录

在指定目录中，在命令行中运行命令 

```bash
$ vue init webpack firstvue
```

解释一下这个命令，这个命令的意思是初始化一个项目，其中webpack是构建工具，也就是整个项目是基于webpack的。其中 firstvue 是整个项目文件夹的名称，这个文件夹会自动生成在你指定的目录中

运行初始化命令的时候回让用户输入几个基本的选项，如项目名称，描述，作者等信息，如果不想填直接回车默认就好

安装完成之后，会在我们的项目目录 firstvue 文件夹中多出一个node_modules文件夹，这里边就是我们项目需要的依赖包资源。 

安装完依赖包之后，就可以运行整个项目了。

## 运行项目 
在项目目录中，运行命令 npm run dev ，会用热加载的方式运行我们的应用，热加载可以让我们在修改完代码后不用手动刷新浏览器就能实时看到修改后的效果。 

这里简单介绍下 npm run dev 命令，其中的“run”对应的是package.json文件中，scripts字段中的dev，也就是 node build/dev-server.js命令的一个快捷方式。

项目运行成功后，浏览器会自动打开localhost:8080（如果浏览器没有自动打开，可以手动输入）。运行成功后，会看到如下所示的界面。


## Q & A

### 1. sh: vue-cli-service: command not found

解决方法：
cd到项目目录下，执行命令
    
$ sudo rm -rf node_modules package-lock.json && npm install 

然后根据提示输入密码。安装完成后，再次npm run dev就可以正常运行啦。



# 运行项目

## 1. 下载代码到本地

```js
git clone git push --all https://github.com/JellyB/mall-admin-web.git
```

## 2. 安装依赖

```js
cnpm install
```


## 3. 移除安装失败组件

## 3.1 tui-editor 依赖错误

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

## 4. 运行项目

```js
cnpm run dev
```

## 5 解决启动错误

### 5.1 使用 core-js 3

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

## 6. 启动成功

```js
  App running at:
  - Local:   http://localhost:9527/ 
  - Network: http://10.0.63.190:9527/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

## 7精简项目

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
  title: 'mall-admin-web',
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

## 启动

添加cors跨域白名单，修改mall-gateway GlobalCorsConfig 配置

```java
@Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:9091"));
        config.addAllowedMethod("*");
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(new PathPatternParser());
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
```