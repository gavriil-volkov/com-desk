import style from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AddInfoForAdmin } from "../../Redux/actions/notes"
import { useEffect, useState } from 'react';
import AdminPeople from "./AdminPeople"
import AdminGroups from "./AdminGroups"
import { Link } from 'react-router-dom';




const AdminPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0)

  const status = useSelector((state) => state.adminStatus);


  useEffect(() => {
    if (status === false) {
      history.push('/')
    }
    (() => {
      dispatch(AddInfoForAdmin())
    })()
  }, [])

  const store = useSelector((state) => state.adminInfo);
  const allUsers = store.users
  const allGroups = store.groups

  return (
    <div className="blockAdminWrapper">
      {/* <div className="groupBody"> */}

      <div className={style.peopleBlock}>
        <div className={style.headBlock}>
          <h1 className="hYellow"><span className="blueSymbols">{"<"}{" "}</span>Com.Members<span className="blueSymbols">{" "}{"/>"}</span></h1>
        </div>
        {allUsers && allUsers.map((element) => <AdminPeople element={element} setCounter={setCounter} />)}
      </div>
      <div className={style.groupsBlock}>
        <div className={style.headBlock}>
          <div>
            <Link to="/AdminCreateGroup"> <button className="yellowButton" >+ Добавить новую группу</button></Link>
          </div>
        </div>
        {allGroups && allGroups.map((element) => <AdminGroups element={element} />)}
      </div>
    </div>
    // </div>

  );
}

export default AdminPage;
