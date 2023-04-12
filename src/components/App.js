import { useEffect, useState } from 'react';
import { react } from '@babel/types';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './Register';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, cardData: {} });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '', cohort: '' });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  useEffect(() => {
    if (!isEditProfilePopupOpen && 
      !isAddPlacePopupOpen && 
      !isEditAvatarPopupOpen && 
      !selectedCard.isOpen && 
      !isDeleteCardPopupOpen) {
      return
    }

    function handleClickOverlay(evt) {
      if (evt.target.className.indexOf('popup_opened') > 1) {
        closeAllPopups();
      }
    };

    function handleClickEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('mousedown', handleClickOverlay);
    document.addEventListener('keydown', handleClickEsc);

    return () => {
      document.removeEventListener('keydown', handleClickEsc);
      document.removeEventListener('mousedown', handleClickOverlay);
    };
  }, [closeAllPopups]);

  useEffect(() => {
    api.getUserInfo()
      .then(userData => setCurrentUser(userData))
      .catch(err => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, cardData: card });
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setSelectedCard({ isOpen: false, cardData: card });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setIsLoading(false);
    setIsDeleteCardPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(itemLike => itemLike._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((arrayItem) => arrayItem._id === card._id ? newCard : arrayItem));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteUserCard(selectedCard.cardData._id)
      .then(() => {
        setCards((state) => state.filter(arrayItem => arrayItem._id !== selectedCard.cardData._id));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfo(userData.name, userData.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.setUserAvatar(userData.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    api.getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch(err => console.log(err));
  }, []);

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api.addNewCard(cardData.namePlace, cardData.linkPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Register />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={isLoading ? 'Добавление...' : 'Добавить'}
          isLoading={isLoading}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          buttonText={isLoading ? 'Удаление...' : 'Да'}
          isLoading={isLoading}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup
          name="image"
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
          cardName={selectedCard.cardData.name}
          cardLink={selectedCard.cardData.link}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

