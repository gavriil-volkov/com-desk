
// const initState = {
// };

const initialState = () => {
  const initialValue = {
    news: [],
    posts: [],
    groups: {
      _id: '',
      name: '',
      city: '',
      avatar: '',
      dateStart: '',
      dateEnd: ''
    },
    users: [{
      img: '',
      stydyGroup: [],
      social: [],
      workPlace: [],
      post: [],
      firstname: '',
      surname: '',
      email: '',
      password: '',
      tel: '',
      gitHub: '',
      city: '',
      linkidIn: '',
      birthday: ''
    }],
    id: "",
    adminInfo: {},
    userInfo: {
      stydyGroup: [],
      social: [],
      workPlace: [],
      post: [],
      firstname: '',
      surname: '',
      email: '',
      password: '',
      tel: '',
      gitHub: '',
      city: '',
      linkidIn: '',
      birthday: '',
      img: '',
		},
		userPage: {
      stydyGroup: [],
      social: [],
      workPlace: [],
      post: [],
      firstname: '',
      surname: '',
      email: '',
      password: '',
      tel: '',
      gitHub: '',
      city: '',
      linkidIn: '',
      birthday: '',
      img: '',
    },
    elbrusStatus: false,
    adminStatus: false,
    loader: false,
		positions: [],
		positionUser: [],
  }
  return JSON.parse(localStorage.getItem('redux')) || initialValue
}

export default initialState;
