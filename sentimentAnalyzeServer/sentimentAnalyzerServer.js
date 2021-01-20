const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.static('client'))

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');
    return new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    })
}


function understandTextLanguageSentiment(textToAnalyze, res) {
    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'features': {
            'sentiment': {}
        },
        'text': textToAnalyze
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            const labelAnalysisResult=analysisResults.result.sentiment.document.label
            res.send(`${labelAnalysisResult}`)
        })
        .catch(err => {
            console.log('error:', err);
        });
}


function understandTextLanguageEmotion(textToAnalyze, res) {
    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'features': {
            'emotion': {}
        },
        'text': textToAnalyze
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            const emotionResult = analysisResults.result.emotion.document.emotion
            console.log(emotionResult, typeof emotionResult)
            res.send(emotionResult)
        })
        .catch(err => {
            console.log('error:', err);
        });
}

function understandUrlLanguageEmotion(urlToAnalyze, res) {
    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'url': urlToAnalyze,
        'features': {
            'emotion': {}
        }
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            const emotionResult = analysisResults.result.emotion.document.emotion
            res.send(emotionResult)
        })
        .catch(err => {
            console.log('error:', err);
        });
}

function understandUrlLanguageSentiment(urlToAnalyze, res) {
    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'url': urlToAnalyze,
        'features': {
            'sentiment': {}
        }
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            const labelAnalysisResult=analysisResults.result.sentiment.document.label
            res.send(`${labelAnalysisResult}`)
        })
        .catch(err => {
            console.log('error:', err);
        });
}


const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    const url = req.query.url;
    understandUrlLanguageEmotion(url, res)
});

app.get("/url/sentiment", (req, res) => {
    const url = req.query.url;
    understandUrlLanguageSentiment(url, res)
});

app.get("/text/emotion", (req, res) => {
    let textToEmotion = req.query.text
    understandTextLanguageEmotion(textToEmotion, res)
});

app.get("/text/sentiment", (req, res) => {
    let textToSentiment = req.query.text
    understandTextLanguageSentiment(textToSentiment, res)
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})