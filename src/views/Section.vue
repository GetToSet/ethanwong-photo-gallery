<template>
  <div class="row">
    <div class="col-xs">
      <Gallery
        v-if="galleryImageURL"
        oncontextmenu="return false;"
        :imageURL="galleryImageURL"
        :imageDesc="galleryImageDesc"
        @click.native="
          galleryImageURL = null
          galleryImageDesc = null
        "
      ></Gallery>

      <div class="row page">
        <div class="col-xs">
          <div class="row">
            <div class="col-xs-12 col-md-9">
              <router-link to="/">
                <h1 class="site-name">Jallery</h1>
              </router-link>
            </div>
            <div class="col-xs-12 col-md-3">
              <div class="row end-xs">
                <div class="col-xs nav">
                  <a class="nav-item" href="https://www.instagram.com/gettoset/" target="_blank"
                    >Instagram</a
                  >
                  <a class="nav-item" href="https://unsplash.com/@ethanwong/" target="_blank"
                    >Unsplash</a
                  >
                  <a class="nav-item" href="https://ethanwong.me" target="_blank">Home</a>
                </div>
              </div>
            </div>
          </div>
          <div class="row section" v-for="(section, index) in sections" :key="index">
            <div class="col-xs">
              <div class="row end-xs">
                <div class="col-xs">
                  <h2 class="section-title">{{ section.title.replace(/=/g, ' ') }}</h2>
                </div>
              </div>

              <div class="row">
                <div
                  class="col-xs-12 col-sm-6 col-md-3"
                  oncontextmenu="return false;"
                  v-for="(image, index) in section.images"
                  :key="index"
                  @click="clickImage(image)"
                >
                  <div class="row center-xs">
                    <Frame :image="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer class="row center-xs footer"></footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'
import Gallery from '@/components/Gallery.vue'
import Frame from '@/components/Frame.vue'
import { Section, Image } from '@/types'

@Component({
  components: {
    Frame,
    Gallery,
  },
})
export default class Home extends Vue {
  sections: Section[] = []
  galleryImageURL: string | null = null
  galleryImageDesc: string | null = null

  created() {
    axios.get('/photos.json').then((response) => {
      this.sections = response.data
    })
  }

  clickImage(image: Image) {
    this.galleryImageURL = image.url
    this.galleryImageDesc = image.desc.replace(/=/g, ' ')
  }
}
</script>
<style scoped>
.site-name {
  font-family: 'Permanent Marker', Times, serif;
}
.page {
  margin: 0 50px;
}

.nav {
  margin: 30px 0;
}
.nav-item {
  margin: 0 12px;
}
.nav-item:hover {
  text-decoration: underline;
}
.footer {
  height: 100px;
}
</style>
