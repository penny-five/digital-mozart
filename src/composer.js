import axios from 'axios';
import { Howl, Howler } from 'howler';

/**
 *
 * @param {File} inputFile
 */
export const compose = async inputFile => {
  const formData = new FormData();
  formData.append('image', inputFile);
  const res = await axios.post('/api/analyze', formData);

  Howler.volume(0.5);

  const howl = new Howl({
    src: ['data:audio/mp3;base64,' + res.data.speech],
    loop: true
  });

  howl.play();
};
