import React, { useContext } from "react";
import addButtonImg from "../images/icons/add-btn_img.svg"
import editButtonImg from "../images/icons/edit-btn.svg"
// import { apiConnect } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  const userContext = useContext(CurrentUserContext)


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrap">
          <img className="profile__avatar" src={userContext.avatar} alt="Аватар" />
          <button className="profile__avatar-button" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-wrap">
            <h1 className="profile__name">{userContext.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}>
              <img className="profile__edit-image" src={editButtonImg}
                alt="Кнопка редактировать" />
            </button>
          </div>
          <p className="profile__description">{userContext.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}>
          <img className="profile__add-image" src={addButtonImg}
            alt="Кнопка добавить" />
        </button>
      </section>
      <section className="gallery">
        {cards.map(card => {
          return <Card card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} />
        })}

      </section>
    </main>
  )
}