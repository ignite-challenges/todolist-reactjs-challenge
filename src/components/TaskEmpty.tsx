import clipboardText from '../assets/clipboard.svg';

import styles from './TaskEmpty.module.css'

export function TaskEmpty() {
  return (
    <div className={styles.container}>
      <img src={clipboardText} alt="Icone do clipboard" />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}