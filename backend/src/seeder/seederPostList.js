// import dotenv from 'dotenv'
// import PostList from '../models/postList.js'
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

// const postList = [{
// 	title: "NEOM will bring the future to life",
// 	text: 'NEOM will provide a ubiquitous cognitive environment where humans and machines will live in harmony, as peers, to continually reinvent themselves through the application of advanced and future technologies. Our future will be shaped by exciting technologies that will blur the gap between man and machine; artificially intelligent software, internet of things that can sense human needs, seamless transfer between physical and virtual worlds and everyday robots that create more time to live.',
// 	img: "https://www.techmarkblog.com/wp-content/uploads/2020/09/homepage-tech.jpg"
// 		},
// 		{
// 			title: "LUX POWERS INNOVATION",
// 			text: 'We power innovation because we are innovators. Luxers are passionate about deep tech – our team is made up of engineers, scientists, and data scientists dedicated to working with clients in their quest to discover and deliver their next big innovative ideas.',
// 			img: "https://images.unsplash.com/photo-1608131167772-c72708a6d971?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
// 				}
// ];

// PostList.insertMany(postList).then(() => {
//     mongoose.connection.close();
// });
