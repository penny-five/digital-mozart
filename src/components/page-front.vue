<template>
  <div class="page">
    <img class="logo" src="@/assets/images/logo.svg" />
    <div class="content">
      <h2>Your browser is now a composer.</h2>
      <section class="section">
        <p><strong>Digital Mozart</strong> is a next-gen AI-powered composer.</p>
        <p>
          It generates beautiful, thought-provoking tunes using an image you have provided as its
          source of inspiration. It is powered by Google&reg; state-of-the-art image recognition
          algorithms, machine learning and modern browser API's. Our long-term vision is to make
          human composers obsolete.
        </p>
        <p>Welcome to the new era of music.</p>
      </section>
      <drop-area class="drop-area" />
    </div>
  </div>
</template>

<script>
import DropArea from './drop-area';

export default {
  components: {
    DropArea
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 75px 20px 20px;

  .section {
    text-align: center;
  }

  .logo {
    display: block;
    margin: 0 auto;
    padding-left: 20px;
    height: 240px;
    opacity: 0.9;
  }

  .drop-area {
    margin: 60px auto;
  }
}
</style>
