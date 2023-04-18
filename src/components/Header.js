import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

export default function Header({ emailLogin, loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
    setIsOpenedMenu(false);
  }

  function handleOpenedMenu() {
    if (isOpenedMenu) {
      setIsOpenedMenu(false);
    } else {
      setIsOpenedMenu(true);
    }
  }

  return (
    <header className="header">
      <div className={`header__menu${isOpenedMenu && loggedIn ? '_opened' : ''}`}>
        <h2 className="header__menu-email">{loggedIn ? emailLogin : ''}</h2>
        <Routes>
          <Route path="/" element={<Link onClick={onSignOut} to="/sign-in" className={`header__link header__link_type_mobile ${loggedIn ? 'header__link_type_darkened' : ''}`} >Выйти</Link>} />
        </Routes>
      </div>
      <div className="header__container">
        <div className="header__logo" />
        <h2 className={`header__email ${loggedIn ? '' : 'header__email_active'}`}>
          {loggedIn ? emailLogin : ''}
          <Routes>
            <Route path="/" element={<Link onClick={onSignOut} to="/sign-in" className={`header__link ${loggedIn ? 'header__link_type_darkened' : ''}`} >Выйти</Link>} />
            <Route path="/sign-in" element={<Link to="/sign-up" className="header__link" >Регистрация</Link>} />
            <Route path="/sign-up" element={<Link to="/sign-in" className="header__link" >Войти</Link>} />
          </Routes>
        </h2>
        <button className={`header__menu-button${isOpenedMenu ? '_opened' : ''} ${loggedIn ? '' : 'header__menu-button_inactive'}`} onClick={handleOpenedMenu} />
      </div>
    </header>
  );
}
