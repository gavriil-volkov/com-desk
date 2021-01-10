import dotenv from 'dotenv'
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import path from 'path'

import GroupList from './src/models/groupList.js'
import PostList from './src/models/postList.js'
import User from './src/models/user.module.js'
// import NewPost from './src/models/postList'


//Для парсинга новостей
import axios from "axios"
import cheerio from "cheerio"

// Импорт маршрутов.
// import newpostRouter from './src/routes/newpost.js';
import signinRouter from './src/routes/signin.js';
import signupRouter from './src/routes/signup.js';
import passports from './src/routes/passport.js';


import fileUpload from 'express-fileupload';


dotenv.config()

const app = express();

// app.use(express.static('public')); //to access the files in public folder
// app.use(cors()); // it enables all cors requests
app.use(fileUpload());

const PORT = process.env.PORT ?? 0

// mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
}
mongoose.connect(process.env.MONGO_DB,
  options,
  (err) => {
    if (err) return console.log(err)
    console.log("Mongooseeee is conecting ON Atlas")
  });
const MongoStore = mongoStore(session);

const host =
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));




// Подключение middleware, который парсит JSON от клиента
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.env.PWD, 'public')));
// app.use('/*', express.static(path.join(process.env.PWD, '/')));


// Подключение middleware, который парсит СТРОКУ или МАССИВ от клиента
app.use(express.urlencoded({ extended: true }))

app.use(session({
  name: app.get('session cookie name'),
  secret: '9ps58uy9aerfah48yuaergv45he8gjae',
  // Если true, сохраняет сессию, даже если она не поменялась
  resave: false,
  // Если false, куки появляются только при установке req.session
  saveUninitialized: false,
  cookie: {
    // В продакшне нужно "secure: true" для HTTPS
    secure: false, httpOnly: true, key: 'registration',
  },
  store: new MongoStore({ mongooseConnection: mongoose.createConnection(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }) }),
}));


app.use(passport.initialize());
app.use(passport.session());
passports(passport);


// Подключение middleware, который проверяет аунтифицирован пользователь на данной ручке или нет
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.sendStatus(401)
  }
}

// Подключение middleware, который не позволяет аунтифицированному пользователю переходить на страницу(ручку) регистрации и входа в систему
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(401).json(req.user._id)
  }
  else next()
}

// Подключаем импортированные маршруты с определенным url префиксом.
// app.use('/newpost', newpostRouter)
app.use('/user', checkAuth, signinRouter);
app.use('/user', checkAuth, signupRouter);

app.get('/auth/github',
  passport.authenticate('github', {
    scope: ['user:email']
  }));

app.get('/auth/github/callback',
  passport.authenticate('github'), function (req, res) {
    res.redirect(`/Home/${req.user.id}`)
  });

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

app.get('/auth/google/callback',
  passport.authenticate('google'), function (req, res) {
    // res.json({id: req.user.id})
    res.redirect(`/Home/${req.user.id}`)
  });

app.delete('/logout', function (req, res) {
  req.logout();
  res.sendStatus(200);
});




// Загрузка файлов на бэк
app.post('/upload', (req, res) => {

  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files.file;
  //  mv() method places the file inside public directory
  myFile.mv(`${process.env.PWD}/public/${myFile.name}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });
})

// Загрузка фото юзера
app.post('/userPicAdd/:id', async (req, res) => {
  const userId = req.params.id;
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  const myFile = req.files.file;
  let user = await User.findById(userId);
  user.img = myFile.name;
  await user.save()
  myFile.mv(`${process.env.PWD}/public/userPic/${myFile.name}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
    }
    return res.send({ name: myFile.name, path: `/userPic/${myFile.name}` });
  });
})

app.get("/deleteUserPic/:id", async (req, res) => {
  const userId = req.params.id
  let user = await User.findById(userId);
  user.img = "";
  await user.save()
  res.sendStatus(200);
})


app.get('/groupslist', checkAuthentication, async (req, res) => {
  const groupList = await GroupList.find()
  return res.json(groupList)
})


app.get('/postlist/:id', async (req, res) => {
  const id = req.params.id
  const postList = await PostList.find({ authorID: id })
  return res.json(postList)
})

app.post('/newpost/:id', async (req, res) => {
  const id = req.params.id;
  const { title, text, img } = req.body;
  const addNewPost = new PostList({
    title: title,
    text: text,
    img: img,
    authorID: id,
  })
  await addNewPost.save()
  const sessionUser = req.user.id;
  let user = await User.findById(sessionUser);
  user.post.push(addNewPost._id)
  await user.save()
  res.json(addNewPost._id)
}
);

