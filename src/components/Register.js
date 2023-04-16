import { useNavigate } from 'react-router';
import FormPage from './FormPage';
// import { useFormWithValidation } from '../utils/formValidator'; // позже доделаю валидацию
import { registerUser } from '../utils/auth';

export default function Register({
  isLoading,
  formValue,
  setFormValue,
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

    registerUser(formValue)
      .then((res) => {
        if (res.data) {
          setNotificationText('Вы успешно зарегистрировались!');
          navigate('/sign-in', { replace: true });
          setFormValue({ email: '', password: '' });
          setEmailLogin('');
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        setNotificationText('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err + ` : Ошибка введенных данных`);
      })
      .finally(() => setIsInfoTooltipPopupOpen(true))
  }

  return (
    <FormPage
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
        placeholder="E-mail"
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
    </FormPage>
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