<template>
  <div :class="`gallery ${imageURL !== null ? 'display' : 'hide'}`">
    <div class="gallery-container">
      <div class="gallery-container-image">
        <img :src="`${imageURL}`" class="gallery-img" />
      </div>
      <div class="gallery-desc" @click.stop>
        <span>{{ imageDesc }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Image } from '@/types'

@Component
export default class Gallery extends Vue {
  @Prop() private imageURL!: string | null
  @Prop() private imageDesc!: string | null
}
</script>

<style scoped>
.gallery {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  margin: 0;
  padding: 0;
}
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.gallery-container-image {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  min-height: 20%;
  max-height: 80%;
}
.gallery-img {
  /* border: solid 10px #000; */
  box-shadow: 20px 20px 20px #ccc;
  max-width: 100%;
  max-height: 100%;
}
.gallery-desc {
  width: 80%;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 32px;
}
.hide {
  display: none;
}
</style>
