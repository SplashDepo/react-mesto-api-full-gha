/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { apiConnect } from "../utils/Api";
import { apiAuth } from "../utils/Auth";


function App() {

  const navigate = useNavigate()

  const [isEditProfilePopupOpen, openProfilePopup] = useState(false)
  const [isAddPlacePopupOpen, openPlacePopup] = useState(false)
  const [isEditAvatarPopupOpen, openAvatarPopup] = useState(false)

  const [selectedCard, setSelectedCard] = useState({})
  const [imagePopup, openImagePopup] = useState(false);
  const [currentUser, setUserInfo] = useState({})
  const [cards, setCards] = useState([])

  const [logedIn, setLogedIn] = useState(false)
  const [status, setStatus] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [email, setEmail] = useState('')


  useEffect(() => {
    checkToken()
  }, [])

  useEffect(() => {
    if (logedIn) {
      Promise.all([apiConnect.getInitialCards(), apiConnect.getUserData()])
        .then(([initialCards, userData]) => {
          console.log(initialCards)
          setUserInfo(userData)
          setCards(initialCards)
        })
        .catch(err => console.log(`Возникла глобальная ошибка ${err}`))
    }
  }, [logedIn])

  function checkToken() {
    const token = localStorage.getItem('jwt')
    if (token) {
      apiAuth.tokenVerefication(token)
        .then(res => {
          console.log(res)
          setLogedIn(true)
          setEmail(res.email)
          navigate('/main', { replace: true })
        }).catch((err) => {
          console.log(`Ошибка верификации ${err}`)
        })
    }
  }

  function handelLogout() {
    localStorage.removeItem('jwt')
    setLogedIn(false)
  }

  function handelLogin(authorizeData) {
    apiAuth.authorize(authorizeData)
      .then(data => {
        console.log(data._id)
        if (data._id) {
          setEmail(authorizeData.email)
          localStorage.setItem('jwt', data._id)
          setLogedIn(true)
          navigate('/main')
        }
      })
      .catch(err => {
        console.log(`Ошибка авторизации ${err}`)
        setTooltipOpen(true)
        setStatus(false)
      })

  }

  function handelRegister(registerData) {
    apiAuth.register(registerData)
      .then(() => {
        setTooltipOpen(true)
        setStatus(true)
        navigate('/signin')
      })
      .catch((err) => {
        console.log(`Ошибка регистрации ${err}`)
        setTooltipOpen(true)
        setStatus(false)
      })
  }

  function hendelUpdateUser(user) {
    apiConnect.sendUserData(user.name, user.about)
      .then(res => {
        setUserInfo(res)
        closeAllPopups()
      })
      .catch(err => console.log(`Возникла ошибка обновления данных пользователя ${err}`))
  }

  function handelUpdateAvatar(link) {
    apiConnect.sendAvatarData(link)
      .then(res => {
        setUserInfo(res)
        closeAllPopups()
      })
      .catch(err => console.log(`Возникла ошибка обновления аватара пользователя ${err}`))
  }

  function handelAddCard(card) {
    apiConnect.addCard(card.name, card.link)
      .then(card => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(`Возникла ошибка при создании карточки ${err}`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    apiConnect.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(`Возникла ошибка лайка ${err}`))
  }

  function handleCardDelete(card) {
    apiConnect.deleteCard(card._id)
      .then(() => {
        setCards(cardsArr => cardsArr.filter(cardItem => cardItem._id !== card._id))
      })
      .catch(err => console.log(`Возникла ошибка при удалении карточки ${err}`))
  }

  function hendelCardClick(card) {
    openImagePopup(true)
    setSelectedCard({ name: card.name, link: card.link })
  }

  function handleEditAvatarClick() {
    openAvatarPopup(true)
  }

  function handleEditProfileClick() {
    openProfilePopup(true)
  }

  function handleAddPlaceClick() {
    openPlacePopup(true)
  }

  function closeAllPopups(e) {
    openAvatarPopup(false)
    openProfilePopup(false)
    openPlacePopup(false)
    openImagePopup(false)
    setTooltipOpen(false)
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          logedIn={logedIn}
          handelLogout={handelLogout}
        />

        <Routes>
          <Route path='/' element={logedIn ? <Navigate to='/main' replace /> : <Navigate to='/signin' />} />

          <Route path='/signin' element={
            <Login
              handelLogin={handelLogin}
              status={status}
              isOpen={tooltipOpen} />
          } />

          <Route path='/signup' element={
            <Register
              handelRegister={handelRegister}
              status={status}
              isOpen={tooltipOpen} />
          } />

          <Route path='/main' element={
            <ProtectedRoute element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={hendelCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              logedIn={logedIn} />
          } />
        </Routes>

        {logedIn && <Footer />}

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={imagePopup}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={hendelUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handelUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handelAddCard}
        />

        <InfoTooltip
          isOpen={tooltipOpen}
          onClose={closeAllPopups}
          status={status}
        />

        {/* <PopupWithForm name="delete" title="Удалить изображение" buttonText="Да" /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
