import rocketLogo from '../assets/rocket.svg';

import styles from './TaskHeader.module.css'

export function TaskHeader() {
  return (
    <header className={styles.container}>
      <img src={rocketLogo} alt="Logotipo do ToDo List" />
      <span>to<span>do</span></span>
    </header>
  )
}