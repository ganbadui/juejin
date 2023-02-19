import { NextPage } from 'next'
import styles from './index.module.scss'
export const Banner: NextPage = () => {
  return (
    <div className={styles.extensionBanner}>
      <img
        className={styles.icon}
        src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/3b83cf8314923ebe289898de4a1776fe.svg"
        alt=""
      />
      <div className={styles.wrapper}>
        <div>安装掘金浏览器插件</div>
        <div style={{ color: '#8a919f' }}>
          多内容聚合浏览、多引擎快捷搜索、多工具便捷提效、多模式随心畅享，你想要的，这里都有！
        </div>
      </div>
      <div className={styles.btn}>前往安装</div>
    </div>
  )
}
