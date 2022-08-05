import 'dotenv/config'
import mongoose from "mongoose";


export const mongoStartup = async () => {
  const conn = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}/${process.env.MONGO_DB}`;
  // const conn = process.env.MONGO_URI || 'mongodb://root:example@mongo/userdb';  
  mongoose.connect(conn)
    .then(()=>console.log("db connected!"))
    .catch((err) => {
      console.log("DB error: ", err);
      setTimeout(mongoStartup, 5000); // not best practice but tries to restart if error
    })
}
