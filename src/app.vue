<template>
  <div id="app">
    <header class="header">
      <div class="content">
        <h1>Digital Mozart</h1>
      </div>
    </header>
    <main class="main">
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
    </main>
    <footer class="footer">
      <div class="content">
        <p>Digital Mozart&trade; 2019</p>
      </div>
    </footer>
  </div>
</template>

<script>
import DropArea from './components/drop-area';

export default {
  name: 'app',
  components: {
    DropArea
  }
};
</script>

<style lang="scss">
@import './assets/styles/styles.scss';

#app {
  .content {
    margin: auto;
    padding: 0 19px;
    max-width: 900px;
  }

  .header {
    border-bottom: 1px solid $color-grey;
  }

  .main {
    min-height: calc(100vh - /* header */ 88px - /* footer */ 102px);
    padding: 80px 0;
  }

  .footer {
    padding: 20px;
    text-align: center;
  }

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
    margin: 50px auto;
  }
}
</style>
