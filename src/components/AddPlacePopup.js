import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../utils/formValidator';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const validation = useFormWithValidation(); 
  // спасибо! обязательно позже валидацию исправлю, пока просто хочу уложиться в дедлайн
  // а вообще- то правильный подход реализации валидации в таком виде?
  // думаю как можно прикрутить валидацию и к авторизации...
  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      namePlace: validation.values['card-name'],
      linkPlace: validation.values['card-link'],
    })
  }

  useEffect(() => {
    validation.resetForm();
  }, [isOpen])

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={isLoading ? 'Добавление...' : 'Добавить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabledButton={!validation.isValid}
    >
      <input
        id="card-name-input"
        className={`popup__input ${!validation.errors['card-name'] || 'popup__input_type_error'}`}
        name="card-name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={validation.values['card-name'] || ''}
        onChange={validation.handleChange}
      />
      <span className={`popup__input-error ${!validation.errors['card-name'] || 'popup__input-error_active'}`}>
        {validation.errors['card-name']}
      </span>
      <input
        id="link-input"
        className={`popup__input ${!validation.errors['card-link'] || 'popup__input_type_error'}`}
        name="card-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={validation.values['card-link'] || ''}
        onChange={validation.handleChange}
      />
      <span className={`popup__input-error ${!validation.errors['card-link'] || 'popup__input-error_active'}`}>
        {validation.errors['card-link']}
      </span>
    </PopupWithForm>
  )
} 