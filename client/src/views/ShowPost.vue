<template>
  <div class="container-fluid full">
    <div class="row justify-content-center">
      <div class="col-xs-12 col-sm-10 col-md-6 text-light">
        <div class="card-header">
          <h1 class="text-light text-center">Show posts</h1>
        </div>
      </div>
    </div>

    <div>
      <div class="row mx-auto justify-content-center">
        <div
          class="border col-xs-12 col-sm-8 col-md-4 text-dark stream-text bg-light rounded mr-2 mb-2 p-4 position-relative" v-for="post in allPost" :key="post.id">
          <article>{{ post.post }} <br /><br /> 
          Author:{{ post.userName }} <br>
          Date:{{convertISO(post.date)}}
          </article>

          <div class="position-absolute text-success">
            <span class="pr-2" v-for="tag in post.suitableTagsForPost" :key="tag">
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button
          class="btn btn-primary w-50 text-center mx-auto mb-3 mt-1"
          @click="CreatePost()"
        >
          CreatePost
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      subscribeTags: [],
      postPren:[],
      allPost:[]
    };
  },

  methods: {
    async CreatePost() {
      this.$router.push("/addpost");
    },
    
   convertISO(date) {
      const dateStr = date,
        [yyyy,mm,dd,hh,mi] = dateStr.split(/[/:\-T]/);
        return (`${yyyy}-${mm}-${dd} ${hh}:${mi}`)
   },

    async getAllPosts() {
      await this.$store.dispatch("getAllPosts", "");
      this.subscribeTags = this.getSubscribeTags.split(",");

       //Loop through all tags that this user is subscribing to
       this.subscribeTags.forEach(tag => 
       {
          //Loop through all the post
          for (let index = this.getPosts.length - 1; index >= 0; index--) 
          {
            const post = this.getPosts[index];

            //Check if we subscribe to the associated tags for this post
            //if yes add the post to postPren and del the post from main post
            if(post.tags.includes(tag))
            {
               //Add post only if this post doesn't exit in postPren
               const idx = this.postPren.findIndex(x=>x.id === post.id);
               if (idx == -1)
               {
                  this.postPren = [...this.postPren, post];
                  this.getPosts.splice(index, 1);
               }
            }    
          }
       });

      this.postPren = this.postPren.sort((a, b) => {
         return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0)
       });

        this.allPost = this.postPren.concat(this.getPosts);
    },
  },

  mounted() {
    this.getAllPosts();
  },

  computed: {
    ...mapGetters(["getPosts", "getSubscribeTags"]),
  },
};
</script>

<style scoped>
.position-absolute {
  right: 0;
  bottom: 0;
}

.lin-color {
  /* background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0.6) 0%,
    rgba(63, 30, 84, 0.6) 11%,
    rgba(0, 212, 255, 0.6) 100%
  ); */
}

.stream-text p {
  font-size: 18px;
  font-weight: bold;
}

.full {
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  /* height:550px; */
  padding-bottom: 450px;
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
