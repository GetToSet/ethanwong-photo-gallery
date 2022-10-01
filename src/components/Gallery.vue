<template>
  <div :class="`gallery ${imageURL !== null ? 'display' : 'hide'}`">
    <div class="gallery-container">
      <div class="gallery-container-image">
        <img :src="`${imageURL}`" class="gallery-img" />
      </div>
      <div class="gallery-desc" @click.stop>
        <div class="mb-2" v-if="imageDesc">
          {{ imageDesc }}
        </div>
        <div>
          <a
            v-for="badge in badges"
            :key="badge.name"
            target="_blank"
            class="badge-link"
            @click="!badge.download ? badgeClick(badge) : null"
            @mouseover="
              currentHint = badge.hint
              currentLink = badge.link || null
            "
            @mouseout="badgeMouseOut(badge)"
            :download="badge.link ? badge.link.split('/').pop() : null"
            :href="badge.download ? badge.link : null"
          >
            <Iconfont
              class="badge-icon"
              :name="icon"
              :fontSize="'1.2rem'"
              v-for="icon in badge.icons"
              :key="icon"
            />
          </a>
        </div>
        <div class="gallery-hint mt-1">
          <a :href="currentLink" target="_blank">{{ currentHint }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Iconfont from '@/components/Iconfont.vue'
import { Badge } from '@/types'
import allBadges from '@/allBadges'

@Component({
  components: { Iconfont },
})
export default class Gallery extends Vue {
  currentHint: string | null = null
  currentLink: string | null = null

  @Prop() private imageURL!: string | null
  @Prop() private imageDesc!: string | null
  @Prop() private badgeNames!: string[] | null
  @Prop() private location?: string
  @Prop() private unsplashID?: string
  @Prop() private downloadURL?: string

  get badges(): Badge[] {
    if (!this.badgeNames) {
      return []
    }

    let retBadges = this.badgeNames
      .map((badge) => {
        if (allBadges[badge] && !allBadges[badge].template) {
          return allBadges[badge]
        }
      })
      .filter((b) => b) as Badge[]

    if (this.location) {
      retBadges.unshift({
        ...allBadges['location'],
        hint: this.location,
      })
    }

    if (this.unsplashID) {
      retBadges.unshift({
        ...allBadges['unsplash'],
        link: `https://unsplash.com/photos/${this.unsplashID}`,
      })
    }

    if (this.downloadURL) {
      retBadges.push({
        ...allBadges['download'],
        link: this.downloadURL,
        download: true,
      })
    }

    return retBadges
  }
  badgeMouseOut(badge: Badge) {
    if (!window.matchMedia('(pointer: coarse)').matches) {
      this.currentHint = null
      this.currentLink = null
    }
  }
  badgeClick(badge: Badge) {
    if (!window.matchMedia('(pointer: coarse)').matches && badge.link) {
      open(badge.link, '_blank')
    }
  }
}
</script>

<style scoped>
.gallery {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--theme-background);
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
  box-shadow: 20px 20px 20px var(--gallery-image-shadow);
  max-width: 100%;
  max-height: 100%;
}
.gallery-desc {
  width: 80%;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 32px;
}
.badge-link {
  text-decoration: none;
  cursor: pointer;
}
.badge-link:not(:last-child) {
  margin-right: 10px;
}
.badge-link:hover {
  opacity: 0.75;
}
.badge-icon:not(:last-child) {
  margin-right: 4px;
}
.gallery-hint {
  min-height: 1.5rem;
  font-size: 1rem;
  opacity: 0.75;
}
.hide {
  display: none;
}
</style>
