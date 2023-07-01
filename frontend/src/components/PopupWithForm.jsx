import React from "react";
import closeButtonImg from "../images/icons/close-icon.svg"


export default function PopupWithForm(props) {

  return (
    <div className={props.isOpen ? "popup popup_active" : `popup popup_type_${props.name}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose}>
          <img className="popup__close-icon" src={closeButtonImg} alt="Кнопка закрыть" />
        </button>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__submit-button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
} 
