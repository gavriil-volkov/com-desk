import mongoose from "mongoose";

const GroupSchema = mongoose.Schema({
  name: String,
  city: String,
  avatar: String,
  dateStart: Date,
  dateEnd: Date
})

export default mongoose.model('GroupList', GroupSchema)
