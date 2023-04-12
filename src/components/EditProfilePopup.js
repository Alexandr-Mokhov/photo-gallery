import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../utils/formValidator';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText, isLoading }) {
  const validation = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    validation.values['input-name'] = currentUser.name;
    validation.values['input-profession'] = currentUser.about;
    validation.setIsValid(true);
    validation.errors['input-name'] = '';
    validation.errors['input-profession'] = '';
  }, [isOpen, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: validation.values['input-name'],
      about: validation.values['input-profession'],
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabledButton={!validation.isValid}
    >
      <input
        id="name-input"
        className={`popup__input ${!validation.errors['input-name'] || 'popup__input_type_error'}`}
        name="input-name"
        type="text"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        value={validation.values['input-name'] || ''}
        onChange={validation.handleChange}
      />
      <span className={`popup__input-error ${!validation.errors['input-name'] || 'popup__input-error_active'}`}>
        {validation.errors['input-name']}
      </span>
      <input
        id="profession-input"
        className={`popup__input ${!validation.errors['input-profession'] || 'popup__input_type_error'}`}
        name="input-profession"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={validation.values['input-profession'] || ''}
        onChange={validation.handleChange}
      />
      <span className={`popup__input-error ${!validation.errors['input-profession'] || 'popup__input-error_active'}`}>
        {validation.errors['input-profession']}
      </span>
    </PopupWithForm>
  )
}