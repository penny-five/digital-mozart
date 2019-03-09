<template>
  <div class="page">
    <loading-spinner class="loading-spinner" />
    <p>Generating aural experience...</p>
  </div>
</template>

<script>
import LoadingSpinner from './loading-spinner';

export default {
  components: {
    LoadingSpinner
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;

  .loading-spinner {
    margin-bottom: 60px;
  }
}
</style>
