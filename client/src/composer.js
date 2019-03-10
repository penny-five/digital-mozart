import * as _ from 'lodash';
import axios from 'axios';
import { Howl } from 'howler';

import { sleep } from './utils';

export const creatSampleMachine = params => {
  let currentIndex = 0;

  let stopped = false;

  const onend = async () => {
    await sleep(_.random(1000, 5000));

    if (stopped) return;

    currentIndex = _.random(0, params.samples.length - 1);
    play(params.samples[currentIndex]);
  };

  const loop = new Howl({
    src: params.loop,
    loop: true,
    volume: 0.7
  });

  const play = sample => {
    new Howl({
      src: [sample],
      onend
    }).play();
  };

  return {
    play() {
      loop.fade(0, 1, 2000);
      loop.play();
      setTimeout(() => {
        play(params.samples[0]);
      }, _.random(1500, 4000));
    },
    stop() {
      loop.stop();
      stopped = true;
    }
  };
};
/**
 *
 * @param {File} inputFile
 */
export const compose = async inputFile => {
  const formData = new FormData();
  formData.append('image', inputFile);
  const res = await axios.post('/api/analyze', formData);

  const title = res.data.title;
  const loop = 'data:audio/wav;base64,' + res.data.loop;
  const samples = res.data.samples.map(s => 'data:audio/mp3;base64,' + s);
  const sampleMachine = creatSampleMachine({
    loop,
    samples
  });

  return {
    title() {
      return title;
    },
    play() {
      sampleMachine.play();
    },
    stop() {
      sampleMachine.stop();
    }
  };
};
