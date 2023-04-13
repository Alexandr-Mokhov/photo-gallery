import { useFormWithValidation } from "../utils/formValidator";


export default function AuthorizationPage({ name, titleText, buttonText, loggedIn, onSubmit, onLogin, handleSubmit }) {
	const validation = useFormWithValidation();

	function handleSubmit(evt) {
		evt.preventDefault();

		onLogin({

		})
	}

	return (
		<form className={`form form_type_${name}`} onSubmit={onSubmit} noValidate>
			<h2 className="form__title">{titleText}</h2>
			<input
				className="form__input form__input_type_login"
				name="input-login"
				placeholder="Email"
				type="email"
				required
				value={validation.values['input-login'] || ''}
				onChange={validation.handleChange}
			/>
			<span className={`popup__input-error ${!validation.errors['input-login'] || 'popup__input-error_active'}`}>
        {validation.errors['input-login']}
			</span>
			<input className="form__input form__input_type_password"
				name="input-password"
				placeholder="Пароль"
				type="password"
				minLength="4"
				required
				value={validation.values['input-password'] || ''}
				onChange={validation.handleChange}
			/>
			<span className={`popup__input-error ${!validation.errors['input-password'] || 'popup__input-error_active'}`}>
        {validation.errors['input-password']}
			</span>
			<button className="form__button-submit">{buttonText}</button>
			<h3 className="form__link-login">{`${name === 'login' ? '' : 'Уже зарегистрированы? Войти'}`}</h3>
		</form>
	)
}