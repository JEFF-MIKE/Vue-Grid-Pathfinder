<template>
  <PathfinderGrid />
</template>

<script>
import PathfinderGrid from "./components/PathfinderGrid.vue"

export default {
  name: 'App',
  components: {
    PathfinderGrid
  }
}
</script>

<style lang="scss">
  @use "./global_style/colors" as c;
  html {
    background: #362718;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width:850px){
    #app {
      flex-direction: column;
      background: c.$primary-color;
      padding-top: 40px;
    }
  }
</style>
