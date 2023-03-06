import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'

import { TaskHeader } from './components/TaskHeader'
import { TaskCard } from './components/TaskCard'
import { TaskEmpty } from './components/TaskEmpty'

import styles from './App.module.css'

import './global.css'

export interface TaskProps {
  id: number;
  content: string;
  done: boolean;
}

export function App() {
  const [taskContent, setTaskContent] = useState('')
  const [tasks, setTasks] = useState<TaskProps[]>([])

  function handleNewTaskContentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setTaskContent(event.target.value)
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    const id = new Date().getTime()
    setTasks(state => 
      [...state, { id, content: taskContent, done: false }]
    )
    setTaskContent('')
  }


  function onChangeTask(taskId: number) {
    const updatedTasks = tasks
    const taskIndex = updatedTasks.findIndex(task => task.id === taskId)

    updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done

    setTasks([...updatedTasks])
  }
  
  function onRemoveTask(id: number) {
    setTasks(state => state.filter(item => item.id !== id))
  }

  const isNewTaskContentEmpty = taskContent.length === 0
  
  const tasksCount = tasks.length
  const tasksIsEmpty = tasks.length === 0

  const totalTasksDone = tasks.reduce(
    (acc, curr) => acc + (curr.done ? 1 : 0), 0
  );

  const doneTasksTitle = tasksCount === 0 ? 
    0 : `${totalTasksDone} de ${tasksCount}`

  return (
    <div className={styles.container}>
      <TaskHeader />
      <form 
        className={styles.taskForm} 
        onSubmit={handleCreateNewTask}
      >
        <input 
          type="text" 
          required
          name="task"
          placeholder='Adicione uma nova tarefa'
          value={taskContent}
          onChange={handleNewTaskContentChange}
          onInvalid={handleNewTaskInvalid}
        />
        <button type="submit" disabled={isNewTaskContentEmpty}>
          Criar <PlusCircle size={16} />
        </button>
      </form>
      <main className={styles.taskContainer}>
        <header>
          <section>
            <strong>Tarefas criadas</strong>
            <div className={styles.taskCount}>
              <strong>{tasksCount}</strong>
            </div>
          </section>

          <section>
            <strong>Concluídas</strong>
            <div className={styles.taskCount}>
              <strong>{doneTasksTitle}</strong>
            </div>
          </section>
        </header>
        {tasksIsEmpty && <TaskEmpty />}
        {!tasksIsEmpty && 
          tasks.map(task => 
            <TaskCard 
              key={task.id} 
              id={task.id}
              content={task.content} 
              done={task.done}
              onChangeTask={onChangeTask}
              onRemoveTask={onRemoveTask}
            />
          )        
        }
      </main>
    </div>
  )
}
