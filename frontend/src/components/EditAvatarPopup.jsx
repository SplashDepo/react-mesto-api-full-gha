import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef()
  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])
  function hendelSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({ avatar: avatarRef.current.value })
  }
  return (
    <PopupWithForm name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={hendelSubmit}>
      <input className="popup__input popup__input_type_link"
        id="input-avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required />
      <span className="input-avatar-error popup__error"></span>
    </PopupWithForm>
  )
}