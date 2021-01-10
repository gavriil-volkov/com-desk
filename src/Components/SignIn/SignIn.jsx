import './index.css';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { LoadStatusElbrus, LoadStatusAdmin } from '../../Redux/actions/notes'


const SignIn = () => {

  const dispatch = useDispatch()

  const history = useHistory();
  useEffect(() => {
    (async () => {
      let response = await fetch("http://localhost:3000/user/signin", {
        method: 'GET',
        credentials: 'include'
      })
      const result = await response.json()
      if (response.status === 401) {
        history.push(`/Home/${result}`)
      }
    })()
  }, [])

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('')
  // const [yes, setYes] = useState(false)

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include'
    });
    if (response.status === 200) {
      const result = await response.json()
      if (result.admin !== true) {
        dispatch(LoadStatusElbrus(true))
        history.push(`/Home/${result.id}`)
      } else {
        dispatch(LoadStatusAdmin(true))
        history.push(`/Home/${result.id}`)
      }
    } else {
      setError('!! Неправильный логин или пароль !!')
    }
  }

  function handlerChange({ target: { name, value } }) {
    setInputs({
      ...inputs, [name]: value,
    })
  }

  const { email, password } = inputs;

  return (
    <>

      <form onSubmit={handlerSubmit}>
        <div className="mb-3">
          {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
          <input onChange={handlerChange} type="email" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail*" required />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
          <input onChange={handlerChange} type="password" name="password" id="exampleInputPassword1" placeholder="Пароль*" required />
        </div>
        <div className="req"><span>*</span>Поля обязательные для заполнения</div>
        <div className="error">{error}</div>
        <div className="submBut">
          <button type="submit" className="yellowPulseButton">Войти</button>
        </div>
      </form>
      <div className="reqBLue">Ещё не зарегистрированы?</div>




    </>

  );
}

export default SignIn;





// {/* <form onSubmit={handlerSubmit}>
// <div className="mb-3">
//   {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
//   <input onChange={handlerChange} type="email" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail*" />
// </div>
// <div className="mb-3">
//   {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
//   <input onChange={handlerChange} type="password" name="password" id="exampleInputPassword1" placeholder="Пароль*" />
// </div>
// <div className="req"><span>*</span>Поля обязательные для заполнения</div>
// <div>{error}</div>
// <div className="submBut">
//   <button type="submit" className="yellowButton">Войти</button>
// </div>
// </form>
// <div className="reqBLue">Ещё не зарегистрированы?</div>  */}
