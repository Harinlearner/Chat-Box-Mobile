import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './login.css'
function login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate1 = useNavigate();

    const submitted = (e) => {
        e.preventDefault();
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const day = date + "-" + month + "-" + year;
        axios.post('https://chatbox-backend-k4rp.onrender.com/user/login', { username, password, day }) // use same name in the back and front end or else the data will be undefined
            .then((res) => {
                let userNameLogin = res.data[0].username;
                let userData = {
                    userNameLogin,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate1("/main");
            })
            .catch((err) => { window.alert("Enter the Correct username/password") });
    }
    return (
        <div className="loginpage">
            <div>
                <center>
                    <div className='loginContainer'>
                        <form onSubmit={submitted}>
                            <h1>Login To Chat</h1>
                            <br></br>
                            <b><label className='label'>Username : </label></b>
                            <input className='input' type='text' onChange={(e) => setUserName(e.target.value)}></input>
                            <br></br>
                            <br></br>
                            <b><label className='label'>Password : </label></b>
                            <input className='input' type='password' onChange={(e) => setPassword(e.target.value)}></input>
                            <br></br>
                            <br></br>
                            <input className='login' type="submit" value='login'></input>
                            <br></br>
                            <br></br>
                            <label>{`Don't have account`}</label>
                            <a onClick={() => { navigate1("/register"); }}> Register</a>
                        </form>
                    </div>
                </center>
            </div>
        </div>
    )
}

export default login;
