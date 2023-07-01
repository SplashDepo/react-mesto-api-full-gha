import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext)
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')

  function handelName(event) {
    setUserName(event.target.value)
  }

  function handelDescription(event) {
    setUserDescription(event.target.value)
  }

  function handelSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: userName,
      about: userDescription
    })
  }

  useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
  }, [isOpen])

  return (
    <PopupWithForm name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handelSubmit}>
      <input className="popup__input popup__input_type_name"
        id="input-name"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={userName || ''}
        onChange={handelName}
        required />
      <span className="input-name-error popup__error"></span>
      <input className="popup__input popup__input_type_description"
        id="input-description"
        name="description"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="Описание"
        value={userDescription || ''}
        onChange={handelDescription}
        required />
      <span className="input-description-error popup__error"></span>
    </PopupWithForm>
  )
}