/* eslint-disable no-console */

const express = require('express');
const multer = require('multer');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const app = express();

app.post('/api/analyze', multer().single('image'), async (req, res) => {
  const vision = new ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await vision.labelDetection(req.file.buffer);

  const labels = result.labelAnnotations
    .map(label => label.description)
    .filter(label => label != null && label !== '');

  console.log('Labels:', labels);

  const textToSpeech = new TextToSpeechClient();

  console.log('Create audio sample:', labels[0]);

  const [synthesizeResponse] = await textToSpeech.synthesizeSpeech({
    input: { text: labels[0] },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' }
  });

  res
    .send({
      labels,
      speech: Buffer.from(synthesizeResponse.audioContent).toString('base64')
    })
    .status(200);
});

app.use(function(err) {
  if (err) console.error(err.stack);
});

const port = parseInt(process.env.PORT, 10);
app.listen(port, () => console.log(`digital-mozart backend listening on port ${port}`));
