const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const device = require('express-device');

const clickRouter = require('./routes/clickRouter.js');
const userRouter  =  require('./routes/userRouter.js');
const campaignRouter = require('./routes/campaignRouter.js');
const quizRouter = require('./routes/quizRouter.js');
const blogRouter =  require('./routes/blogRouter.js');
const blogPostRouter  = require('./routes/blogPostRouter.js');
const leadRouter =  require('./routes/leadRouter.js');
const cryptoLeadRouter = require('./routes/cryptoLeadRouter.js')
const funnelRouter = require('./routes/funnelRouter')
const smsRouter =  require('./routes/smsRouter.js')
const tourPackageRouter = require('./routes/tourPackageRouter.js')

const db = require('./config/db.js');
const connectDB = require('./config/db.js');
const jwt = require('jsonwebtoken');

connectDB();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(bodyParser.json());
app.use(cors());
app.use(device.capture());







app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.set('trust proxy', true)

const authMiddleware = (req,res,next) =>{
    // need to get jwt from client
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({  authorized:"failed" });
        }
       next();
      })
};

app.use('/user',userRouter);
app.use('/api/clicks',clickRouter);
app.use('/api/quiz/',quizRouter);
app.use('/api/campaigns' ,authMiddleware, campaignRouter);
app.use('/api/sms' , smsRouter);
app.use('/api/blog/thumnails',blogRouter);
app.use('/api/blog/posts',blogPostRouter);
app.use('/api/leads',leadRouter);
app.use('/api/contact',cryptoLeadRouter)
app.use('/api/tours',tourPackageRouter)



if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}


app.listen(port,()=>{
    console.log('port listenting');
})