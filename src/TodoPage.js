import React, {useState, useEffect} from "react";
import { Navigate } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai';
import Todo from './Todo';
import {db} from './firebase'
import { UserAuth } from "./context/AuthContext";
import {query,collection, where, getDoc, setDoc, onSnapshot, updateDoc, doc, addDoc, deleteDoc, QuerySnapshot} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`, 
  logout: `bg-white cursor-pointer text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow im`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl mt-5 p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex rounded-md justify-between`,
  input: `border rounded-md p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-gradient-to-r from-purple-500 to-[#f5457f] rounded-md text-slate-100`,
  count: `text-center p-2`,
  profile: `h-auto max-w-sm rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-black/30 flex mt-5 ml-10`,
}
function TodoPage() {
  const {logOut, user} = UserAuth();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [userdata, setuserdata] = useState(null);


  //signout handle
const handleSignOut = async () => {
    try {
        await logOut();
    } catch (err) {
        console.log(err)
        console.log(user);
}
};


const createTodo = async (e) => {


  const  uid = await user.uid;

  e.preventDefault(); // prevent reload
  if(input === '') {
    alert('Please enter a todo item into the input field')
    return;
  }
   await addDoc(collection(db,'userData', uid, 'todos'),{
    text:input,
    completed: false,
  });
  setInput('');
}; 

//read todo in firebase

useEffect( () => {
    const getData = async () => {
        
        const  uid = await user.uid; //from context of user object
    console.log(uid);
    
        const q = await query(collection(db,'userData', uid, 'todos'));
        const  unsubscribe =   onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
              todosArr.push({...doc.data(), id: doc.id})
            });
            setTodos(todosArr)
          });
          return () => unsubscribe();
    }
       getData();

    
   return () => {
    if(user.id===!null) return
       
   }
    
    }, [user.uid]);


//update todo in firebase
const toggleComplete = async (todo) => {
    const  uid =  user.uid;

  await updateDoc(doc(db,'userData', uid, 'todos', todo.id), {
    completed: !todo.completed
  });

};
////////////////////////////////

//delete todo in firebase
const deleteTodo = async (id) => {
    const  uid =  user.uid;

  await deleteDoc(doc(db, 'userData', uid, 'todos', id))
}


////////////////////////////////
  return (

    <div className={style.bg}>
        {/* make logout out nav bar */}
        {/*  */}
        {/*  */}
      
           <img onClick={handleSignOut} className={style.profile} src={user.photoURL} alt="profile-pic"></img> 
        

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
            <Todo 
            key={index} 
            todo={todo} 
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo} />
          ))}

          </ul>
          {todos.length < 1 ? null :  <p className={style.count}> You have {todos.length} todos</p> }
        
          
      </div>
      
    </div>
  );
}

export default TodoPage;
