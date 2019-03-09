<template>
  <div id="app">
    <header class="header">
      <div class="content">
        <h1>Digital Mozart</h1>
      </div>
    </header>
    <main class="main">
      <page-player v-if="showPlayer" />
      <page-front v-else />
    </main>
    <footer class="footer">
      <div class="content">
        <p>Digital Mozart&trade; 2019</p>
      </div>
    </footer>
  </div>
</template>

<script>
import PageFront from './components/page-front';
import PagePlayer from './components/page-player';

export default {
  name: 'app',
  components: {
    PageFront,
    PagePlayer
  },
  computed: {
    showPlayer() {
      return true;
    }
  }
};
</script>

<style lang="scss">
@import './assets/styles/styles.scss';

#app {
  .header {
    border-bottom: 1px solid $color-grey-100;
  }

  .main {
    min-height: calc(100vh - /* header */ 88px - /* footer */ 102px);
  }

  .footer {
    padding: 20px;
    text-align: center;
    color: $color-grey-200;
  }
}
</style>
