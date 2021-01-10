import './index.css';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {

  const history = useHistory();

  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:3000/user/signup", {
        method: 'GET',
        credentials: 'include'
      })
      if (res.status === 401) {
        history.push('/Home')
      }
    })()
  }, [])

  const [inputs, setInputs] = useState({
    firstname: '',
    surname: '',
    email: '',
    password: '',
    tel: ''
  });

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname,
        surname,
        email,
        password,
        tel
      }),
      credentials: 'include'
    });

    if (response.status === 200) {

      history.push('/user/signin')
    }
    //  else {
    //   history.push('/user/signin')
    // }
  }


  function handlerChange({ target: { name, value } }) {
    setInputs({
      ...inputs, [name]: value,
    })
  }

  const { firstname, surname, email, password, tel } = inputs;

  return (
    <div className="blockMain">
      <form onSubmit={handlerSubmit} className="mainFormBlock">

        <input onChange={handlerChange} name="firstname" value={firstname} type="text" aria-describedby="firstnameHelp" placeholder="Имя*" required />

        <input onChange={handlerChange} name="surname" value={surname} type="text" aria-describedby="emailHelp" placeholder="Фамилия*" required />

        <input onChange={handlerChange} type="email" name="email" value={email} aria-describedby="emailHelp" placeholder="E-mail*" required />

        <input onChange={handlerChange} name="tel" value={tel} type="tel" id="tel" aria-describedby="emailHelp" placeholder="Телефон*" required />

        <input onChange={handlerChange} name="password" value={password} type="password" placeholder="Пароль*" required />

        <div className="req"><span>*</span>Поля обязательные для заполнения</div>
        <div className="submBut">
          <button type="submit" className="yellowPulseButton">Зарегистрироваться</button>
        </div>
        <div className="reqBLue">Уже есть аккаунт?</div>
      </form>
    </div>

  );
}

export default SignUp;
