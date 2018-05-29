<template>
  <div id="app">
    <h1>The <img class="letter" src="./assets/logo.png">ery Best Music on Earth</h1>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: fantasy;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.letter {
  max-height: 3rem
}
</style>
