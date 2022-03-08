<template>
  <div>
     <NavMenu />
     <router-view /> <!--  Home component will be shown first -->
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";

export default {
   data() 
   {
      return {

      }
   },
  name:'App',
  components: {
    NavMenu
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
