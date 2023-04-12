import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../utils/formValidator'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText, isLoading }) {
  const validation = useFormWithValidation();

  useEffect(() => {
    validation.resetForm();
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: validation.values['avatar-link'],
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabledButton={!validation.isValid}
    >
      <input
        id="link-avatar-input"
        className={`popup__input ${!validation.errors['avatar-link'] || 'popup__input_type_error'}`}
        name="avatar-link"
        type="url"
        placeholder="Ссылка на аватар"
        required
        value={validation.values['avatar-link'] || ''}
        onChange={validation.handleChange}
      />
      <span className={`popup__input-error ${!validation.errors['avatar-link'] || 'popup__input-error_active'}`}>
        {validation.errors['avatar-link']}
      </span>
    </PopupWithForm>
  )
}