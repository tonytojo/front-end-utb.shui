<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-black text-white mr-2">
    
    <!-- Handling the hamburgermenu -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Handling the logo => Home -->
    <router-link class="nav-link text-white bg-white p-0" :to="{ name: 'Home' }">
      <img class="float-left cursor-pointer" src="@/assets/logo.jpg" alt=" " />
    </router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">

         <!-- Handling the Home menu -->
        <li class="nav-item">
          <router-link class="btn nav-link text-white" :to="{ name: 'Home' }">Hem
          </router-link>
        </li>

       <!-- Handling the Create stream  -->
        <li v-if="isAutenticated" class="nav-item">
          <router-link class="btn nav-link text-white" :to="{ name: 'Stream' }">Tags</router-link>
        </li>

         <!-- Handling the add a new post  -->
        <li v-if="isAutenticated" class="nav-item">
          <router-link class="btn nav-link text-white" :to="{ name: 'AddPost' }">CreatePost</router-link>
        </li>

          <!-- Handling the show posts  -->
        <li v-if="isAutenticated" class="nav-item">
          <router-link class="btn nav-link text-white" :to="{ name: 'ShowPost' }">ShowPost</router-link>
        </li>

        <!-- Handling the fa-user + username -->
         <li v-if="isAutenticated" class="nav-item">
          <router-link class="btn nav-link text-white" :to="{ name: 'LogoutDelUser' }">
            <i class="fas fa-user user">&nbsp;{{getUserName}}</i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <Header />
</template>

<script>
import Header from "@/components/Header";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
  },
  data() {
    return {
      count: "0",
      userName:""
    };
  },
  methods: {
    showCart() {
      this.$router.push("/Order");
    },
  },

  computed: {
    ...mapGetters(["isAutenticated", "getUserName"]),
  },
};
</script>

<style scoped>

.user {
  font-size: 16px;
}

.t7 {
  top: -7px;
}
.size25 {
  font-size: 25px;
}

.size18 {
  font-size: 18px;
  font-style: normal;
  top: -1;
}

.pt6 {
  padding-top: 6px;
}

.bg-black {
  background-color: #536B79;
}

nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #d6d6d6;
  border-bottom: 1px solid grey;
  z-index: 1;
}

nav a {
  text-decoration: none;
  padding: 5px;
}

.nav-links {
  display: flex;
  width: 75%;
  justify-content: right;
}

.links {
  padding-right: 20px;
  list-style: none;
}

.nav-item:hover {
  border-bottom: 3px solid #000;
}

nav a.router-link-exact-active {
  color: darkgray;
  background-color: #403a34;
}
/* //FF574A */
nav #logo {
  background-color: #d6d6d6;
  margin-left: 10px;
}

.info {
  background-color: lightgreen;
}
</style>
