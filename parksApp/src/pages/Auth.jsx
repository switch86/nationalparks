import React, { useState, useContext } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import { UserContext } from '../components/Context/UserContext.jsx'
import "../components/styles/Auth.css"

const initInputs = { username: "", password: "" }

export default function Auth(){
  const { signup, login} = useContext(UserContext)
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

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

  return (
    <div className="auth-container">
      <h1>Register</h1>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
          />
          <p onClick={() => setToggle(prev => !prev)}>Already a member?</p>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
          />
          <p onClick={() => setToggle(prev => !prev)}>Not a member?</p>
        </>
      }
    </div>
  )
}