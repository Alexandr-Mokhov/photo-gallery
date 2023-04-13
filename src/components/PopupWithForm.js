import { Link } from 'react-router-dom';

export default function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, isLoading, isDisabledButton, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${name === 'form' ? 'form' : 'popup'}`}>
        <button className={`popup__close ${name === 'form' ? 'popup__close_type_inactive' : ''}`} type="button" onClick={onClose} />
        <form className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} name={name} noValidate>
          <h3 className={`popup__title popup__title_type_${name === 'form' ? 'form' : 'popup'}`}>{title}</h3>
          {children}
          <button
            className={`popup__save popup__save_type_${name === 'form' ? 'form' : ''} popup__save_type_${isLoading || isDisabledButton ? 'inactive' : 'active'}`}
            type="submit" disabled={isLoading || isDisabledButton}
          >
            {buttonText}
          </button>
          {title === 'Регистрация' ? <Link className="form__link-login" to="/sign-in" >Уже зарегистрированы? Войти</Link> : ''}
        </form>
      </div>
    </div>
  )
}

