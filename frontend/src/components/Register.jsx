import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handelRegister }) {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
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
    handelRegister(formValues)
    setFormValues({
      email: '',
      password: '',
    })
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handelSubmit}>
        <input className="auth__input"
          onChange={handelChange}
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email || ''} />
        <input className="auth__input"
          onChange={handelChange}
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password || ''} />
        <button className="auth__button" >Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link className="auth__link" to='/signin'>Войти</Link></p>
    </div>
  )
}