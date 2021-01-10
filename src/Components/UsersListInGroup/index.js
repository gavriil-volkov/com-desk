import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadUsersFromBack } from '../../Redux/actions/notes';
import { Link } from "react-router-dom";
import Loader from '../Loader';
import './index.css';


function UsersListInGroup() {

  const { id } = useParams();

  const dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(LoadUsersFromBack(id))
    })()
  }, [])



  const groupInfo = useSelector(state => state.groups)

  let groupInfoOne = groupInfo.filter(el => (el._id === id))

  const peopleList = useSelector(state => state.users)

  return (
    <>

      <div className="blockWrapper">
        <div className="groupBody">
          <div className="groupHeader">
            <h1><span className="yellowSymbols">{"//"}{" "}
            </span>COM.MEMBERS<span className="yellowSymbols">{" "}{"//"}</span></h1>
          </div>
          <div className="groupHeader">
            {groupInfoOne[0] && (<h2>{groupInfoOne[0].name && groupInfoOne[0].name}
              <span className="yellowSymbols"> ?</span> {groupInfoOne[0].dateEnd.slice(0, 4)} <span className="yellowSymbols">: </span>{groupInfoOne[0].city}</h2>)}
          </div><Loader />
          <div className="groupListWrap">

            {
              peopleList.length ? peopleList.map(el => (
                <div ey={el._id} className="groupCardWrap">
                  <div className="group">
                    <div className="groupAvatar">
                      {el.img && <div style={{ background: `url(/userPic/${el.img})` }} className="user-card-img" />
                      }
                    </div>
                    <div className="groupInfo">
                      <div>
                        <Link to={`/student/${el._id}`}><h5 className="userHeader">{el.firstname + ` ` + el.surname}</h5></Link>
                      </div>
                    </div>
                  </div>
                </div>
              )) : <div></div>
            }
          </div></div>
      </div>
    </>
  )
}

export default UsersListInGroup

