import styles from './index.module.scss'
import { useTheme } from '@/hooks/useTheme'

interface SwitchProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  id?: string
}

export function Switch(props: SwitchProps) {
  return (
    <button
      className={`${styles.switch} ${props.className}`}
      id={props.id ?? ''}
      type="button"
      role="switch"
      {...(props.onClick ? { onClick: props.onClick } : {})}
    >
      <span className={styles.check}>
        <span className={styles.icon}>{props.children}</span>
      </span>
    </button>
  )
}

export function SwitchButton() {
  const [toggle] = useTheme()
  return (
    <Switch onClick={toggle}>
      <div className={styles.sun}>
        <img src="/light.svg" alt="" />
      </div>
      <div className={styles.moon}>
        <img src="/dark.svg" alt="" />
      </div>
    </Switch>
  )
}
