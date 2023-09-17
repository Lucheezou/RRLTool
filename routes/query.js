var express = require('express');
var router = express.Router();
let openai = require("openai");
require('dotenv').config()

const model = new openai({
    apiKey: process.env.CLIENT_SECRET,
});



/* GET users listing. */
router.post('/', async function(req, res, next) {

async function getQuery(question,thesis){
const chatCompletion = await model.chat.completions.create({
    messages: [{ role: "user", content: `respond with just a json object with keys 1-5 and values containing a concise paragraph answer to these questions [research objective for a research called ${question},  what is the methodology for a research called ${question}, what are the key findings for a research called ${question}, what is the relevance for a research called  ${question} to a thesis called ${thesis} using Transformers, what is the difference for a research called  ${question} to a thesis called ${thesis}]` }],
    model: "gpt-3.5-turbo",
});

return chatCompletion
}

  let response = await getQuery(req.body.question,req.body.thesis)
  console.log(response.choices[0].message.content)
  res.json(response.choices[0].message.content)


});

module.exports = router;
