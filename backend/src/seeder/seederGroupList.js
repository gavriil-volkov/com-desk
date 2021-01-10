// import dotenv from 'dotenv'
// import GroupList from '../models/groupList.js'
// import mongoose from 'mongoose'

// dotenv.config()
// // mongoose options
// const options = {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   autoIndex: true,
//   poolSize: 10,
//   bufferMaxEntries: 0,
// }
// mongoose.connect(process.env.MONGO_DB,
// 	options, 
// 	(err) => { if (err) return console.log(err)
//     console.log("Mongooseeee is conecting ON Atlas")
//   });

// const groupList = [{
// 	name: "Лисы",
// 	city: 'Москва',
// 	avatar: "https://s.tcdn.co/b7a/1fc/b7a1fcc6-af74-34d0-bfde-69f003ae272c/2.png",
// 	dateStart: '01.10.20',
// 	dateEnd: "25.12.20",
//     },
//     {
// 			name: "Медведи",
// 			city: "SPB",
// 			avatar: "https://www.cheltv.ru/wp-content/uploads/2018/05/Medved2G.jpg",
// 			dateStart: '06.07.20',
// 			dateEnd: "25.09.20",
//     }
// ];

// GroupList.insertMany(groupList).then(() => {
//     mongoose.connection.close();
// });
