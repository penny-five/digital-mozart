<template>
  <div class="equalizer">
    <div v-for="i in 6" :key="i" :class="`bar bar--${i}`"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0% {
    transform: translateY(30%);
  }
  25% {
    transform: translateY(80%);
  }
  50% {
    transform: translateY(40%);
  }
  75% {
    transform: translateY(80%);
  }
  100% {
    transform: translateY(30%);
  }
}

$colors: #78e6bc, #70c0e4, #9c8ada, #c895ea, #c57aba, #fbb3fa;

.equalizer {
  display: flex;

  .bar {
    position: relative;

    width: 20px;
    height: 50px;

    background-color: $color-grey-100;
    border-radius: 4px;
    overflow: hidden;

    + .bar {
      margin-left: 7px;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 50px;
      border-radius: 0 0 4px 4px;
      animation: pulse 1.2s infinite linear;
      transform: translateY(40%);
    }

    &--1:after {
      background-image: linear-gradient(nth($colors, 1), darken(nth($colors, 1), 20%));
      animation-delay: 100ms;
    }

    &--2:after {
      background-image: linear-gradient(nth($colors, 2), darken(nth($colors, 2), 20%));
      animation-delay: 200ms;
    }

    &--3:after {
      background-image: linear-gradient(nth($colors, 3), darken(nth($colors, 3), 20%));
      animation-delay: 0ms;
    }

    &--4:after {
      background-image: linear-gradient(nth($colors, 4), darken(nth($colors, 4), 20%));
      animation-delay: 400ms;
    }

    &--5:after {
      background-image: linear-gradient(nth($colors, 5), darken(nth($colors, 5), 20%));
      animation-delay: 500ms;
    }

    &--6:after {
      background-image: linear-gradient(nth($colors, 6), darken(nth($colors, 6), 20%));
      animation-delay: 0ms;
    }
  }
}
</style>
