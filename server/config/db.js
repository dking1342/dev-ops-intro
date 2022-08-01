require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb');


const connection = async () => {
  const url = `mongodb://localhost:${process.env.DB_PORT}`;
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection('users');

  return {
    client,
    collection
  }
}

const getAll = async () => {
  const { client, collection } = await connection();

  try {
    return {
      users: await collection.find({}).toArray(),
      error: null
    }
  } catch (err) {
    return {
      users: null,
      error:err.message
    }
  } finally {
    client.close();  
  }
}

const getOne = async (id) => {
  const { client, collection } = await connection();
  
  try {
    const obj_id = new ObjectId(id);
    return {
      user: await collection.find({_id:obj_id}).toArray(),
      error: null
    }
  } catch (err) {
    return {
      user: null,
      error:err.message
    }
  } finally {
    client.close();  
  }
}

const createOne = async (user) => {
  const { client, collection } = await connection();
  try {
    const response = await collection.insertOne(user);
    let id = null;
    if(response.acknowledged){
      id = response.insertedId.toString();
    }
    return {
      user:id,
      error:null
    }
  } catch (err) {
    return {
      user:null,
      error:err.message
    }    
  } finally {
    client.close();
  }
}

const updateOne = async (id,user) => {
  const { client, collection } = await connection();
  try {
    const obj_id = new ObjectId(id);
    
    return {
      user: await collection.findOneAndUpdate({_id:obj_id},{$set:user},{returnDocument:'after'}),
      error:null
    }
    
  } catch (err) {
    return {
      user: null,
      error:err.message
    }
  } finally {
    client.close();
  }
}

const deleteOne = async (id) => {
  const { client, collection } = await connection();
  try {
    const obj_id = new ObjectId(id);
    return {
      user: await collection.findOneAndDelete({_id:obj_id}),
      error:null
    }    
  } catch (err) {
    return {
      user:null,
      error:err.message
    }
  } finally {
    client.close();
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
}
