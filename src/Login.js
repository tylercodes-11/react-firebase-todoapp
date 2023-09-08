import {React, useEffect } from "react";
import GoogleOutlined from '@ant-design/icons';
import { UserAuth} from "./context/AuthContext";
import {useNavigate} from 'react-router-dom';

const style = {
    bg: `h-screen w-screen p-4 bg-slate-100`
  };

const Login = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (user != null) {
            navigate('/todos');
        }
    },[user])

    return (
<div  className={style.bg}>
    <h2>Welcome to the Todo App</h2>
    <div className="ma-w-[240px] m-auto py-4">
        
            
        <GoogleOutlined onClick={handleGoogleSignIn}/> Sign in with Google
    </div>
    </div>
    );
}

export default Login;