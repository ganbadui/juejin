# 一、项目介绍

#### 项目介绍： 通过`Next.js+React+Typescript+Sass`实现仿掘金的首页和文章详情页以及主题化。

#### ⭐ 项目服务地址： [地址](https://juejin.skyseek.top/)

# 二、项目分工

> 好的团队协作可以酌情加分哟～请组长和组员做好项目分工与监督。

| **团队成员** | **主要贡献**                                                                              |
| ------------ | ----------------------------------------------------------------------------------------- |
| 杨鹏         | 队长统筹团队开发/负责后端 strapi 接口的编写/文章详情页/markdown 导航栏/作者组件/视频剪辑  |
| 赵洁         | 首页作者榜/广告组件/封装 useScroll 监听右边栏滑动/相关文章组件/项目测试/视频录制/文档编写 |
| 符前霖       | 搭建部署 strapi/首页文章列表组件/修复整体报错/优化页面/封装 bff                           |
| 蔡键浩       | 搭建项目结构/技术选型/接口对接/全局 tab 组件/媒体查询/切换黑夜模式/封装 bff               |
| 陈高攀       | 文档编写                                                                                  |
|              |                                                                                           |

# 三、项目实现

## 3.1. 技术选型与相关开发文档

**项目采用** **`Next.js+React+Typescript+Sass`** **技术开发**

### 3.1.1 理由：

`Next.js`是基于`React`的服务器渲染应用框架，而服务器渲染有首屏渲染快，对 SEO 友好等好处，使用 Typescript 是因为 Typescript 有增加代码的可读性和可维护性等优点，使用 Sass 是因为 Sass 能便利我们的开发，并且 sass 可以设置变量以及使用一些循环、判断等语法，能极大的提高我们的开发效率。

## 3.2.技术介绍：

