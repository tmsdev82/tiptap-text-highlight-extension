<template>
<div id="app">
    <menu-bubble />
   
</div>
</template>

<script>
import MenuBubble from './components/MenuBubble.vue'

export default {
    name: 'App',
    components: {
        MenuBubble,
    },
    data() {
        return {
            
        }
    }
}
</script>

<style lang="sass">
@import './assets/sass/main.scss'
</style>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
