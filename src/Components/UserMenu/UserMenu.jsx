import './index.css';
import git from '../img/git.svg'
import vk from '../img/vk.svg'
import linkedin from '../img/linkedin.svg'
import tg from '../img/tg.svg'
import inst from '../img/inst.svg'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UserMenu = () => {

  const userInfo = useSelector(state => state.userInfo);

  const { id } = useParams()
  return (
    <div className="userMenu">
      <div className="userButtons">
        <Link to={`/Edit/${id}`}>
          <button id="firstButton" className="purpleButton">РЕДАКТИРОВАТЬ ПРОФИЛЬ</button>
        </Link>
      </div>
      <hr />
      {userInfo[0] && (userInfo[0].tel && <p><strong className="purpleColor">Телефон: </strong>{userInfo[0].tel}</p>)}
      {userInfo[0] && (userInfo[0].email && <p><strong className="purpleColor">Почта: </strong>
        <a className="userMail" href={`mailto:${userInfo[0].email}?subject=Писмо от Com.DESK`} target="_blank">{userInfo[0].email}</a>
      </p>)}
      {userInfo[0] && (userInfo[0].city && <p><strong className="purpleColor">Город: </strong>{userInfo[0].city}</p>)}
      {userInfo[0] && (userInfo[0].work && <p><strong className="purpleColor">Место работы: </strong>{userInfo[0].work}</p>)}

      <br />
      <ul className="iconMenu">


        {userInfo[0] && (userInfo[0].linkidIn && <a target="_blank" href={`https://linkedin.com/in/${userInfo[0].linkidIn}`}><li><img className="social" src={linkedin} alt="linkedin" /></li></a>)}

        {userInfo[0] && (userInfo[0].gitHub && <a target="_blank" href={`https://github.com/${userInfo[0].gitHub}`}><li><img className="social" src={git} alt="git" /></li></a>)}

        {userInfo[0] && (userInfo[0].telegram && <a target="_blank" href={`https://t.me/${userInfo[0].telegram}`}><li><img className="social" src={tg} alt="tg" /></li></a>)}

        {userInfo[0] && (userInfo[0].vk && <a target="_blank" href={`https://vk.com/${userInfo[0].vk}`}><li><img className="social" src={vk} alt="vk" /></li></a>)}

        {userInfo[0] && (userInfo[0].instagram && <a target="_blank" href={`https://www.instagram.com/${userInfo[0].instagram}/?hl=ru/`}><li><img width="30" className="social" src={inst} alt="instagram" /></li></a>)}


      </ul>

      <p><strong className="purpleColor">Группы: </strong></p>
      <div className="userGroupListAvatars"></div>
      <ul>
        {
          (userInfo[0] && userInfo[0].stydyGroup.length) ? userInfo[0].stydyGroup.map((el) => (
            <Link to={`/students/${el._id}`}>
              <li className="animalsLi" key={el._id}>
                <img class="animalsPic" src={`${el.avatar}`} alt="groupimg" />
              </li>
            </Link>
          )) :
            <li>Добавьте группу в которой учились</li>
        }
      </ul>
      <hr />
    </div >
  );
}

export default UserMenu;


