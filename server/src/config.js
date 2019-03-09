const samples = [
  '1.wav',
  '2.wav',
  '3.wav',
  '4.wav',
  '5.wav',
  '6.wav',
  '7.wav',
  '8.wav',
  '9.wav',
  '10.wav',
  '11.wav',
  '12.wav',
  '13.wav',
  '14.wav',
  '15.wav',
  '16.wav'
];

const voices = [
  {
    languageCode: 'ja-JP',
    name: 'ja-JP-Standard-A'
  },
  {
    languageCode: 'sv-SE',
    name: 'sv-SE-Standard-A'
  },
  {
    languageCode: 'en-US',
    name: 'en-US-Standard-B'
  },
  {
    languageCode: 'pt-PT',
    name: 'pt-PT-Standard-B'
  }
];

const titleGenerators = [
  ([title]) => `Kesä ja ${title}`,
  ([title]) => `${title} ja rakkaus`,
  ([title]) => `${title}!`,
  ([title]) => `${title}, armaani!`,
  ([title]) => `${title}, ${title}, ${title}`,
  ([title]) => `Yöllinen ${title}`,
  ([title]) => `Sinä olet ${title}`,
  ([title]) => `Tule ${title}`,
  ([title]) => `${title} sinun kanssasi`,
  ([title]) => `Yksinäinen ${title}`,
  ([title]) => `Villi ja ${title}`,
  ([title, title2]) => `Tänään minulla on ${title} ja ${title2}`,
  ([title, title2]) => `${title}, mutta ${title2} puuttuu`,
  ([title, title2]) => `${title} ja ${title2}`,
  ([title]) => `Viimeinen ${title}`,
  ([title]) => `Tuhatvuotinen ${title}`,
  ([title]) => `Ikuinen ${title}`,
  ([title]) => `Sydämeni ${title}`,
  ([title]) => `Sinulle, ${title}`,
  ([title, title2]) => `${title}, ${title2} ja rakkautta`,
  ([title]) => `All you need is ${title}`
];

module.exports = { samples, voices, titleGenerators };