//Удаление постов
app.get("/deletePost/:id", async (req, res) => {
  const id = req.params.id
  await PostList.findByIdAndDelete(id)
  const user = await User.findOne({ post: id })
  user.post = user.post.filter((el) => el.toString() !== id)
  await user.save()
  res.sendStatus(200)
})



app.get("/parthNews", async (req, res) => {
  const response = await axios('https://3dnews.ru/news');
  const result = response.data;
  //cheerio
  const $ = cheerio.load(result);
  const header = [];
  const news = [];
  $('a.entry-header > h1').each((i, element) => {
    const title = $(element).text();
    header.push(title);
  });
  $('div.cntPrevWrapper > p').each((i, element) => {
    const newsBody = $(element).text();
    news.push(newsBody);
  });

  // const allData = header.map((element, i) => [element, news[i]]);

  const allData = []
  header.map((element, i) => {
    if (element && news[i]) {
      if (!element.split().toString().match(/.*3DNews.*/)
        &&
        !news[i].split().toString().match(/.*3DNews.*/)) {
        allData.push([element, news[i]])
      }
    }
  });
  const newAllDada = allData.slice(0, 15);
  res.json(newAllDada)
})

// const allData = []
//   header.map((element, i) => {
//     if (!element.split(" ").includes(["3DNews"])) {
//       allData.push([element, news[i]])
//     }
//   });
//   const newAllDada = allData.slice(0, 15);
//   res.json(newAllDada)
//получаем данные для профиля

// Поменял на /homee, потому что redirect на 128 строке попадает сразу на 170 и выдает json на фронте
app.get('/Homee/:id', checkAuthentication, async (req, res) => {

  // app.get('/Homee/:id', async (req, res) => {

  let idUser = req.params.id
  if (idUser) {
    const infoUser = await User.find({ _id: idUser }).populate('stydyGroup')
    return res.status(200).json(infoUser)
  }
  return res.sendStatus(406)
})


app.post('/Edit/:id', async (req, res) => {
  let idUserEdit = req.params.id
  let userOne = await User.findById({ _id: `${idUserEdit}` })
  let { firstname,
    surname,
    tel,
    city,
    telegram,
    gitHub,
    linkidIn,
    instagram,
    email,
    work,
    vk, selectIdGroup, selectIdDelete } = req.body


  if (
    firstname ||
    surname ||
    email ||
    work ||
    tel ||
    city ||
    telegram ||
    gitHub ||
    linkidIn ||
    instagram ||
    vk ||
    selectIdGroup || selectIdDelete) {

    if (firstname) {
      await User.findByIdAndUpdate(idUserEdit, { firstname: firstname }, function (err, firstname) {
        res.status(200)
      })
    }
    if (surname) {
      await User.findByIdAndUpdate(idUserEdit, { surname: surname }, function (err, surname) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { surname: "" }, function (err, surname) {
        res.status(200)
      })
    }
    if (tel) {
      await User.findByIdAndUpdate(idUserEdit, { tel: tel }, function (err, tel) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { tel: "" }, function (err, tel) {
        res.status(200)
      })
    }
    if (city) {
      await User.findByIdAndUpdate(idUserEdit, { city: city }, function (err, city) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { city: "" }, function (err, city) {
        res.status(200)
      })
    }
    if (telegram) {
      await User.findByIdAndUpdate(idUserEdit, { telegram: telegram }, function (err, telegram) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { telegram: "" }, function (err, telegram) {
        res.status(200)
      })
    }
    if (linkidIn) {
      await User.findByIdAndUpdate(idUserEdit, { linkidIn: linkidIn }, function (err, linkidIn) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { linkidIn: "" }, function (err, linkidIn) {
        res.status(200)
      })
    }
    if (instagram) {
      await User.findByIdAndUpdate(idUserEdit, { instagram: instagram }, function (err, instagram) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { instagram: "" }, function (err, instagram) {
        res.status(200)
      })
    }
    if (vk) {
      await User.findByIdAndUpdate(idUserEdit, { vk: vk }, function (err, vk) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { vk: "" }, function (err, vk) {
        res.status(200)
      })
    }

    if (gitHub) {
      await User.findByIdAndUpdate(idUserEdit, { gitHub: gitHub }, function (err, gitHub) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { gitHub: "" }, function (err, gitHub) {
        res.status(200)
      })
    }
    if (email) {
      await User.findByIdAndUpdate(idUserEdit, { email: email }, function (err, email) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { email: "" }, function (err, gitHub) {
        res.status(200)
      })
    }
    if (work) {
      await User.findByIdAndUpdate(idUserEdit, { work: work }, function (err, work) {
        res.status(200)
      })
    } else {
      await User.findByIdAndUpdate(idUserEdit, { work: "" }, function (err, work) {
        res.status(200)
      })
    }
    if (selectIdGroup) {
      selectIdGroup.map(el => {
        if (!userOne.stydyGroup.includes(el.value)) {
          userOne.stydyGroup.push(el.value)
        }
      })
      await User.findByIdAndUpdate(idUserEdit, { stydyGroup: userOne.stydyGroup })

    }
    if (selectIdDelete) {
      selectIdDelete.forEach(async (element) => {
        userOne.stydyGroup = userOne.stydyGroup.filter((el) => el.toString() !== element.value)
      })
      await User.findByIdAndUpdate(idUserEdit, { stydyGroup: userOne.stydyGroup })
    }
    return res.sendStatus(200)

  }
  return res.sendStatus(406)
})

