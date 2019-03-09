/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const _ = require('lodash');
const express = require('express');
const multer = require('multer');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const { Translate } = require('@google-cloud/translate');

const config = require('./config');
const utils = require('./utils');

const app = express();

const getRandomLoop = async () => {
  const [filename] = utils.pickRandom(config.samples);
  const audioFile = await promisify(fs.readFile)(path.join(__dirname, 'loops', filename));
  return Buffer.from(audioFile).toString('base64');
};

const generateTitle = labels => utils.pickRandom(config.titleGenerators)[0](labels);

const translate = async text => {
  const translator = new Translate();
  const [translation] = await translator.translate(text, 'fi');
  return translation;
};

const synthetize = async ({ text, pitch, speakingRate, voice }) => {
  const textToSpeech = new TextToSpeechClient();

  const [synthesizeResponse] = await textToSpeech.synthesizeSpeech({
    input: { text },
    voice: { languageCode: voice.languageCode, name: voice.name, ssmlGender: 'MALE' },
    audioConfig: {
      audioEncoding: 'MP3',
      pitch,
      speakingRate
    }
  });

  return Buffer.from(synthesizeResponse.audioContent).toString('base64');
};

app.post('/api/analyze', multer().single('image'), async (req, res) => {
  console.log('Processing request');

  const vision = new ImageAnnotatorClient();

  const [result] = await vision.labelDetection(req.file.buffer);

  const labels = result.labelAnnotations
    .map(label => label.description)
    .filter(label => label != null && label !== '');

  console.log('Labels:', labels);

  const randomLabels = utils.pickRandom(labels, _.random(3, 6));

  const translatedLabels = await Promise.all(randomLabels.map(translate));

  console.log('Create audio samples:', translatedLabels);

  const [voice] = utils.pickRandom(config.voices);
  console.log('voice', voice);

  const pitch = _.random(-7.4, -2.0, true);
  console.log('pitch', pitch);

  const speakingRate = _.random(0.3, 0.6, true);
  console.log('speakingRate', speakingRate);

  const samples = await Promise.all(
    translatedLabels.map(label =>
      synthetize({
        text: label,
        voice,
        pitch,
        speakingRate
      })
    )
  );

  console.log('Generate title');

  const title = generateTitle(translatedLabels);

  console.log('Fetch random loop');

  const loop = await getRandomLoop();

  console.log('All done');

  res
    .send({
      labels,
      samples,
      loop,
      title
    })
    .status(200);
});

app.use(function(err) {
  if (err) console.error(err.stack);
});

const port = parseInt(process.env.PORT, 10);
app.listen(port, () => console.log(`digital-mozart backend listening on port ${port}`));
