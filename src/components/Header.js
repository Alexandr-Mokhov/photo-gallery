import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo" />
      <Link className="header__button-login" to="/sign-in" >Войти</Link>
    </header>
  );
}
  
