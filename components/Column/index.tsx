import { NextPage } from 'next'
import styles from './index.module.scss'
export const Column: NextPage = () => {
  return (
    <div className={styles.columnContainer}>
      <div className={styles.header}>文章被收录于专栏：</div>
      <div className={styles.content}>
        <img
          src="data:image/jpg;base64,UklGRjYCAABXRUJQVlA4ICoCAADQEQCdASp4AFoAPpFInEolpKKhp1i5SLASCWUG+OUBvg9kdAAe9PtztgJm0eGGnR78WFmAg6CbYVZdcC484gQEml4iGMF+Q6dzaaf+YlmNq7c12C1Nt7aDWbetRuAS2KrSjQtadDzJtyexig2Wjm5sXut0bS5Xlq9DbUacw88ea/Y7/JmzNfKkfuWrStkoe1QLzcc9zmUAAP6C5pA//kp/7d/7yuPf/i34g/YFz5lF1QpmkkQ38V5XLgdIaEcRO1KLHI6uVeSet7vlTyQIowJismrY3Vonex6/smQ+Sj9h9GthVZlKAwt8Uwq1wS0ogs0OFutkNrVUh43/c+XZ3DMsZNLkf64nILwK/Pj5WbKdhlIzhsj2JG2YRhM0PjW+tKfAVZ9s1AkiFGhOK6oBaMJYfD14ZIiim1OFxbcPOsOw72IVHQgLefkJ3Bc/5WMQEGixduoNBdhNu9VjICFwhpQhbgGRCEdpEWJZ5u0DYvRMCcX7oN/javf4H/KzzJi8Tw3E+FTVFJcsnN0uWdkuXLeQXtoINStIOjgSkD2FUnUqJQfFYZK0C5ojEo9TKIOtga7F/7p5ExeR1VjydcDxi30IBCt5rmM3CiCFIMVMCrGUakHZLgDeIo9xp8ptJG/ZTCIfHg0CvQcli3FaIKvcHUIS41/X8JSW5Fdkfc9KcCcuf3lxInLcNAUnlA839fG3F4Dkazjh8O1MZUYOr62e2Q8Qw4HcDfxtEXAAAA=="
          alt=""
        />
        <div className={styles.content}>
          <div>字节跳动青训营</div>
          <div style={{ color: '#8a919f' }}>技术干货分享~</div>
        </div>
        <div className={styles.btn}>关注专栏</div>
      </div>
    </div>
  )
}
