
import { useState } from 'react';
import './style.css'

function App(){
  const [tasks,setTasks]=useState([]);
  function handleNewTasks(task){
    setTasks((s)=>[...s,task])
  }
  function toggleTaskComplete(index){
    setTasks(tasks.map((task,i)=>i===index?{...task,completed:!task.completed}:task))
  }
  function deleteItems(index){
    setTasks(tasks.filter((task,i)=>i!=index))

  }

  return <div className='todo-app'>
    <h1>Todo</h1>
    <AddTasks onNewTasks={handleNewTasks}/>
    <DisplayTasks tasks={tasks} toggleTaskComplete={toggleTaskComplete} onDeleteItem={deleteItems}/>
  </div>
}

function AddTasks({onNewTasks}){
  const [newTask,setNewTask]=useState('');
  function handleSubmit(e){
    e.preventDefault();
    if(!newTask)return;
    const task=newTask;
    const newTaskObj={
      task,
      completed:false
    }
    onNewTasks(newTaskObj);
    setNewTask('');

  }
  return <form className='input-area' onSubmit={handleSubmit}>
    <input className='input-field' type='text' placeholder='add tasks..' value={newTask} onChange={(e)=>setNewTask(e.target.value)}></input>
    <button className='add-button' >Add</button>
  </form>
}
function DisplayTasks({tasks,toggleTaskComplete,onDeleteItem}){
  return <ul className='task-list'>
    {tasks.map((t,i)=><Tasks task={t} toggleTaskComplete={toggleTaskComplete} onDeleteItem={onDeleteItem} index={i} key={i}/>)}
  </ul>

}
function Tasks({task,toggleTaskComplete,index,onDeleteItem}){
  
  return <li className={'task-item'}>
    <input className='task-checkbox' type='checkbox' onChange={()=>toggleTaskComplete(index)} />
    <label className={`task-text ${task.completed?'completed':''}`}>{task.task}</label>
    <button className='delete-button' onClick={()=>onDeleteItem(index)}>X</button>
  </li>

}

export default App
