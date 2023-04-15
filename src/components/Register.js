import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import PopupWithForm from './PopupWithForm';
// import { useFormWithValidation } from '../utils/formValidator';
import { register } from '../utils/auth';

export default function Register({
  isLoading,
  formValue,
  setFormValue,
  setIsInfoTooltipPopupOpen,
  setLoggedIn
}) {
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    register(formValue)
      .then((res) => {
        if (res.data) {
          setLoggedIn(true);
          navigate('/sign-in', { replace: true });
          setIsInfoTooltipPopupOpen(true);
        } else {
          return Promise.reject(`Ops, ошибочка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setIsInfoTooltipPopupOpen(true);
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
      onSubmit={handleSubmit}
      isLoading={isLoading}
    // isDisabledButton={!validation.isValid}
    >
      <input
        id="input-email"
        className={`form__input ${/*!validation.errors['input-email'] || */'popup__input_type_error'}`}
        name="email"
        type="email"
        placeholder="Email"
        required
        value={formValue.email}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${/*!validation.errors['input-email'] ||*/ 'popup__input-error_active'}`}>
        {/* {validation.errors['input-email']} */}
      </span>
      <input
        id="input-password"
        className={`form__input ${/*!validation.errors['input-password'] ||*/ 'popup__input_type_error'}`}
        name="password"
        type="password"
        placeholder="Пароль"
        required
        minLength="4"
        value={formValue.password}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${/*!validation.errors['input-password'] || */'popup__input-error_active'}`}>
        {/* {validation.errors['input-password']} */}
      </span>
    </PopupWithForm>
  )
}



// export default function Register({ onClose, onAddPlace, isLoading }) {
//   const [formValue, setFormValue] = useState({
//     email: '',
//     password: '',
//   });

//   const validation = useFormWithValidation();

//   function handleChange(evt) {
//     const {name, value} = evt.target;

//     setFormValue({
//       ...formValue,
//       [name]: value
//     })
//   }
// console.log(validation);
//   function handleSubmit(evt) {
//     evt.preventDefault();

//     // onAddPlace({
//     //   namePlace: validation.values['register-form-name'],
//     //   linkPlace: validation.values['register-form-link'],
//     // })
//   }

//   // useEffect(() => {
//   //   validation.resetForm();
//   // }, [isOpen])

//   return (
//     <PopupWithForm
//       name="form"
//       title="Регистрация"
//       buttonText="Зарегистрироваться"
//       onClose={onClose}
//       onSubmit={handleSubmit}
//       isLoading={isLoading}
//       isDisabledButton={!validation.isValid}
//     >
//       <input
//         id="input-email"
//         className={`form__input ${!validation.errors['input-email'] || 'popup__input_type_error'}`}
//         name="input-email"
//         type="email"
//         placeholder="Email"
//         required
//         value={validation.values['input-email'] || ''}
//         onChange={validation.handleChange}
//       />
//       <span className={`popup__input-error ${!validation.errors['input-email'] || 'popup__input-error_active'}`}>
//         {validation.errors['input-email']}
//       </span>
//       <input
//         id="input-password"
//         className={`form__input ${!validation.errors['input-password'] || 'popup__input_type_error'}`}
//         name="input-password"
//         type="password"
//         placeholder="Пароль"
//         required
//         minLength="4"
//         value={validation.values['input-password'] || ''}
//         onChange={validation.handleChange}
//       />
//       <span className={`popup__input-error ${!validation.errors['input-password'] || 'popup__input-error_active'}`}>
//         {validation.errors['input-password']}
//       </span>
//     </PopupWithForm>
//   )
// } 