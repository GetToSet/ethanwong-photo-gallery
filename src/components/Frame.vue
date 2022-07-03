<template>
  <div class="frame">
    <img class="frame-photo" :src="`${image.thumbnailURL}`" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Image } from '@/types'

@Component
export default class Frame extends Vue {
  @Prop() private image!: Image
}
</script>

<style scoped>
.frame {
  width: 100%;
  aspect-ratio: 900 / 600;
  padding: 0;
  /* margin: 30px; */
  /* background-color: white; */
  /* border: solid 10px black; */
  /* box-shadow: 10px 10px 10px #ccc; */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.frame:hover {
  cursor: pointer;
}
.frame-photo {
  /* max-width: 195px;
  max-height: 130px; */
  width: 100%;
  /* box-shadow: -5px -5px 5px 5px #ccc; */
}
</style>
