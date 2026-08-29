const mongoose = require("mongoose");


const connectDb= ()=>{
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

}
module.exports=connectDb;