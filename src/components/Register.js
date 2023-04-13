import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../utils/formValidator';

export default function Register({ onClose, onAddPlace, isLoading }) {
  const validation = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      namePlace: validation.values['register-form-name'],
      linkPlace: validation.values['register-form-link'],
    })
  }

  // useEffect(() => {
  //   validation.resetForm();
  // }, [isOpen])

  return (
    <PopupWithForm
      name="form"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabledButton={!validation.isValid}
    >
      <input
        id="input-email"
        className={`form__input ${!validation.errors['input-email'] || 'popup__input_type_error'}`}
        name="input-email"
        type="email"
        placeholder="Email"
        required
        value={validation.values['input-email'] || ''}
        onChange={validation.handleChange}
      />
      <span className={`popup__input-error ${!validation.errors['input-email'] || 'popup__input-error_active'}`}>
        {validation.errors['input-email']}
      </span>
      <input
        id="input-password"
        className={`form__input ${!validation.errors['input-password'] || 'popup__input_type_error'}`}
        name="input-password"
        type="password"
        placeholder="Пароль"
        required
        minLength="4"
        value={validation.values['input-password'] || ''}
        onChange={validation.handleChange}
      />
      <span className={`popup__input-error ${!validation.errors['input-password'] || 'popup__input-error_active'}`}>
        {validation.errors['input-password']}
      </span>
    </PopupWithForm>
  )
} 