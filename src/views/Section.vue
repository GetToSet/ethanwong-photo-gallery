<template>
  <div>
    <Gallery
      v-if="galleryImageURL"
      oncontextmenu="return false;"
      :imageURL="galleryImageURL"
      :imageDesc="galleryImageDesc"
      :badgeNames="badges"
      :location="location"
      :unsplashID="unsplashID"
      :downloadURL="downloadURL"
      @click.native="
        galleryImageURL = null
        galleryImageDesc = null
        badges = null
        location = undefined
        unsplashID = undefined
        downloadURL = undefined
      "
    ></Gallery>
    <div class="container-xxl">
      <div class="page">
        <div class="row mt-5 gy-2">
          <div class="col-xs-12 col-md-9">
            <router-link to="/">
              <h1 class="site-name d-inline-block">Ethan's Photo Gallery</h1>
            </router-link>
          </div>
          <div class="col-xs-12 col-md-3 d-flex flex-row-reverse align-items-center">
            <a class="nav-item" href="https://ethanwong.me" title="Home" target="_blank">Home</a>
            <a
              class="nav-item"
              href="https://unsplash.com/@ethanwong/"
              title="Unsplash"
              target="_blank"
              >Unsplash</a
            >
            <a
              class="nav-item"
              href="https://www.instagram.com/gettoset/"
              title="Instagram"
              target="_blank"
              >Instagram</a
            >
          </div>
        </div>
        <div class="mt-3">
          <router-link
            class="category-item"
            :class="{ 'category-item-selected': currentCategoryID == id }"
            v-for="(category, id) in this.categories"
            :key="id"
            :to="id"
            >{{ category.title }}</router-link
          >
        </div>
        <div v-for="(section, index) in getSections(currentCategoryID)" :key="index">
          <div class="row">
            <div class="col-12 d-flex justify-content-end mt-5 mb-3">
              <h2 class="section-title">{{ section.title.replace(/=/g, ' ') }}</h2>
            </div>
          </div>
          <div class="row g-3">
            <div
              class="col-xs-12 col-sm-6 col-lg-4 col-xxl-3"
              oncontextmenu="return false;"
              v-for="(image, index) in section.images"
              :key="index"
              @click="clickImage(image)"
            >
              <Frame :image="image" />
            </div>
          </div>
        </div>
        <div class="mt-4">
          <CusdisComment appID="d189c9a3-6021-4f85-a628-2486b7a2058d" :pageID="currentCategoryID" />
        </div>
        <footer class="row my-4">
          <div class="col text-center">
            &copy;&nbsp;{{ new Date().getFullYear() }}
            <a href="mailto:e1hanw0ng@gmail.com" title="e1hanw0ng@gmail.com">Ethan Wong</a>
            |
            <a href="https://github.com/GetToSet/ethanwong-photo-gallery/" title="GitHub">GitHub</a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import axios from 'axios'
import CusdisComment from '@/components/CusdisComment.vue'
import Gallery from '@/components/Gallery.vue'
import Frame from '@/components/Frame.vue'
import { Category, Section, Image } from '@/types'

@Component({
  components: {
    CusdisComment,
    Frame,
    Gallery,
  },
})
export default class Home extends Vue {
  sections: Section[] = []
  categories: Record<string, Category> = {}
  galleryImageURL: string | null = null
  galleryImageDesc: string | null = null
  badges: string[] | null = null
  location?: string
  unsplashID?: string
  downloadURL?: string

  created() {
    // document.title =
    axios.get('./photos.json').then((response) => {
      this.categories = response.data.categories
      this.sections = response.data.sections
    })
  }

  @Watch('currentCategory')
  onChildChanged(category: Category) {
    if (category && category.title) {
      document.title = `${category.title} - Ethan's Photo Gallery`
    } else {
      document.title = "Ethan's Photo Gallery"
    }
  }

  get currentCategory(): Category | undefined {
    return this.categories[this.currentCategoryID]
  }

  get currentCategoryID(): string {
    return this.$route.params.section ?? 'film'
  }

  getSections(category: string): Section[] {
    if (!this.categories[category]) {
      return []
    }
    return this.categories[category].sections
      .map((idx) => {
        return this.sections[idx]
      })
      .filter((x) => x)
  }

  clickImage(image: Image) {
    this.galleryImageURL = image.url
    this.galleryImageDesc = (image.desc ?? '').replace(/=/g, ' ')
    this.badges = image.badges || null
    this.location = image.location
    this.unsplashID = image.unsplashID
    this.downloadURL = image.downloadURL
  }
}
</script>
<style scoped>
.site-name {
  font-family: 'Merriweather', serif;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 4px 6px;
  color: var(--theme-inverse);
  background: var(--theme-text);
}
.page {
  margin: 0 32px;
}
.nav-item {
  margin-left: 12px;
  font-size: 1.2rem;
}
.nav-item:hover {
  text-decoration: underline;
}
.category-item {
  display: inline-block;
  text-decoration: none;
  font-size: 1.2rem;
  height: 1.75rem;
}
.category-item-selected {
  border-bottom: 2px solid #000;
}
.category-item:not(:first-child) {
  margin-left: 8px;
}
.section-title {
  text-align: right;
}
</style>
