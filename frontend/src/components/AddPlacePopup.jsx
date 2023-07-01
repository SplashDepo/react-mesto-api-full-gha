import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const cardName = useRef()
  const cardLink = useRef()

  useEffect(() => {
    cardLink.current.value = ''
    cardName.current.value = ''
  }, [isOpen])

  function handelSubmit(e) {
    e.preventDefault()

    onAddPlace({ name: cardName.current.value, link: cardLink.current.value })
  }
  return (
    <PopupWithForm name="card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handelSubmit}>
      <input className="popup__input popup__input_type_name"
        id="input-title"
        name="title"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        ref={cardName}
        required />
      <span className="input-title-error popup__error"></span>
      <input className="popup__input popup__input_type_description"
        id="input-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        ref={cardLink}
        required />
      <span className="input-link-error popup__error"></span>
    </PopupWithForm>
  )
}