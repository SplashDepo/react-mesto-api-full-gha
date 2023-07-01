import React from "react";
import logo from "../images/icons/logo.svg";
import { Link } from "react-router-dom";

export default function Header({ logedIn, email, handelLogout }) {
  const currentPath = window.location.pathname
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <div className="header__navigation">
        {logedIn ?
          (<div className="header__member">
            <p className="header__email">{email}</p>
            <Link to='/signin' className="header__link" onClick={handelLogout}>Выйти</Link>
          </div>
          ) : currentPath === "/signin" ?

            (<> <Link to='/signup' className="header__link">Регистрация</Link> </>)
            :
            (<> <Link to='/signin' className="header__link">Вход</Link> </>)
        }
      </div>
    </header >
  )
}