import { useState } from 'react';
import style from './index.module.css';
import { useDispatch } from 'react-redux';
import { addNewGroup } from "../../Redux/actions/notes"
import { useHistory } from 'react-router-dom';

const AdminCreateGroup = () => {
  const history = useHistory()
  const dispatch = useDispatch();

  const [newGroup, setNewGroup] = useState({
    name: "",
    city: "",
    avatar: "",
    dateStart: "",
    dateEnd: ""
  })
  function saveGroup(event) {
    event.preventDefault()
    dispatch(addNewGroup(newGroup))
    setTimeout(() => {
      history.push("/AdminPage")
    }, 500);
  }

  function handleChange({ target: { name, value } }) {
    setNewGroup({
      ...newGroup,
      [name]: value
    })
  }

  return (
    <div className={style.groupMain}>
      <form onSubmit={saveGroup} >
        <input type="text" onChange={handleChange} value={newGroup.name} name="name" placeholder="Введине название группы" />
        <input type="text" onChange={handleChange} value={newGroup.city} name="city" placeholder="Введине город" />
        <input type="text" onChange={handleChange} value={newGroup.avatar} name="avatar" placeholder="Введине ссылку на аватар группы" />
        <input type="date" onChange={handleChange} value={newGroup.dateStart} name="dateStart" placeholder="Введине дату начала обучения группы" />
        <input type="date" onChange={handleChange} value={newGroup.dateEnd} name="dateEnd" placeholder="Введине год обучения" />
        <button>Сохранить</button>
      </form>
    </div>
  );
}

export default AdminCreateGroup;