app.get('/students_list_in_group/:id', async (req, res) => {
  let idGroup = req.params.id
  if (idGroup) {
    const listOfPeopleInGroup = await User.find({ stydyGroup: idGroup }).populate('stydyGroup')
    return res.status(200).json(listOfPeopleInGroup)
  }
  return res.sendStatus(406)
})

app.get('/user_page/:id', async (req, res) => {
  let idUserPage = req.params.id
  if (idUserPage) {
    const infoUserPage = await User.find({ _id: idUserPage }).populate('stydyGroup')
    return res.json(infoUserPage)
  }
  return res.sendStatus(406)
})



//запрос данных для администратора
app.get("/AddInfoForAdmin", checkAuthentication, async (req, res) => {
  const allUsers = await User.find()
  const allGroups = await GroupList.find()
  const dataForAdmin = { admin: req.user.admin, users: allUsers, groups: allGroups }
  res.json(dataForAdmin)
})

//Удаление пользователя
app.get("/deleteUser/:id", async (req, res) => {
  const id = req.params.id
  await User.findByIdAndDelete(id)
  res.sendStatus(200)
})

//Удаление группы
app.get("/deleteGroup/:id", async (req, res) => {
  const id = req.params.id
  await GroupList.findByIdAndDelete(id)
  res.sendStatus(200)
})

//Добавление новой группы

app.post("/addNewGroup", async (req, res) => {
  const { name, city, avatar, dateStart, dateEnd } = req.body
  if (name.trim()) {
    const addGroup = new GroupList({
      name,
      city,
      avatar,
      dateStart,
      dateEnd,
    })
    await addGroup.save()
    return res.sendStatus(200)
  }
  return res.sendStatus(406)
})

//Редактирование группы
//Поиск:
app.get("/editGroup/:id", async (req, res) => {
  const id = req.params.id
  const EditDataGroup = await GroupList.findById(id)
  res.json(EditDataGroup)
})
//Сохранение:

app.post("/editGroup", async (req, res) => {
  const { name, city, avatar, dateStart, dateEnd } = req.body.newGroup
  if (name.trim()) {
    let curentGroup = await GroupList.findById(req.body.id)
    curentGroup.name = name
    curentGroup.city = city
    curentGroup.avatar = avatar
    curentGroup.dateStart = dateStart
    curentGroup.dateEnd = dateEnd
    await curentGroup.save()
    return res.sendStatus(200)
  }
  return res.sendStatus(406)
})

app.get("/loadAllCoordinatse", async (req, res) => {
  const users = await User.find()
  const usersWithPosition = users.filter((element) => element.position) //add lat
  const curentUsers = usersWithPosition.map((element) => ({ img: element.img, userId: element._id, firstname: element.firstname, surname: element.surname, lat: element.position.lat, lon: element.position.lon }))
  res.json(curentUsers)
})

app.post("/YanPage", async (req, res) => {
  const { latitude, longitude, userId } = req.body
  if (latitude && longitude && userId) {
    const temp = await User.findOne({ _id: userId })
    await User.findByIdAndUpdate(userId, {
      position: { lat: latitude, lon: longitude }
    })
    const users = await User.findOne({ _id: userId })
    const curentUsers = {
      img: users.img, userId: users._id, firstname: users.firstname, surname: users.surname, lat: users.position.lat, lon: users.position.lon
    }
    return res.json(curentUsers)
  }
  return res.sendStatus(406)
})


//root необходимо опустить в самый конец файла чтоб не было конфликтов 
const root = path.join(process.env.PWD, '../', 'build');
app.use(express.static(root));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});



app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT)
})

