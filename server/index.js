require("dotenv").config()

const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const chatmodel = require('./model/chatmodel')

// connection to MongoDB
const connectDB = require('./config/db');

connectDB()

const configuration = new Configuration({
    organization: "org-K7F84jRKxGtEXvYi7YzVdsBx",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Our express api to call the function above
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

app.post('/',async (req,res)=>{
    const {message} = req.body;
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    
    res.json({
      message : response.data.choices[0].text,
    });


    await chatmodel.create({
      question : message,
      response:  response.data.choices[0].text
  })

})

// GET history messages
app.get('/historychat',async (req, res) =>{
  const messages = await chatmodel.find()
  res.json({
    message : messages,
  });
})




app.listen(process.env.PORT,()=>{
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})

