<template>
  <div
    :class="classes"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <form>
      <i class="icon" v-html="$options.icon" />
      <input type="file" id="imageupload" accept="image/*" hidden @change="onInput" />
      <label class="upload-label" for="imageupload">Choose an image</label>
      <span class="instructions"> or drop it here here to generate music</span>
    </form>
  </div>
</template>

<script>
import icon from '@/assets/images/upload.svg?inline';

export default {
  icon,
  data: () => ({
    isDragging: false
  }),
  computed: {
    classes() {
      return {
        'drop-area': true,
        'drop-area--dragging': this.isDragging
      };
    }
  },
  methods: {
    /**
     * @param {DragEvent} event
     */
    onDrop(event) {
      if (event.dataTransfer.files) {
        this.onFileAdded(event.dataTransfer.files[0]);
      }
    },
    /**
     * @param {Event} event
     */
    onInput(event) {
      this.onFileAdded(event.target.files[0]);
    },
    /**
     * @param {File} file
     */
    onFileAdded(file) {
      file;
      // TODO
    }
  }
};
</script>

<style lang="scss">
.drop-area {
  max-width: 600px;
  padding: 50px 20px;
  text-align: center;
  border: 1px solid $color-grey-100;
  border-radius: 10px;
  background-color: transparentize($color-grey-100, 0.9);
  transition: all 0.2s ease-in-out;

  &--dragging {
    background-color: transparentize($color-grey-100, 0.6);
    box-shadow: inset 0px 1px 4px rgba(black, 0.05);
  }

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

  .upload-label {
    font-weight: $font-weight-bold;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .instructions {
    font-weight: $font-weight-medium;
  }
}
</style>
