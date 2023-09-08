import React, {useState, useEffect} from "react";
import {AiOutlinePlus} from 'react-icons/ai';
import Todo from './Todo';
import {db} from './firebase'
import {query,collection, onSnapshot, updateDoc, doc, addDoc} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`, 
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex rounded-md justify-between`,
  input: `border rounded-md p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-gradient-to-r from-purple-500 to-[#f5457f] rounded-md text-slate-100`,
  count: `text-center p-2`,
}
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  console.log();
//create todo

const createTodo = async (e) => {
  e.preventDefault(); // prevent reload
  if(input === '') {
    alert('Please enter a todo item into the input field')
    return;
  }
  await addDoc(collection(db, 'todos'), {
    text:input,
    completed: false,
  })
  setInput('');
}; 

//read todo in firebase
useEffect(() => {
  const q = query(collection(db,'todos'))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = []
    querySnapshot.forEach((doc) => {
      todosArr.push({...doc.data(), id: doc.id})
    });
    setTodos(todosArr)
  });
  return () => unsubscribe();
}, []);


//update todo in firebase
const toggleComplete = async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id), {
    completed: !todo.completed
  })

}
////////////////////////////////

//delete todo in firebase



////////////////////////////////
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className={style.input} 
          type="text" 
          placeholder='Add Todo' />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
          </form>
        
          <ul>
          {todos.map((todo, index)=> (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} />
          ))}

          </ul>
          <p className={style.count}> You have {todos.length} todos</p>
          
      </div>
      
    </div>
  );
}

export default App;
