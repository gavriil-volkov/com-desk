import style from './index.module.css';
import { useDispatch } from 'react-redux';
import { deleteGroup } from "../../Redux/actions/notes"
import { Link } from 'react-router-dom';

const AdminGroups = ({ element }) => {
  const dispatch = useDispatch();

  function deleteCurentGroup(id) {

    dispatch(deleteGroup(id))

  }
  
  return (
    <div className={style.groupMain}>
      <div className={style.groupsNames}>
        <div>
          <img width="100" height="100" src={element.avatar} alt="" />
        </div>
        <div className={style.groupsFirstColumn}>
          <p>{element.city}</p>
          <p>{element.name}</p>
        </div>
        <div>
          <p>Год: {element.dateStart.slice(0, 4) && element.dateStart.slice(0, 4)}</p>
          {/* <p>End: {element.dateEnd && element.dateEnd}</p> */}
        </div>
      </div>
      <div className={style.buttonBlock}>
        <Link to={`/AdminEditGroup/${element._id}`}><button className="purpleButton">Редактировать группу</button></Link>
        <button className="yellowButton" type="button" onClick={() => { deleteCurentGroup(element._id) }}>Удалить</button>
      </div>
    </div>
  );
}

export default AdminGroups;
