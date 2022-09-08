require("dotenv").config() 
const express = require('express');
const mongoose = require('mongoose'); 
const router = require('./router/index');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middlewares');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use("/auth", router)
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT ,() => console.log("Started listening on port " + PORT));
        
    } catch (e) {
        console.log(e);
    }

}
start()