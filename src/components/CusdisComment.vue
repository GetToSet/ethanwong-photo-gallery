<template>
  <div
    id="cusdis_thread"
    :data-host="host"
    :data-app-id="appID"
    :data-page-id="pageID"
    :data-page-url="currentLocation"
    :data-page-title="currentTitle"
    data-theme="auto"
  />
</template>

<script lang="ts">
export default {
  props: {
    host: {
      type: String,
      default: 'https://cusdis.com',
    },
    appID: {
      type: String,
      required: true,
    },
    pageID: {
      type: String,
      default: () => {
        return location.pathname
      },
    },
  },
  computed: {
    currentLocation() {
      return window.location
    },
    currentTitle() {
      return document.title
    },
  },
}
</script>

<style scoped></style>
