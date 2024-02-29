const mongoos = require("mongoose")

const DB = "mongodb://127.0.0.1:27017/SoundCart";


mongoos.set('strictQuery',true);
mongoos.connect(DB,{
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(()=>console.log("Database Connected")).catch((err)=>{
    console.log(err);
})