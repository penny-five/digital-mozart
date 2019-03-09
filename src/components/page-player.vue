<template>
  <div class="page content">
    <button class="back-btn" @click="onNavigateBack">
      <div class="icon" v-html="$options.iconBack" />
      <span>Back</span>
    </button>
    <equalizer class="equalizer" />
    <span class="song-title">Lorem ipsum</span>
    <span class="now-playing">Now playing</span>
  </div>
</template>

<script>
import iconBack from '@/assets/images/back.svg?inline';

import Equalizer from './equalizer';

export default {
  iconBack,
  components: {
    Equalizer
  },
  methods: {
    onNavigateBack() {}
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .back-btn {
    @include buttonize();
    position: relative;
    align-self: flex-start;

    .icon {
      width: 20px;
      margin-right: 15px;
      color: $color-grey-200;
    }
  }

  .equalizer {
    margin: 70px auto 30px;
  }

  .song-title {
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
    margin: 0 0 15px;
  }

  .now-playing {
    font-size: $font-size-default;
  }
}
</style>
