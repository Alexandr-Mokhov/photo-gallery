export default function ImagePopup({ isOpen, onClose, loggedIn }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container popup__container_type_info">
        <button className="popup__close" type="button" onClick={onClose} />
        <div className={`${loggedIn ? 'popup__image_type_ok' : 'popup__image_type_err'}`} />
        <h3 className="popup__title popup__title_type_info">{`${loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h3>
      </div>
    </div>
  )
}

