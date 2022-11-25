import mongoose, { Schema } from 'mongoose'

const db = mongoose.createConnection("mongodb://mongo:AN6GA2LtenmKCX1T6XRl@containers-us-west-31.railway.app:7330/test?authSource=admin")

const TestSchema = new Schema({
  name: String
})

exports.handler = async function (event: any, context: any) {
  try {
    // exports.handler = async function (event: any, context: any) {
      context.callbackWaitsForEmptyEventLoop = false;
      console.log("event", event)
  
      const TestModel = db.model('Test', TestSchema)
      
      const doc = await TestModel.create({
        name: 'Sera'
      })
  
      console.log("doc", doc.toObject())
  
  
      return {
          statusCode: 200,
          headers: { "Content-Type": "text/plain" },
          body: `from profile testing...`
      };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: error.message
  };
  }
};
