<template>
  <div class="container-fluid full">
    
    <div class="col-xs-12 col-sm-6 text-light mx-auto pb-6">
      <h1 class="text-center">Login</h1>
      <p>This website is all about network sequrity. We use JWT(JSON Web Token) is an open standard used to share security information between two parties — a client and a server.
        You must first register if you have no account before you can use this web site. 
        After a successful registration you can login with your email and password
        You can also remove youself from db.
        You enter a post to a specified named stream. </p>
    </div>

    <div class="d-flex justify-content-center h-100 pb-6">
      <div class="card mt-4">
        <div class="card-header">
          <h3 class="text-center">Login to SHUI</h3>
        </div>

        <div class="card-body">
          <form @submit.prevent="submitLogin">
            
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

            <!-- Submit Login -->
            <div class="form-group">
              <input type="submit" value="Login" class="btn-primary w-100" />
            </div>
          </form>
        </div>

        <!-- Show suitable text for Login -->
        <div className="card-footer mb-5">
          <div className="d-flex justify-content-center links text-light">
            Don't have an account? &nbsp;
            <span @click="doRegister" className="text-primary pointer">
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import sweetalert from 'sweetalert';
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "tony@telia.com",
      password: "Pissen30060",
      credentials:"",
    };
  },
  mounted() {
    if(!this.email)
    {
      this.email = this.registerData.email;
      this.password = this.registerData.password;
    }
  },
  methods: {

    //----------------------------------------------------
    //    Redirect to register component
    //----------------------------------------------------
    doRegister() {
       this.$router.push("/register");
    },

    //------------------------------------------------
    //      Prepare to handle the Login
    //------------------------------------------------
    async submitLogin(event) 
    {
       event.preventDefault();

      //All input fields are trimed
      const credentials = 
      {
        email: this.email.trim(),
        password:this.password.trim(),
        status:"loggedin"
      };

      //Give error if any fields are empty
       if(!credentials.email || !credentials.password)
       {
         sweetalert({text:"Invalid input",icon: "error"});
         return;
       }

      //Check if login was successful
       const status = await this.$store.dispatch("login", credentials); 
       if(status)
       {
         this.$router.push("/showpost");
       }
    },

  },
    computed: {
     ...mapGetters(["registerData"])
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
    height: 320px;
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
