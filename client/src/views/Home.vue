<template>
  <div class="container-fluid full">
    <div v-if="show" class="loader-wrapper">
      <span class="loader">
        <p class="text-light">Loading</p>
        <span class="loader-inner"></span>
      </span>
    </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";

export default {
  data() {
    return {
      show:true,
    }
  },
  //---------------------------------------
  // Simulate slow page
  //----------------------------------------
  mounted() {
    this.loading();
  },
  //-------------------------------------------------------
  // Using a timer to simulate a slow page in some seconds
  //-------------------------------------------------------
  methods: {
    loading() {
      setTimeout(() => {
        this.show = false;
         this.$router.push("/login");
      }, 800);
    },
},
};
</script>

<style scoped>

.full {
  background-image: url('poster-sequrity.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  height:500px;
  font-family: 'Numans', sans-serif;
  margin-top: 5px;
}

body {
  margin: 0;
  padding: 0;
  width:100vw;
  height: 100vh;
  background-color: red;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100%;
}
.loader-wrapper {
  width: 80%;
  height: 50%;
  /* position: absolute;
  top: 200px;
  left: 100px; */
  background-color: #242f3f;
  display:flex;
  justify-content: center;
  align-items: center;
  margin:0 auto;
}

.loader {
  display: inline-block;
  width: 70px;
  height: 60px;
  position: relative;
  border: 4px solid #Fff;
  animation: loader 2s infinite ease;
}
.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  animation: loader-inner 2s infinite ease-in;
}
@keyframes loader {
  0% { transform: rotate(0deg);}
  25% { transform: rotate(180deg);}
  50% { transform: rotate(180deg);}
  75% { transform: rotate(360deg);}
  100% { transform: rotate(360deg);}
}

@keyframes loader-inner {
  0% { height: 0%;}
  25% { height: 0%;}
  50% { height: 100%;}
  75% { height: 100%;}
  100% { height: 0%;}
}
</style>
