export const md = `
**这是我参与「第五届青训营 」伴学笔记创作活动的第15天**
# 构建工具
为什么需要构建工具: 前端是有一系列资源组成的，js 代码，css样式，静态资源，他们产生了一系列的资源，他们有一系列的问题，而构建工具就是解决这些问题的：

-   模块化: 在ESM之前社区开发了各种JS模块化方式如CommonJS、UMD等
-   资源编译: Less/Sass编译等。
-   产物质量： tree shaking等
-   开发效率：HMR等
# Vite
1.  vite 是新一代前端构建工具，No-bundle开发，源文件不需要打包，生成环境基于 rollup ，它的特点是：高性能，dev和热更新都很快，简单易用
1.  vite 基于原生ESM开发服务 vite dev serve，无需打包项目源码，天然按需加载，可以利用文件级的浏览器缓存
1.  vite 使用 go 开发的 esbuild 工具，摒弃了原生js开发的弊端
1.  vite 内置了很多webpack的基础设置，包括 css 的解析，html 插件等等
## 浏览器支持

开发环境中：Vite需要在支持原生 ES 模块动态导入的浏览器中使用。生产环境中：默认支持的浏览器需要支持 通过脚本标签来引入原生 ES 模块 。可以通过官方插件 @vitejs/plugin-legacy 支持旧浏览器。
## 预打包
1.  避免 node_modules 过多的文件请求
1.  将 CommonJS 的格式转换为 ESM 的格式

### 实现原理

1.  服务启动前扫描代码中用到的依赖
1.  使用 esbuild 对依赖代码进行预打包
1.  改写 import 语句，指定依赖为预构建产物的路径

## 单文件编译
用Esbuild编译TS/JSX

-   优势：编译速度提升 10-100x
-   局限性：不支持类型检查，不支持语法降级到ES5
## 插件机制

Vite 由于在开发环境中使用的不是 Rollup，因此 Vite 有一个 Plugin Container 来模式 Rollup 插件机制，使得 Vite 可以支持一些 Rollup 插件。而在生产环境，Vite 直接使用 Rollup。

## Vite进阶

-   esbuild、rollup两个底层编译工具
-   vite插件开发：抽离逻辑，易于拓展。通过hook在不同阶段插入自定义逻辑。
-   代码分割：并发请求，提高缓存命中率。
-   SSR：优化首屏渲染和SEO优化。
-   深度底层标准
-   底层工具`