1.  `Next.js`: 基于 React 服务端渲染的应用框架，用于构建 SEO 友好的 SPA 应用. [开发文档](https://www.nextjs.cn/)
1.  `React`：由 Facebook 开源的一个进行创建用户界面的一款 JavaScript 库，如今已应用于 Facebook 及旗下的 Instagram 应用。[开发文档](https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
1.  `Typescript`：TypeScript 是[微软](https://baike.baidu.com/item/%E5%BE%AE%E8%BD%AF/124767?fromModule=lemma_inlink)开发的一个开源的[编程语言](https://baike.baidu.com/item/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/9845131?fromModule=lemma_inlink)，通过在[JavaScript](https://baike.baidu.com/item/JavaScript/321142?fromModule=lemma_inlink)的基础上添加静态类型定义构建而成。TypeScript 通过 TypeScript[编译器](https://baike.baidu.com/item/%E7%BC%96%E8%AF%91%E5%99%A8/8853067?fromModule=lemma_inlink)或 Babel 转译为 JavaScript 代码，可运行在任何[浏览器](https://baike.baidu.com/item/%E6%B5%8F%E8%A7%88%E5%99%A8/213911?fromModule=lemma_inlink)，任何操作系统。[开发文档](https://www.tslang.cn/docs/home.html)
1.  `Sass`：是一个最初由 Hampton Catlin 设计并由 Natalie Weizenbaum 开发的层叠样式表语言。在开发最初版本之后，Weizenbaum 和 Chris Eppstein 继续通过 SassScript 来继续扩充 Sass 的功能。SassScript 是一个在 Sass 文件中使用的小型脚本语言。[开发文档](https://www.sass.hk/)

## 3.2 架构设计

1.  对于不同端的用户查看网页，如分辨率极小的移动端、介于极小分辨率和正常分辨率之间的移动端设备、正常移动端设备、ipad，架构的解决方案是使用`多媒体适配对不同端采用不同的页面样式`。
1.  对于返回数据接口数据有过多无用的数据，架构的解决方案是采用`BFF对接口数据进行筛选处理`。
1.  对于`页面的黑白主题切换`，架构的解决方案是将基础样式和背景抽离，主题化的样式全局注入，从注入数据中抽取出控制黑白主题切换的控制变量，然后通过浏览器存储实现多进程间的主题同步。
1.  对应触发频繁的事件我们采用`节流函数`，对这些触发频繁的事件进行节流。
1.  对应接口请求我们采用`二次封装并且统一处理`，需要请求数据，直接导入调用 api。

## 3.3 项目代码介绍

### 3.3.1.多媒体适配

暂时无法在飞书文档外展示此内容

- 通过多媒体适配，实现对多端的兼容

`media.sass`

**通过媒体查询对页面宽度进行监听，当页面宽度处于对应的范围时，采用不同的页面样式展示不同的页面结果。**

```
// 极小分辨率移动端设备
@mixin media-mini-mobile {
    @media screen and (max-width: 25.875rem) {
        @content;
    }
}

// 介于极小分辨率和正常分辨率之间的移动端设备
@mixin media-between-mini-and-normal-mobile {
    @media screen and (min-width: 25.876rem) and (max-width: 47.9375rem) {
        @content;
    }
}

// 移动端设备
@mixin media-mobile {
    @media screen and (max-width: 47.9375rem) {
        @content;
    }
}

// ipad
@mixin media-ipad {
    @media screen and (min-width: 47.9375rem) and (max-width: 75rem) {
        @content;
    }
}
```

`index.module.scss`:

给不同页面宽度情况下，编写不同的样式

```
@include media-ipad {
  .container {
    .main {
      .grid {
        width: 95%;
        margin: auto;
        justify-content: center;
      }
    }
  }
}

@include media-mobile {
  .container {
    .main {
      .title {
        font-size: 1.75rem;
        line-height: 2.4375rem;
      }
      .description {
        font-size: 0.875rem;
        line-height: 1.5rem;
        margin: 2rem 0;
      }
      .grid {
        width: 95%;
        margin: auto;
        justify-content: center;
        .card {
          height: 10rem;
          h2 {
            font-size: 1.125rem;
            line-height: 1.5625rem;
          }
          p {
            font-size: 0.75rem;
            line-height: 1.625rem;
          }
        }
      }
    }
  }
}
```

### 3.3.2.主题切换

暂时无法在飞书文档外展示此内容

- 动态切换黑夜白天

html 根元素是否有某个属性，利用 sass 变量统一修改

```
html[data-theme="dark"] {
--primary-color: #ffffff;
--primary-background-color: rgba(14, 14, 14, 1);
--footer-background-color: rgba(36, 36, 36, 1);
--navbar-background-color: rgba(0, 0, 0, 0.5);
--secondary-color: rgba(255, 255, 255, 0.5);
--link-color: #34a8eb;
--semi-page-active-color: rgb(84, 169, 255);
--semi-page-active-background-color: rgba(84, 169, 255, 0.2);
--semi-page-hover-background-color: rgb(23, 23, 23);
--navbar-icon: url("../public/logo_dark.png");
--theme-icon: url("../public/theme_dark.png");
--popup-close-icon: url("../public/close.png");
--popup-close-hover-background-color: #353535;
--popup-content-background-color: #1f1f1f;
--home-background-icon: url("../public/home_bg_dark.png");
--home-background-icon-webp: url("../public/home_bg_dark.webp"); }
html[data-theme="light"] {
--primary-color: #333333;
--primary-background-color: rgba(255, 255, 255, 1);
--footer-background-color: #f4f5f5;
--navbar-background-color: rgba(255, 255, 255, 0.5);
--secondary-color: #666666;
--link-color: #0070f3;
--semi-page-active-color: #333333;
--semi-page-active-background-color: rgb(234, 245, 255);
--semi-page-hover-background-color: rgb(244, 245, 245);
--navbar-icon: url("../public/logo_light.png");
--theme-icon: url("../public/theme_light.png");
--popup-close-icon: url("../public/close_light.png");
--popup-close-hover-background-color: #f5f5f5;
--popup-content-background-color: #f4f5f5;
--home-background-icon: url("../public/home_bg_light.png");
--home-background-icon-webp: url("../public/home_bg_light.webp");
}
```

监听本地缓存来同步不同页面间的主题

```
useEffect(() => {
const checkTheme = (): void => {
const item = (localStorage.getItem('theme') as Themes)|| Themes.light ;
setTheme(item);
document.getElementsByTagName('html')[0].dataset.theme = item;
};
checkTheme();
window.addEventListener('storage',checkTheme);
return (): void => {
window.removeEventListener('storage',checkTheme);
};
}, []);
```

### 3.3.3.api 请求

- 发请求

在 api 文件接受 strapi 的请求，下面是例子

```
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';
import { IArticleProps } from '../article/[articleId]';
//CMSDOMAIN 是http://127.0.0.1:1337
const getArticleInfoData = (req: NextApiRequest, res: NextApiResponse<IArticleProps>): void => {
  const { articleId } = req.query;
  axios.get(`${CMSDOMAIN}/api/article-infos/${articleId}`).then(result => {
    const data = result.data || {};
    res.status(200).json(data);
  });
};

export default getArticleInfoData;
```

在业务逻辑页面接受数据 下面是两个例子

```
//例1
export const getServerSideProps: GetServerSideProps = async context => {
  const { articleId } = context.query;
  //LOCALDOMAIN 是http://127.0.0.1:3000
  const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
    params: {
      articleId,
    },
  });
  return {
    props: data, //
  };
};
//例2
Home.getInitialProps = async (context): Promise<IProps> => {
  const { data: homeData } = await axios.get(`${LOCALDOMAIN}/api/home`);
  const { data: articleData } = await axios.post(`${LOCALDOMAIN}/api/articleIntro`, {
    pageNo: 1,
    pageSize: 6,
  });

  return {
    title: homeData.title,
    description: homeData.description,
    articles: {
      list: articleData.list.map((item: IArticleIntro) => ({
        label: item.label,
        info: item.info,
        link: `${LOCALDOMAIN}/article/${item.articleId}`,
      })),
      total: articleData.total,
    },
  };
};
```

### 3.3.4.页面跳转

- 跳转使用 next 的 Link

```
import Link from 'next/link';
（<Link href={item.link} key={index}>
       <div className={styles.card}>
            <h2>{item.label} &rarr;</h2>
                <p>{item.info}</p>
       </div>
 </Link>）
```

### 3.3.5.tab 栏吸顶回显

暂时无法在飞书文档外展示此内容

- 优化 tab 栏吸顶

关键代码部分

通过监听滚动条的位置，来触发 tab 栏吸顶

```
//导入hook
import { useScroll } from '@/hooks/useScroll'

//使用hook
useScroll(() => {
    if (document.documentElement.scrollTop > 200) {
      TabRef.current!.style.display = 'none'
    } else {
      TabRef.current!.style.display = 'flex'
    }
  })

  //获取ref
  <div className={styles.navbar} ref={TabRef}></div>
```

- **封装节流函数**

  - 节流： 在高频触发回调函数时，节流操作使回调函数在每隔一段时间定期执行一次，时间间隔内再触发，不会重新执行。核心在于让一个函数不要执行的太频繁，减少一些过快的操作

监听 scroll、mousemove 等事件， 使用节流（每隔一秒计算一次位置）

- **封装防抖函数**

  - 在高频触发回调函数时，防抖操作使回调函数在一定时间间隔内，再次触发会清空定时器，并重新计时；计时结束后输出一次结果。核心在于，在短时间内大量触发同一事件时，只会执行一次回调函数。避免把一次事件误认为多次

部分代码

```
// 使用定时器
export function debounce(
  this: any,
  func: () => void,
  time: number,
  immediate = false
) {
  let timer: number | null = null
  return (...args: any) => {
    if (timer) clearInterval(timer)
    if (immediate) {
      if (!timer) func.apply(this, args)
      timer = window.setTimeout(() => {
        timer = null
      }, time)
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args)
      }, time)
    }
  }
}
export function throttle(
  this: any,
  func: () => void,
  time: number,
  immediate = false
) {
  if (immediate) {
    let prevTime = 0
    return (...args: any) => {
      const nowTime = Date.now()
      if (nowTime - prevTime >= time) {
        func.apply(this, args)
        prevTime = nowTime
      }
    }
  } else {
    let timer: number | null = null
    return (...args: any) => {
      if (!timer) {
        func.apply(this, args)
        timer = window.setTimeout(() => {
          if (timer) clearInterval(timer)
          timer = null
        }, time)
      }
    }
  }
}
```

### 3.3.6.右边栏（作者榜，小册广告位）

暂时无法在飞书文档外展示此内容

此部分代码过多，不再一一展示，下面为此部分代码目录

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20dbe6322c684299b9c326a198fad1c6~tplv-k3u1fbpfcp-zoom-1.image)

因为实现下拉回弹，所以我们需要封装 useScroll 对其进行监听

1.  因为不停地和滚动，所以为滚动条 hook 添加节流

在 useEeffect 里添加滚动事件，并通过 return 进行销毁

```
import { useEffect, useState } from 'react'
import { throttle } from '@/utils'

export function useScroll(callback: () => void) {
  useEffect(() => {
    const handleScroll = throttle(() => {
      callback()
    }, 15)
    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', handleScroll)
    }
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
```

```
//导入封装好的节流函数
import { throttle } from '@/utils'

//使用节流函数
const handleScroll = throttle(() => {
    const position = window.pageYOffset
    setChangeDistance(position - scrollPosition)
    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    setIsBottom(isBottom)
  }, 15)
```

### 3.3.7.文章详情页

顶部 layout 布局

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa33dd5b215e456787805a67477f2b10~tplv-k3u1fbpfcp-zoom-1.image)

详情内容 Markdown 渲染

暂时无法在飞书文档外展示此内容

```
const Article: NextPage<IProps> = ({ article, relatedArticles, avatarData }) => {
  const store = useStore().project
  useScroll(() => {
    if (document.documentElement.scrollTop > 200) {
      store.setNeedMove(true)
    } else {
      store.setNeedMove(false)
    }
  })
  // const [md, changeMd] = useState()
  return (
    <div className={styles.article}>
      <div className={styles.content}>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.author}>
          <Author userInfo={article.userInfo} avatarData={avatarData} />
        </div>
        <div>
          <ReactMarkdown
            className={`${styles.markdownContent} ${markdownCss.markdownBody}`}
          >
            {article.content}
          </ReactMarkdown>
        </div>
        <div className={styles.tagListBox}>
          <div className={styles.tagList}>
            分类： <span>{article.acticleTag?.tagName}</span>
          </div>
          <div className={styles.tagList}>
            标签：
            <span className={styles.tag}>{article.acticleTag?.tagName}</span>
          </div>
        </div>
        <Column></Column>
        <Banner></Banner>
      </div>
      <div className={styles.sider}>
        <Author userInfo={article.userInfo} avatarData={avatarData} />
        <RelatedArticles relatedArticles={relatedArticles} />
        <div className={styles.navbar}>
          <div className={styles.navTitle}>目录</div>
          <MarkNav
            source={article.content}
            headingTopOffset={80}
            ordered={false}
          />
        </div>
      </div>
    </div>
  )
}
```

# 四、测试结果

> 建议从功能测试和性能测试两部分分析，其中功能测试补充测试用例，性能测试补充性能分析报告、可优化点等内容。

- 功能测试：

  - 主题切换正常
  - 页面兼容性（适配）正常
  - 前端页面显示（数据渲染， tab 栏切换、回显，侧边栏回弹，文章列表分页，下拉加载更多，点击文章跳转）正常
  - Markdown 展示文章正常
  - 接口设计和 BFF 处理正常
  - 对接接口正常
  -

- 性能测试：

性能分析报告如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/addabc57bf414c228185ba06593111d1~tplv-k3u1fbpfcp-zoom-1.image)

# 五、项目总结与反思

1.  ## **已识别出的优化项**

    - 调用一个接口返回了很多无用的信息，我们采用了 BFF 对接口返回数据进行筛选。
    - 使用其他内置组件，发现主题切换至黑夜模式后，发现组件颜色未改变，通过修改组件内部代码改变组件颜色，来使夜间主题更加完善。
    - 使用服务端渲染，首屏渲染快，SEO 好

<!---->

2.  ## **架构演进的可能性**

    - 对于项目中大多数的页面元素我们都采用了组件的方式来编写，让项目页面能够重构和更新。
    - 对于接口我们采用 BFF 对其进行处理，让接口返回的数据更加可控。
    - 采用 SCSS 来代替原生 CSS，通过 SCSS 变量来解决主题之间的切换。
    - 采用多媒体适配，响应式的兼容多端，实现不同的页面样式渲染。

<!---->

3.  **项目过程中的反思与总结**

    - 通过本次项目让我们发现了自身的一些不足，然后我们针对自身的不足去学习，让我们有了很大的进步。
    - 通过团队的合作，让我们提高了自己的交流和沟通能力，并且通过分工合作让我们项目进展的比较顺利。
    - 通过本次项目也让我们将来面对工作有了初步的应对能力，对于工作中的业务也有了一定的处理能力 **。**

# 七、其他补充资料

开发过程辅助文档：[肝呗队](https://www.wolai.com/aBbJnVLvQRL2TH1f2MVypy)
