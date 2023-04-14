import { useNavigate } from "react-router-dom";

export default function Header({ emailLogin, loggedIn, setEmailLogin }) {
  const navigate = useNavigate();

  function handleButtonClick() {
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
    setEmailLogin('');
  }

  return (
    <header className="header">
      <div className="header__logo" />
      <h2 className="header__email">
        {emailLogin}
        <button
          className={`header__button ${loggedIn ? 'header__button_type_darkened' : ''}`}
          onClick={handleButtonClick}
        >
          {loggedIn ? 'Выйти' : 'Войти'}
        </button>
      </h2>
    </header>
  );
}


{/* <h2 className="header__email">
{emailLogin}
<Link
  className={`header__button-login ${loggedIn ? 'header__button-login_type_darkened' : ''}`}
  to="/sign-in"
>
  {loggedIn ? 'Выйти' : 'Войти'}
</Link>
</h2> */}

