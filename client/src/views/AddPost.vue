<template>
  <div class="container-fluid full">
    <div class="row justify-content-center">
      <div class="col-xs-12 col-sm-10 col-md-6 text-light">
        <div class="card-header">
          <h1 class="text-light text-center">Create a new post</h1>
        </div>

        <div class="card-body">
          <form @submit.prevent="submitPost">
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-info"></i>
                </span>
              </div>
              <textarea v-model="post" class="form-control" rows="4" placeholder="Add post here"></textarea>
            </div>

            <div v-if="getStreams.length > 0">
              <h2 class="text-light text-center">List tags</h2>
              <p class="text-center text-light">Please Check those tags that are suitable for the post.</p>
              <div class="row mx-auto justify-content-center">
                <div class="border col-xs-12 col-sm-8 col-md-4 text-light stream-text lin-color rounded mr-2 mb-2" :id="stream.id" v-for="stream in getStreams" :key="stream.id">
                  <div class="row custom-control custom-checkbox text-light">
                    <input @click="checkToFitPost($event, stream.name, stream.id)" type="checkbox" class="custom-control-input" :id="stream.name" :checked="stream.active"/>
                    <label class="custom-control-label" :for="stream.name"><span class="trim-title">Name</span>{{ stream.name }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h2 class="text-light text-center pb-5">
                There are no tags registrated
              </h2>
            </div>

            <div class="form-group">
              <input type="submit" value="Create a new post" class="btn-primary w-100" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sweetalert from "sweetalert";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      post: "",
    };
  },
  methods: {
    //Is called when you check because the tag match the post
    checkToFitPost(event, name, id) {

      const item = this.getStreams.find((item) => item.name === name);

      if (event.target.checked) 
      {
        item.active = true;
        document.getElementById(id).style.backgroundColor = "green";
      } 
      else 
      {
        item.active = false;
        document.getElementById(id).style.backgroundColor = "transparent";
      }
    },

    //------------------------------------------------
    // Handle the action create stream
    //------------------------------------------------
    async submitPost(event) {
      event.preventDefault();

      //Give error if name is empty
      if (!this.post) {
        sweetalert({ text: "Post can't be empty", icon: "error" });
        return;
      }

      await this.$store.dispatch("createPost", this.post);
    },

    async getAllStreams() {
      const status = await this.$store.dispatch("getAllStreams", "addpost");

      if (status) {
        this.getStreams.forEach((item) => {
          
          item.active
            ? (document.getElementById(item.id).style.backgroundColor = "green")
            : (document.getElementById(item.id).style.backgroundColor =
                "transparent");
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
  right: 0;
  bottom: 0;
}

.lin-color {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0.6) 0%,
    rgba(63, 30, 84, 0.6) 11%,
    rgba(0, 212, 255, 0.6) 100%
  );
}

.stream-text p {
  font-size: 18px;
  font-weight: bold;
}

.stream-text span {
  color: red;
}

.full {
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  /* height:550px; */
  padding-bottom: 150px;
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
