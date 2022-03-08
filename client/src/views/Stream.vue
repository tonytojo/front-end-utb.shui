<template>
  <div class="container-fluid full">
  
    <div class="row justify-content-center">
      <div class="col-xs-12 col-sm-10 col-md-6 text-light">
        <div class="card-header">
          <h1 class="text-light text-center">Create a new stream</h1>
        </div>

        <div class="card-body">
          <form @submit.prevent="submitHandler">
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-stream"></i>
                </span>
              </div>
              <input v-model="name" ref="namn" type="text" class="form-control" required placeholder="stream name" />
            </div>

            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-info"></i>
                </span>
              </div>
              <textarea v-model="description" class="form-control" rows="3" placeholder="description"></textarea>
            </div>

            <div class="form-group">
              <input type="submit" value="Create a new stream" class="btn-primary w-100" />
            </div>
          </form>
        </div>
      </div>
 </div>

      <div v-if="getStreams.length > 0">
         <h2 class="text-light text-center">List stream</h2>
         <p class="text-center text-light">Please Check those streams that you want to subscripbe to. 
           When you are done click the subscribe button</p>
          <div class="row mx-auto justify-content-center">
            <article class="border col-xs-12 col-sm-8 col-md-4 text-light stream-text lin-color rounded mr-2 mb-2"  :id="stream.id"  v-for="stream in getStreams" :key="stream.id">
              <button class="w-100 btn btn-primary text-center mx-auto mb-3 mt-1" @click="deleteStream($event,stream.id)">DeleteStream</button>

                <div class="row custom-control custom-checkbox text-light">
                  <input @click="checkToSubscribe($event, stream.name,stream.id)" type="checkbox" class="custom-control-input" :id="stream.name" :checked="stream.active" />
                  <label class="custom-control-label" :for="stream.name"> <span class="trim-title">Name</span> {{stream.name}}</label>
                </div>
              <p><span class="trim-title ml-1">Description:</span> {{ stream.description }}</p>
            </article>
          </div>

          <div class="text-center">
            <button class="btn btn-primary w-50 text-center mx-auto mb-3 mt-1" @click="subscribe()">Subscribe</button>
          </div>
      </div>
      <div v-else>
        <h2 class="text-light text-center pb-5">There are no streams registrated</h2>
      </div>
   
  </div>
</template>

<script>
import sweetalert from "sweetalert";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      description: "",
    };
  },
  methods: {

    //This method is called when you check/uncheck a checkbox
    //We change in the base array to match check or uncheck
    checkToSubscribe(event, name, id) {
      const item =  this.getStreams.find(item => item.name === name);

      if(event.target.checked) 
      {
        item.active = true;
        document.getElementById(id).style.backgroundColor = 'green';
      }
      else
      {
        item.active=false;
        document.getElementById(id).style.backgroundColor = 'transparent';
      }

    },
    
    //When you are done with check/uncheck all streams this method is to be called
    async subscribe() { 
       await this.$store.dispatch("subscribe",{});
    },

    //------------------------------------------------
    // Handle the action to delete stream
    //------------------------------------------------
    async deleteStream(event,id) {
      event.preventDefault();
      await this.$store.dispatch("deleteStream", id);
    },

    //------------------------------------------------
    // Handle the action create stream
    //------------------------------------------------
    async submitHandler(event) {
      event.preventDefault();

      //All input fields are trimed
      const stream = {name: this.name.trim(),description: this.description.trim()};

      //Give error if name is empty
      if (!stream.name) {
        sweetalert({ text: "Name can't be empty", icon: "error" });
        return;
      }

      await this.$store.dispatch("createStream", stream);
      await this.$store.dispatch("getAllStreams", "");
    },

    async getAllStreams() {
      const status = await this.$store.dispatch("getAllStreams", "");

      if(status)
      {
        this.getStreams.forEach(item => {
          item.active ? document.getElementById(item.id).style.backgroundColor = 'green': document.getElementById(item.id).style.backgroundColor = 'transparent';
        });
      }
    },
  },
  mounted() {
    this.getAllStreams();
  },

  computed: {
    ...mapGetters(["getStreams"]),
  },
};
</script>

<style scoped>
.position-absolute {
  right:0;
  bottom:0;
}

.lin-color {
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,0.6) 0%, rgba(63,30,84,0.6) 11%, rgba(0,212,255,0.6) 100%);
}

.stream-text p {
  font-size: 18px;
  font-weight: bold,
}

.stream-text span{
  color:red;
}

.full {
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  /* height:550px; */
  padding-bottom: 100px;
  font-family: "Numans", sans-serif;
}

h1 {
  font-size: 33px;
}

.card {
  height: 320px;
  /* margin-top: auto;
    margin-bottom: auto; */
  width: 550px;
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

input:focus {
  outline: 2px solid #007bff;
}
</style>
