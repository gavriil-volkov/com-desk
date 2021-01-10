import style from './index.module.css';
import { useDispatch } from 'react-redux';
import { deleteUser } from "../../Redux/actions/notes";


const AdminPeople = ({ element, setCounter }) => {
  const dispatch = useDispatch();

  function deletePeople(id) {
    dispatch(deleteUser(id))
    setCounter((prev) => prev++)

  }

  return (
    <div className={style.people}>
      <div className={style.peopleNames}>
        <p>{element.firstname} {element.surname && element.surname}</p>
      </div>
      <button className="yellowButton" type="button" onClick={() => { deletePeople(element._id) }}>Удалить профайл</button>
    </div>
  );
}

export default AdminPeople;
