import './index.css';
import UserMenu from "../UserMenu/UserMenu";
import Post from "../Post/Post"
import Wall from "../Wall/Wall"

import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddUserID, AddUserInfo, LoadStatusElbrus } from '../../Redux/actions/notes';
import { hide, show } from '../../Redux/actions/loader';
import Loader from '../Loader';

const HomePage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const history = useHistory();

  useEffect(() => {
    (async () => {
      dispatch(show())
      setTimeout(async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}/Homee/${params.id}`)
        if (response.status === 200) {
          dispatch(LoadStatusElbrus(true))
          dispatch(AddUserID(params.id))
          dispatch(AddUserInfo(params.id))
          dispatch(hide())
        } else {
          history.push('/')
        }
      }, 500);
    })()
  }, [])

  const foto = 'https://pl4324260.e-naturessunshine.com/images/img-profile.png'
  const userInfo = useSelector(state => state.userInfo)

  return (
    <div className="userMainBlock">
      { userInfo[0] ?
        <div className="userWrap">
          <div className="leftColumn">
            {<div style={(userInfo[0].img && { background: `url(/userPic/${userInfo[0].img})` }) ? { background: `url(/userPic/${userInfo[0].img})` } : { background: `url(${foto})` }} className="userAvatar" />}
            <div className="userName">
              {
                userInfo.length &&
                <h1><span className="yellowSymbols">{'//'}{' '}</span>{userInfo[0].firstname}<br/>{userInfo[0].surname}<span className="yellowSymbols">{' '}{'//'}</span></h1>
              }
            </div>
            <div className="userMenuBlock"><UserMenu /></div>
          </div>
          <div className="rightColumn">
            <div className="newPostBlock"><Post /></div>
            <div className="wallBlock"><Wall /></div>
          </div>
        </div> : <Loader />
      }
    </div>
  );
}

export default HomePage;
