import { useRef, useState } from 'react'
import './App.css'
import Header from './component/Header'
import TodoEditor from './component/TodoEditor'
import TodoList from './component/TodoList'

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createDate: new Date().getTime(),
  },
]

function App() {
    
  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(3);
  
  /* 데이타 추가 하기*/
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      isDone: false,
      content,
      createDate: new Date().getTime(),
    }
    setTodo([...todo, newItem]);
    idRef.current += 1;
  };

    /* 데이타 수정 하기*/
    const OnUpdate = (targetId) => {
      setTodo(
        todo.map(
          (it) => it.id === targetId ? {...it, isDone: !it.isDone} : it
        )
      )
    };
  
  return (
    <div className="App">
      <Header />
      <TodoEditor  onCreate = {onCreate}  />
      <TodoList todo = {todo} OnUpdate = {OnUpdate} />
    </div>
  )
}

export default App
