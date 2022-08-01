require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb');


const url = `mongodb://admin:pass@127.0.0.1:27017/`;
const getAll = (res) => {
  MongoClient.connect(url, async function(err,client){
    if(err) throw err;
    const db = client.db(process.env.DB_NAME);
    let results = await db.collection(process.env.DB_COLLECTION).find({}).toArray();
    client.close();
    res.json({"data":results});
  })
}

const getOne = (id, res) => {
  MongoClient.connect(url, function(err,client){
    if(err) throw err;
    const db = client.db(process.env.DB_NAME);
    const obj_id = new ObjectId(id);
    const query = { _id: obj_id };
    db.collection(process.env.DB_COLLECTION).findOne(query,function(err,result){
      if(err) throw err;
      client.close();
      res.json({"data":[result]});
    })
  });
}

const createOne = (user,res) => {
  MongoClient.connect(url, function(err,client){
    if(err) throw err;
    const db = client.db(process.env.DB_NAME);
    db.collection(process.env.DB_COLLECTION).insertOne(user,function(err,result){
      if(err) throw "error there";
      let id = null;
      if(result.acknowledged){
        id = result.insertedId.toString();
      }
      client.close();
      res.json({"data":id});

    });
  });
}

const updateOne = (id,user,res) => {
  MongoClient.connect(url, async function(err,client){
    if(err) throw err;
    const db = client.db(process.env.DB_NAME);
    const obj_id = new ObjectId(id);
    try {
      const result = await db.collection(process.env.DB_COLLECTION).findOneAndUpdate({_id:obj_id},{$set:user},{returnDocument:'after'})
      client.close();
      res.json({"data":[result.value]})
    } catch (error) {
      client.close();
      throw error.message      
    } 
  });
}

const deleteOne = async (id,res) => {
  MongoClient.connect(url, async function(err,client){
    if(err) throw err;
    const db = client.db(process.env.DB_NAME);
    const obj_id = new ObjectId(id);
    try {
      const result = await db.collection(process.env.DB_COLLECTION).findOneAndDelete({_id:obj_id});
      client.close();
      res.json({"data":result.value})      
    } catch (error) {
      client.close();
      throw error.message;
    }
  });
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
}

