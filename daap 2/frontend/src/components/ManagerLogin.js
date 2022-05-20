import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ManagerLogin = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [pasword, setPasword] = useState('');

  const loginManager = async (e) => {
    e.preventDefault();

    const res = await fetch('/managersignin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        pasword
      })
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
      console.log("Invalid credentials");
    }
    else {
      window.alert("Login sucess");
      console.log("Login sucess");
      navigate('/');
    }
  }

  return (
    <>
      <div class="container">
        <div class="screen">
          <div class="screen__content">
            <form class="login">
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input type="text" class="login__input" placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input type="password" class="login__input" placeholder="Password"
                  value={pasword}
                  onChange={(e) => setPasword(e.target.value)} />
              </div>
              <button class="button login__submit" onClick={loginManager} >
                <span class="button__text">Log In Now</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>




      <button className="btn"><a href='/'>Back</a></button>

    </>
  )
}

export default ManagerLogin