import './Login.css';
import { useState, useEffect } from 'react'
import { auth, googleProvider } from "../config/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import LoginPic from '../assets/HeroPrinny.png';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  const navigate = useNavigate();
  const[loginEmail,setLoginEmail] = useState("");
  const[loginPassword,setLoginPassword] = useState("");
  const[registerEmail,setRegisterEmail] = useState("");
  const[registerPassword,setRegisterPassword] = useState("");
  const[toggleRegister,setToggleRegister] = useState(false);
  const[errorMessage,setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // tickbox to show/hide password
    
  const [loggedIn,setLoggedIn] = useState(null);

  useEffect(() => { // checks whether any user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
        setLoggedIn(true)
        console.log("user " + currentUser.email + "logged in");
        navigate("/home"); // Redirect to homepage if user is already logged in;
      }
      else{
        setLoggedIn(false)
        console.log("logged out");
      }
    });
    return() => unsubscribe();
  }, [])



  const register = async () => { // create account
    if (registerPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
    return;
    }
    try{
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      navigate("/home"); // Redirect to homepage after successful register
    }catch(err){
      console.error(err);
      if(err.message == "Firebase: Error (auth/email-already-in-use)."){
        setErrorMessage("Email already in use!")
      }
      else{
        setErrorMessage("Invalid Email or Password!");
      }
    }
  }

  const login = async () => { // for user login
    try{
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/home"); // Redirect to homepage after successful login
    }
    catch(err){
      console.error(err);
      setErrorMessage("Invalid Email or Password!");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='auth-div'>
      <div className='form-div'>
        {toggleRegister ? <h1>Create an Account</h1> : <h1>Welcome back!</h1>}
      <div className='form-flex'>
          <form className='auth-form'>
            {!toggleRegister && <div className='login-form'>
              <label htmlFor='login-name'>EMAIL OR USERNAME <span className='required' style={{color:'red'}}>*</span></label>
              <br/>
              <input 
                type='text'
                id='login-name'
                className='textbox'
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
              <br/>
              <br/>
              <label htmlFor='login-password'>PASSWORD <span className='required' style={{color:'red'}}>*</span></label>
              <br/>
              <input 
                type={showPassword ? 'text' : 'password'}
                id='login-password'
                className='textbox'
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
              <div className='show-password'>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={handleShowPassword}
                  id="password-toggle"
                />
                <label htmlFor="password-toggle" className="noselect"> Show Password?</label>
              </div>
              <br/>
              {errorMessage && <div className={`"LoginError"${errorMessage ? "show" : ""}`} style={{color: 'red'}}>{errorMessage}</div>}
              {!errorMessage && <br/>}
              <br/>
              <button className='login-btn' onClick={login}><span>Log In</span></button>
              <br/>
              <br/>
              <span style={{color: '#9A9FA2'}} className='register-toggle'>Need an account?</span>{'\u00A0'}{'\u00A0'}<span className='register-toggle' style={{color: '#0F9AD5'}} onClick={() => {setToggleRegister(true); setShowPassword(false); setErrorMessage("")}}>Register</span>
            </div>}
            {toggleRegister && <div className='register-form'>
              <label htmlFor='register-email'>EMAIL <span className='required' style={{color:'red'}}>*</span></label>
              <input
                type="email"
                id='register-email'
                className='textbox'
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
              />
              <br/>
              <br/>
              <label htmlFor='password'
                id='password'
                class>PASSWORD <span className='required' style={{color:'red'}}>*</span></label>
              <input
                type={showPassword ? "text" : "password"}
                id="register-password"
                className='textbox'
                onChange={(e)=>{
                  setRegisterPassword(e.target.value);
                }}
              />
              <div className='show-password'>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={handleShowPassword}
                  id="password-toggle"
                />
                <label htmlFor="password-toggle" className="noselect"> Show Password?</label>
              </div>
              <br />
              {errorMessage && <div className={`"LoginError"${errorMessage ? "show" : ""}`} style={{color: 'red'}}>{errorMessage}</div>}
              {!errorMessage && <br/>}
              <br/>
              <button className='login-btn' onClick={register}><span>Create an account</span></button>
              <br/>
              <br/>
              <span style={{color: '#9A9FA2'}} className='register-toggle'>Already have an account?</span>
              {'\u00A0'}
              {'\u00A0'}
              <span className='register-toggle' style={{color: '#0F9AD5'}} onClick={() => {setToggleRegister(false); setShowPassword(false); setErrorMessage("")}}>Log in</span>
            </div>}
          </form>
          <img src={LoginPic} className='LoginPic'/>
        </div>
      </div>
    </div>
  )
}

export default Auth
