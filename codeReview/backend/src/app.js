const express= require('express')
const aiRoutes=require('./routes/ai.routes')
const authRoutes = require("./routes/auth.routes");
const cors=require('cors')

const app=express();
app.use(express.json());
app.use(cors())

app.get("/",function(req,res){
    res.send("heloo app.js")
})

app.use('/ai',aiRoutes)
app.use("/auth", authRoutes);

module.exports=app