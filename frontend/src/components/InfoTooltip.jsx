import React from "react";
import success from "../images/auth-image/auth-sucsses.svg"
import error from "../images/auth-image/auth-error.svg"
import closeButtonImg from "../images/icons/close-icon.svg"

export default function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popup ${isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container popup__container_type_register">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img className="popup__close-icon" src={closeButtonImg} alt="Кнопка закрыть" />
        </button>
        <img className="popup__result-icon" src={status ? success : error} alt="" />
        <p className="popup__text">
          {
            status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
          }
        </p>
      </div>
    </div>
  )
}