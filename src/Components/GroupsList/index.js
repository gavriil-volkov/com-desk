import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadGroupsFromBack} from '../../Redux/actions/notes'
import { useHistory } from 'react-router-dom';

import GroupCard from '../GroupCard'
import Loader from '../Loader';

function GroupsList() {
  const status = useSelector(store => store.elbrusStatus)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    if (status === false) {
      history.push('/')
    }
    (() => {
      dispatch(LoadGroupsFromBack())
    })()
  }, [])


  const groupList = useSelector(state => state.groups)

  return (
    <>
    <div className="blockWrapper">
        <div className="groupBody">

          <div className="groupHeader">

            <h1><span className="yellowSymbols">//</span> COM.MEMBERS <span className="yellowSymbols">//</span></h1>
          </div>
          <Loader />
          
      { groupList.length && <GroupCard groupList={groupList} />}
      </div></div>
    </>
  )

}

export default GroupsList
