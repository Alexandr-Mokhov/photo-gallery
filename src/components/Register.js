

export default function Register() {
	return (
		<form className="form">
			<h2 className="form__title">Регистрация</h2>
			<input className="form__input form__input_type_login" placeholder="Email" type="email"></input>
			<input className="form__input form__input_type_password" placeholder="Пароль" type="password"></input>
			<button className="form__button-submit">Зарегистрироваться</button>
			<h3 className="form__link-login">Уже зарегистрированы? Войти</h3>
		</form>	
	)
}