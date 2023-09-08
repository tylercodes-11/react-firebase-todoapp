import React from "react";
import GoogleOutlined from '@ant-design/icons';
import 'firebase/app';

import { auth } from './firebase';
import firebase from 'firebase/app';

const style = {
    bg: `h-screen w-screen p-4 bg-slate-100`
  };
const Login = () => {
    return (
<div id='login-page' className={style.bg}>
    <h2>Welcome to your Todo App</h2>
    <div className="login-button google"
         onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}   
            >
        <GoogleOutlined /> Sign in with Google
    </div>
    </div>
    );
}

export default Login;