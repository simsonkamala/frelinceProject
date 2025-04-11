require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
// mongodb://kirenadmin:kirenadmin@localhost:27017/"kireninvoice"?authSource=admin
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const db = mongoose.connection

// --------- For DataBase Connection -----------
db.on("error", () => ( console.log(" DataBase Connection Error ....") ))
db.on("open", () => ( console.log(" DataBase Connection Successfull.... ") ))

const mainlogics = require("./dataSchemaAndLogics/mainlogic")
app.use("/mainlogics", mainlogics)
app.listen(port, () => {
    console.log(` 💽 Server is Running......🏃🏼‍♂️` )
})