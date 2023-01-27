import React, { useState, useContext } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import { UserContext } from '../components/Context/UserContext.jsx'
import "./styles/Auth.css"

const initInputs = { username: "", password: "" }

export default function Auth(){
  const { signup, login, errMsg, resetAuthErr} = useContext(UserContext)
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(true)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
    console.log(inputs)
  }

  function handleSignup(e){
    e.preventDefault()
    console.log(inputs)
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm() {
    setToggle(prev => !prev)
    resetAuthErr()
  }
  
  return (
    <div className="auth-container">
      <h1>Welcome!</h1>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Already a member?</p>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Not a member?</p>
        </>
      }
    </div>
  )
}