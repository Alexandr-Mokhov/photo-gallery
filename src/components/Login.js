import { useNavigate } from 'react-router';
import FormPage from './FormPage';
// import { useFormWithValidation } from '../utils/formValidator'; // позже доделаю валидацию
import { authorizeUser } from '../utils/auth';

export default function Login({
  isLoading,
  formValue,
  setFormValue,
  setLoggedIn,
  setIsInfoTooltipPopupOpen,
  setEmailLogin,
  setNotificationText
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

    authorizeUser(formValue)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          setFormValue({ email: '', password: '' })
          navigate('/', { replace: true });
          setEmailLogin(formValue.email);
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setLoggedIn(false);
        setNotificationText('Что-то пошло не так! Попробуйте ещё раз.')
        console.log(err + ` : Ошибка введенных данных`);
      })
  }

  return (
    <FormPage
      name="form"
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    // isDisabledButton={!validation.isValid}
    >
      <input
        id="input-email"
        className={`form__input ${/*!validation.errors['input-email'] || */'popup__input_type_error'}`}
        name="email"
        type="email"
        placeholder="E-mail"
        required
        value={formValue.email}
        onChange={handleChange}
        autoComplete="off"
      />
      <span className={`popup__input-error ${/*!validation.errors['input-email'] || */'popup__input-error_active'}`}>
        {/* {validation.errors['input-email']} */}
      </span>
      <input
        id="input-password"
        className={`form__input ${/*!validation.errors['input-password'] || */'popup__input_type_error'}`}
        name="password"
        type="password"
        placeholder="Пароль"
        required
        minLength="4"
        value={formValue.password}
        onChange={handleChange}
        autoComplete="off"
      />
      <span className={`popup__input-error ${/*!validation.errors['input-password'] || */'popup__input-error_active'}`}>
        {/* {validation.errors['input-password']} */}
      </span>
    </FormPage>
  )
}


// export default function Login({ onClose, isLoading }) {
//   const validation = useFormWithValidation();

//   function handleSubmit(evt) {
//     evt.preventDefault();

//   }

//   // useEffect(() => {
//   //   validation.resetForm();
//   // }, [isOpen])

//   return (
//     <PopupWithForm
//       name="form"
//       title="Вход"
//       buttonText="Войти"
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