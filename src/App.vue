<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap/dist/css/bootstrap-utilities.css'

@Component({
  components: {},
})
export default class App extends Vue {}
</script>
<style>
body {
  margin: 0;
  font-family: 'Solway', sans-serif;
  background-color: whitesmoke;
}
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  text-decoration: underline;
  color: #333;
}
::selection {
  background: #bbb;
}
</style>
