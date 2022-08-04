import 'dotenv/config'
import mongoose from "mongoose";


export const mongoStartup = async () => {
  const conn = process.env.MONGO_URI || 'mongodb://root:example@mongo/userdb';  
  mongoose.connect(conn)
    .then(()=>console.log("db connected!"))
    .catch((err) => console.log("DB error: ", err))
}
