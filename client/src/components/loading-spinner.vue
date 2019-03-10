<template>
  <div class="loading-spinner">
    <div v-for="i in 4" :key="i" :class="`dot dot--${i}`"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@keyframes bounce {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(80%);
  }
  100% {
    transform: translateY(0%);
  }
}

$colors: #78e6bc, #70c0e4, #9c8ada, #c895ea, #c57aba, #fbb3fa;

.loading-spinner {
  display: flex;
  position: relative;

  .dot {
    position: relative;

    width: 20px;
    height: 20px;

    border-radius: 50%;

    + .dot {
      margin-left: 7px;
    }

    animation: bounce 0.8s infinite ease-in-out;

    &--1 {
      background-image: linear-gradient(nth($colors, 1), darken(nth($colors, 1), 20%));
      animation-delay: 100ms;
    }

    &--2 {
      background-image: linear-gradient(nth($colors, 2), darken(nth($colors, 2), 20%));
      animation-delay: 200ms;
    }

    &--3 {
      background-image: linear-gradient(nth($colors, 3), darken(nth($colors, 3), 20%));
      animation-delay: 300ms;
    }

    &--4 {
      background-image: linear-gradient(nth($colors, 4), darken(nth($colors, 4), 20%));
      animation-delay: 400ms;
    }
  }
}
</style>
