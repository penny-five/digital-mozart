<template>
  <div class="drop-area">
    <div class="icon" v-html="$options.icon"></div>
    <span class="instructions">Drop image file here to generate music</span>
  </div>
</template>

<script>
import icon from '@/assets/images/upload.svg?inline';

export default {
  icon
};
</script>

<style lang="scss">
.drop-area {
  max-width: 500px;
  padding: 50px 20px;
  text-align: center;
  border: 1px solid $color-grey;
  border-radius: 10px;
  background-color: transparentize($color-grey, 0.9);

  .icon {
    display: block;
    margin: 0 auto 25px;
    height: 50px;
    opacity: 0.25;
    color: $color-black;

    > svg {
      height: inherit;
    }
  }

  .instructions {
    font-weight: $font-weight-bold;
  }
}
</style>
