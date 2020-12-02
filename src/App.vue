<template>
  <div id="app">
  
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
@import url('./assets/css/reset.css');
@import url('./assets/font/iconfont.css');
html {
  background: #f5f5f5;
}
body {
  height: 100vh;
  font-size: 18px;
  font-family: "helvetica neue",arial,sans-serif
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
