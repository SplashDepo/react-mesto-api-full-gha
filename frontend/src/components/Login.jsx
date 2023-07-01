import React, { useState } from "react";


export default function Login({ handelLogin, status, isOpen }) {

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handelChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    handelLogin(formValues)
    setFormValues({
      email: '',
      password: ''
    })
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handelSubmit}>
        <input className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email || ''}
          onChange={handelChange} />
        <input className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password || ''}
          onChange={handelChange} />
        <button className="auth__button">Войти</button>
      </form>
    </div>
  )
}