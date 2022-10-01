<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class App extends Vue {}
</script>
<style lang="scss">
@import 'bootstrap/scss/bootstrap-reboot.scss';
@import 'bootstrap/scss/bootstrap-grid.scss';
@import 'bootstrap/scss/bootstrap-utilities.scss';

body {
  margin: 0;
  font-family: 'Solway', sans-serif;
  background-color: var(--theme-background);
  color: var(--theme-text);
}
a {
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: var(--theme-highlight);
  }
}
::selection {
  background: var(--selection-background);
}
</style>
