import React, { useEffect, useState } from 'react'
import api from '../code/Api.js';
import auth from '../code/Auth.js';

const Login = () => {
  useEffect(() => {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");
    signupBtn.onclick = (()=>{
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    });
    loginBtn.onclick = (()=>{
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    });
    signupLink.onclick = (()=>{
      signupBtn.click();
      return false;
    });
  });

  var [ username, setUsername ] = useState();
  var [ password, setPassword ] = useState();
  var [ passwordConfirmation, setPasswordConfirmation ] = useState();

  const handleLoginSubmit = (e) => {
    const login = async () => {
      e.preventDefault();

      if (username && password) {
        var tokenResponse = await api.customers.authenticate(username, password);
        var responseBody = await tokenResponse.json();

        if (tokenResponse.ok && responseBody.token) {
          auth.setBearerToken(responseBody.token);
          window.location.href = "/";
        }
      }
    }

    login();
  }

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title login">
            Welcome Back! 
        </div>
        <div className="title signup">
            Welcome!
        </div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
            <input type="radio" name="slide" id="login" defaultChecked />
            <input type="radio" name="slide" id="signup" />
            <label htmlFor="login" className="slide login">Login</label>
            <label htmlFor="signup" className="slide signup">SignUp</label>
            <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
            <form onSubmit={handleLoginSubmit} action="#"className="login">
              <div className="field">
                  <input type="text" placeholder="Username" required
                   value={username} onChange={(event) => { setUsername(event.target.value); }}/>
              </div>
              <div className="field">
                  <input type="password" placeholder="Password" required
                   value={password} onChange={(event) => { setPassword(event.target.value); }}/>
              </div>
              <div className="pass-link">
                  <a href="#">Reset password?</a>
              </div>
              <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                  Don't Have Account? <a href="">Create A New</a>
              </div>
            </form>
            <form action="#" className="signup">
              <div className="field">
                  <input type="text" placeholder="Username" required
                   value={username} onChange={(event) => { setUsername(event.target.value); }}/>
              </div>
              <div className="field">
                  <input type="password" placeholder="Password" required
                   value={password} onChange={(event) => { setPassword(event.target.value); }}/>
              </div>
              <div className="field">
                  <input type="password" placeholder="Confirm Password" required
                   value={passwordConfirmation} onChange={(event) => { setPasswordConfirmation(event.target.value); }}/>
              </div>
              <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="SignUp" />
              </div>
            </form>
        </div>
      </div>
  </div>
  )
}

export default Login
