import { Trash } from "phosphor-react"

import styles from './TaskCard.module.css'

import { TaskProps } from '../App'

interface TaskCardProps extends TaskProps {
  onRemoveTask: (id: number) => void;
  onChangeTask: (id: number) => void;
}

export function TaskCard({ content, done, id, onChangeTask, onRemoveTask }: TaskCardProps) {
  const checkboxStyle = done ? 
    styles.customCheckboxChecked : styles.customCheckboxUnchecked

  const labelStyle = done ? styles.doneText : styles.defaultText

  function handleChangeTask(id: number) {
    onChangeTask(id)
  }
  
  function handleRemoveTask(id: number) {
    onRemoveTask(id)
  }

  return (
    <div className={styles.taskCardContainer}>
      <div className={checkboxStyle} onClick={() => handleChangeTask(id)} />
      <label className={labelStyle}>{content}</label>
      <Trash onClick={() => handleRemoveTask(id)} />
    </div>
  )
}