const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
// const data = require('./data')
dotenv.config();
const app = express();
app.use(cors());
var prompt;
const config = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(config);

app.get('/', function (req, res) {
    console.log("All Ok");
    res.status(400).json("API ACTIVE")
})
app.get('/sih/api/', function (req, res) {
    res.status(200).json("LETS GO");
})
app.get('/sih/api/:muscle/info', async function (req, res) {
    const muscle = req.params.muscle.toLowerCase().trim();

    prompt = `Act as an experienced myologist, who has more than 10 years of experience in the field, and answer my queries.Give me a simplified description of ${muscle} muscle, which even a 10 year old kid can understand and the information should be trustworthy.`;
    try {

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: 1,
        });
        const data = response.data.choices[0].text.trim();

        const responseObject = {
            muscle: muscle,
            info: data
        };

        res.status(200).json(responseObject);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }



})
app.get('/sih/api/:muscle/symptoms', async function (req, res) {
    const muscle = req.params.muscle.toLowerCase().trim();
    // const symptom = req.params.symptoms.toLowerCase().trim();
    // if (muscle !== 'abdominals' && muscle !== 'obliques' && muscle !== 'forearms' && muscle !== 'biceps' && muscle !== 'shoulders') {
    //     res.status(404).json("Not Found");
    // }
    // if (symptom !== 'weakness' && symptom !== 'pain' && symptom !== 'cramps' && symptom !== 'twitching' && symptom !== 'fatigue') {
    //     res.status(404).json("Please Select Right Symptom");
    // }
    prompt = `you are my health advisor,i will give you muscle name based on that you have to give me 10 common medical symptoms of that muscle. muscle=${muscle}. The response that you will provide should be in JSON Stringified object format. Example : symptoms:[{ symptom:'Pain',},{symptom:'Swelling',},{symptom:'Itching',},]`;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: 1,
        });
        const data = response.data.choices[0].text.trim();
        console.log(data);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }

})

app.listen(8080, function () {
    console.log("server running at port 8080");
})