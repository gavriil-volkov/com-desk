import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DeleteUserID, saveUsersPositions, LoadUserInfoPage, LoadUsersInGroup, ShowAllPostsReducer, LoadStatusElbrus, LoadGroups, LoadStatusAdmin, LoadUserInfo, saveUserPos } from '../../Redux/actions/notes';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  useEffect(() => {
    (async () => {
      let response = await fetch("http://localhost:3000/logout", {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.status === 200) {
        dispatch(LoadUserInfo(''))
        dispatch(DeleteUserID(''))
        dispatch(LoadGroups([]))
        dispatch(LoadStatusElbrus(false))
        dispatch(LoadStatusAdmin(false))
        dispatch(saveUserPos([]))
        dispatch(saveUsersPositions([]))
        dispatch(ShowAllPostsReducer([]))
        dispatch(LoadUsersInGroup([]))
        dispatch(LoadUserInfoPage({}))



        localStorage.removeItem('redux')
        history.push('/TechNews')
        history.push('/')
      }
    })()
  }, [])
  return (
    <></>
  )
}

export default Logout;
