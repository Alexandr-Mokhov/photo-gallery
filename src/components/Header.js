import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ emailLogin, loggedIn, setLoggedIn, headerButtonText, setHeaderButtonText}) {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  function handleClick() {

    if (loggedIn) {           // нормально ли в таком виде реализация
      setLoggedIn(false);
      localStorage.removeItem('token');
      setHeaderButtonText('Регистрация');
      navigate('/sign-in', { replace: true });
      setIsRegistered(true);
    } else {
      if (isRegistered) {
        navigate('/sign-up', { replace: true });
        setHeaderButtonText('Войти');
        setIsRegistered(false);
      } else {
        navigate('/sign-in', { replace: true });
        setHeaderButtonText('Регистрация');
        setIsRegistered(true);
      }
    }
  }

  return (
    <header className="header">
      <div className="header__logo" />
      <h2 className="header__email">
        {loggedIn ? emailLogin : ''}
        <button
          className={`header__button ${loggedIn ? 'header__button_type_darkened' : ''}`}
          onClick={handleClick}
        >
          {headerButtonText}
        </button>
      </h2>
    </header>
  );
}

