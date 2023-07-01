import React from "react";
import closeButtonImg from "../images/icons/close-icon.svg"

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen ? 'popup_active' : ''} `}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={props.onClose}>
          <img className="popup__close-icon" src={closeButtonImg}
            alt="Кнопка закрыть" />
        </button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div>
  )
}