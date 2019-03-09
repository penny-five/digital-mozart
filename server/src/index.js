/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const express = require('express');
const multer = require('multer');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const { Translate } = require('@google-cloud/translate');

const utils = require('./utils');

const app = express();

const samples = ['1.wav', '2.wav', '3.wav', '4.wav', '5.wav', '6.wav', '7.wav', '8.wav', '9.wav'];

const titleGenerators = [
  title => `Kesä ja ${title}`,
  title => `"${title}" ja rakkaus`,
  title => `${title}!`,
  title => `${title}, armaani`,
  title => `${title}, ${title}, ${title}`,
  title => `Isäpapan ${title}`,
  title => `${title}, Armaani`,
  title => `Suuri ${title}`
];

const getRandomLoop = async () => {
  const [filename] = utils.pickRandom(samples);
  console.log(path.join(__dirname, 'loops', filename));
  const audioFile = await promisify(fs.readFile)(path.join(__dirname, 'loops', filename));
  console.log('file read', audioFile);
  return Buffer.from(audioFile).toString('base64');
};

const generateTitle = label => utils.pickRandom(titleGenerators)[0](label);

const translate = async text => {
  const translator = new Translate();
  const [translation] = await translator.translate(text, 'fi');
  return translation;
};

const synthetize = async text => {
  const textToSpeech = new TextToSpeechClient();

  const [synthesizeResponse] = await textToSpeech.synthesizeSpeech({
    input: { text },
    voice: { languageCode: 'sv-SE', ssmlGender: 'MALE' },
    audioConfig: { audioEncoding: 'MP3', pitch: -7.4, speakingRate: 0.45 }
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

  const randomLabels = utils.pickRandom(labels, 3);

  const translatedLabels = await Promise.all(randomLabels.map(translate));

  console.log('Create audio samples:', translatedLabels);

  const samples = await Promise.all(translatedLabels.map(synthetize));

  console.log('Generate title');

  const title = generateTitle(translatedLabels[0]);

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
