import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

export default function Header({ emailLogin, loggedIn, setLoggedIn, setHeaderButtonText }) {
  const navigate = useNavigate();

  function handleClickOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }

  return (
    <header className="header">
      <div className="header__logo" />
      <h2 className="header__email">
        {loggedIn ? emailLogin : ''}
        <Routes>
          <Route path="/" element={<Link onClick={handleClickOut} to="/sign-in" className={`header__link ${loggedIn ? 'header__link_type_darkened' : ''}`} >Выйти</Link>} />
          <Route path="/sign-in" element={<Link to="/sign-up" className="header__link" >Регистрация</Link>} />
          <Route path="/sign-up" element={<Link to="/sign-in" className="header__link" >Войти</Link>} />
        </Routes>
      </h2>
    </header>
  );
}
