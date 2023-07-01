import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const userContext = useContext(CurrentUserContext)
  const isOwner = userContext._id === card.owner._id
  const isLiked = card.likes.some(like => like._id === userContext._id)

  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && 'card__like-button_active'}`
  )

  function handleDeleteClick() {
    onCardDelete(card)
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="card">
      <img className="card__image" onClick={handleClick} src={card.link} alt={card.name} />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-info">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="card__counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwner && <button className="card__delete-button" onClick={handleDeleteClick} type="button"></button>}
    </div>
  )
}