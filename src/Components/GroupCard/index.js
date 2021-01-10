import React from 'react'
import './index.css';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';


/* #cardMain {
  max-width: 540px;
} */
// id={style.cardMain}

function GroupCard({ groupList }) {
  const userId = useSelector(state => state.id)
  // const date = new Date(el.dateEnd)
  return (
    <>


      <div className="groupListWrap">

        {
          groupList && groupList.map(el => (
            <div key={el._id} className="groupCardWrap">
              <div className="group">
                <div className="groupAvatar">
                  <img src={`${el.avatar}`} className="card-img-group" alt="..." />
                </div>
                <div className="groupInfo">
                  <div>
                  <Link className="purple" to={`/students/${el._id}`}>  <h5 className="groupHeader">{el.name}</h5>
                    <p className="city">{el.city}</p>
                    {/* <p>{el.dateStart}</p> */}
                    <p>{el.dateEnd.slice(0, 4)}</p></Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>


    </>
  )
}

export default GroupCard
