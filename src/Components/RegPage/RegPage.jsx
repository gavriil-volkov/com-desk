import './index.css';
import { Link } from 'react-router-dom';
import Logo from '../img/cd-logo.svg'
import SignUp from '../SignUp/SignUp';


const RegPage = () => {

  return (
    <div className="wrapper">
      <div className="bgImgSignUp">
        <div className="bgColor">
          <div className="inputMain">
            <div className="logoBlock">
              <img src={Logo} alt="logo" />
            </div>
            <div className="signForm">
              <div>
                <h1 className="hYellow"><span className="blueSymbols">{"<"}</span> Регистрация <span className="blueSymbols">{"/>"}</span></h1>
                <p className="pYellow">
                  Для создания аккаунта заполните все поля.</p>
                <div>
                  <SignUp />
                </div>

              </div>
              <Link className="signButton" to="/SignIn">Войти</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RegPage;
