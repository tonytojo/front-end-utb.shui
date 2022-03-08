<template>
  <div class="container-fluid full">
    <div class="col-xs-12 col-sm-6 text-light mx-auto pt-5">
      <h1 class="text-center">LogOut/Delete</h1>
    </div>

    <div class="row justify-content-center h-100">
      <div class="card mt-4 col-xs-12 col-sm-10 col-md-5 ">
        <div class="card-header">
          <h3 class="text-center">Logout from SHUI</h3>
        </div>

        <div class="card-body">
          <p class="text-light pb-4">Clicking the Logout button will checkout from the Shui system</p>
          <button class="w-100 btn btn-primary mt-2" @click="logOut">Logout</button>
        </div>
      </div>

      <div class="card mt-4 col-xs-12 col-sm-10 col-md-5 ml-3 ml0">
        <div class="card-header">
          <h3 class="text-center">Delete user</h3>
        </div>
        <div class="card-body">
          <p class="text-light">When you checkmark you get access to the delete button</p>
          <div class="row custom-control custom-checkbox text-light">
            <input @click="checkToDelete" type="checkbox" class="custom-control-input" id="customCheck" />
            <label class="custom-control-label border px-4" for="customCheck">{{this.name}}</label>
          </div>
          <button v-show="isActive" class="btn btn-primary w-100 mt-2" @click="deleteUser">DeleteUser</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isActive: false,
      name: "",
    };
  },
  mounted() {
    this.name = this.getUserName;
  },
  methods: {
    //Call backend to delete the logged in user
    async deleteUser() 
    {
      if (confirm("Do you really want lo delete account: " + this.getUserName )) 
      {
        const status = await this.$store.dispatch("deleteUser", "");
        
        if (status) {
          this.$router.push("/");
        }
      }
    },

    //Show the delete button on true
    checkToDelete() {
      this.isActive = !this.isActive;
    },

    //----------------------------------------------------
    //    Perform a logout. Spacefill property for login
    //----------------------------------------------------
    async logOut() {
      if (confirm("Do you realy want lo to logout?")) {
        //Call state to declare logout
        const status = await this.$store.dispatch("logOut", "");

        if (status) {
          this.$router.push("/");
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getUserName"]),
  },
};
</script>

<style scoped>
.full {
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: "Numans", sans-serif;
  padding-bottom: 320px;
}
.card {
  width: 400px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.card-header h3 {
  color: white;
}

.input-group-prepend span {
  width: 50px;
  background-color: #007bff;
  color: black;
  border: 0 !important;
}

.pointer {
  cursor: pointer;
  font-weight: bold;
}

h1 {
  font-size: 32px;
}

input:focus {
  outline: 2px solid #007bff;
}


@media screen and (max-width: 767px) {
  .full {
     padding-bottom: 50px;
  }

  .ml0 {
    margin-left: 0 !important;
  }
}
</style>
