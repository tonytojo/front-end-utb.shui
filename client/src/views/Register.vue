<template>
  <div class="container-fluid full">
    <div class="col-xs-12 col-sm-6 text-light mx-auto pt-5">
      <h1 class="text-center">Register</h1>
    </div>

    <div class="d-flex justify-content-center h-100 pb-6">
      <div class="card mt-4">
        
        <div class="card-header">
          <h3 class="text-center">Register to SHUI</h3>
        </div>

        <div class="card-body">
          <form @submit.prevent="submitRegister">

            <!-- Handle input name -->
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <input v-model="name" ref="namn" type="text" class="form-control" required placeholder="name" />
            </div>

            <!-- Handle input email -->
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <input v-model="email" type="email" class="form-control" required placeholder="email" />
            </div>

              <!-- Handle input password -->
             <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                  <input v-model="password" type="password" class="form-control" required placeholder="password" />
              </div>

            <!-- Handle submit register -->
            <div class="form-group">
              <input type="submit" value="Register" class="btn-primary w-100" />
            </div>
          </form>
        </div>

      
        <!-- Show suitable text -->
        <div className="card-footer mb-5">
          <div className="d-flex justify-content-center links text-light">
            You have an account? &nbsp;
            <span @click="doLogin" className="text-primary pointer">
              Login
            </span>
          </div>
        </div>

      </div> <!-- end card -->
    </div><!--  end d-flex -->
  </div> <!-- end container -->
</template>

<script>

import sweetalert from 'sweetalert';
//import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "tony@telia.com",
      password: "Pissen30060",
      credentials:"",
    };
  },
  mounted() {
      document.querySelector(".full").style.paddingBottom = '120px';
  },
  methods: {
    
    //--------------------------------------------------
    //    Redirect to Login component
    //--------------------------------------------------
   doLogin(){
      this.$router.push("/login");
    },

  //---------------------------------------------------------
  //   Prepare and call registration in state library store
  //---------------------------------------------------------
    async submitRegister() {

      //All input fields are trimed
       const newAccount = 
        {
         name: this.name.trim(),
         email: this.email.trim(),
         password:this.password.trim(),
         status:"registered"
       };

       //Give error if any fields are empty
       if(!newAccount.name || !newAccount.email || !newAccount.password)
       {
         sweetalert({text:"Only space as input are not allowed",icon: "error"});
         return;
       }

       //Check if the registration was successful
       const status = await this.$store.dispatch("register", newAccount);
       if(status)
       {
          this.$router.push("/login");
       }
    },
  },
    computed: {

   },
};
</script>

<style scoped>
 .pb-6 {
   padding-bottom: 100px;
 }

.full {
  background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: 'Numans', sans-serif;
}
  .card{
    height: 360px;
    width: 400px;
    background-color: rgba(0,0,0,0.5) !important;
  }

  .card-header h3{
    color: white;
  }

  .input-group-prepend span{
    width: 50px;
    background-color: #007BFF;
    color: black;
    border:0 !important;
  }

  .pointer {
    cursor: pointer;
    font-weight: bold;
  }

  h1 {
    font-size: 32px;
  }

  input:focus{
    outline: 2px solid #007BFF;
}

/* 
@media screen and (max-width: 767px) {
  .container {
    width: 95% !important;
  }
}

@media (min-width: 768px) {
  h1 {
    font-size: 25px;
  }
}

@media (min-width: 992px) {
  h1 {
    font-size: 32px;
  }
}

@media (min-width: 1200px) {
  h1 {
    font-size: 42px;
  }
}  */

</style>
