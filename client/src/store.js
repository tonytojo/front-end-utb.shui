import { createStore } from "vuex";
import sweetalert from "sweetalert";

const store = createStore({
  state() {
    return {
        userName: "",
        email: "",
        id:"",
        streamNames:"",
        posts:[],

        streams:[],
        regEmail:"",
        regPass:"",
    };
  },
  mutations: {
  //---------------------------------------------------
  //                  All mutations
  //---------------------------------------------------

    //------------------------------------------
    //    Set current status registered in state
    //------------------------------------------
    REGISTERED(state, payload) {
      state.regEmail = payload.email;
      state.regPass = payload.password;
    },

    //------------------------------------------
    //    Set current status loggedin in state
    //------------------------------------------
    LOGGEDIN(state,payload) {
      state.userName = payload.name;
      state.email = payload.email;
      state.id = payload.id;
     
      state.streamNames = payload.streamNames;

      localStorage.setItem('jwtToken', payload.token);
    },

    //Just spacefill all property
    LOGOUT(state, payload) {
      state.userName = payload;
      state.email = payload;
      state.status= payload;
      state.streamNames = payload;
      localStorage.removeItem("jwtToken");
    },

    CREATESTREAM(state,payload) {
      let stream = {};
      stream.name = payload.name;
      stream.description = payload.description;
      stream.id = payload.id;
      stream.active = false;
      state.streams = [...state.streams, stream];
    },

    GETALLSTREAMS(state,payload) {
      state.streams = payload;
    },

    DELETESTREAM(state,payload) {
      const removeIndex = state.streams.findIndex(item => item.id === payload);
      state.streams.splice(removeIndex,1);
    },


    DELETEUSER(state,payload) {
      state.userName = payload;
      state.email= payload;
      state.id= payload;

      localStorage.removeItem("jwtToken");
    },

    GETALLPOSTS(state,payload) {
      state.posts = payload;
    },

    SUBSCRIBE(state,payload) {
      state.streamNames = payload.subscribe;
    },
  },
  //---------------------------------------------------
  //                  All actions 
  //---------------------------------------------------
  // ---------------------------------------------------------------
  //     Call backend to update the user with subscription of streams
  // ----------------------------------------------------------------
  actions: {
    async subscribe({state,commit},payload) 
    {
      const id = state.id;

      //We update the user with as new subscription to tags
      const streamNames = state.streams.filter(x=>x.active == true).map(item => {
         return item['name'];
       }).join(',');

       payload.subscribe = streamNames;

     
       //Call fetch to subscribe to streams
         //const response = await fetch("http://localhost:5000/api/user/subscribe", {
         const response = await fetch("/api/user/subscribe", {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("jwtToken")},
          body: JSON.stringify({ id, streamNames }),
        });

      //Validate if login was successful
       const data = await response.json();

       if (data.status === "success") 
       {
          //payload.subscribe = streamNames;
          commit("SUBSCRIBE", payload);
          sweetalert({text: "Successful subscription to streams", icon: "success"});
          return true; 
       } 
       else 
       {
         sweetalert({text: "Failed to subscribe streams: " + data.error, icon: "error"});
         return false;
       }
    },

    // ---------------------------------------------------------------
    //     Call backend to login a user
    //     We set status = loggedin after a successful login
    // ----------------------------------------------------------------
    async login({ commit }, payload) 
    {
      const { email, password } = payload;

      //Call fetch to login a user
      //const response = await fetch("http://localhost:5000/api/user/login", {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      //Validate if login was successful
      const data = await response.json();

       if (data.status === "success") 
       {
         payload.id = data.user.id;
         payload.name = data.user.name;
         payload.token = data.token;
         payload.streamNames = data.user.streamNames;
         commit("LOGGEDIN", payload);
         return true;
       } 
       else 
       {
         sweetalert({text: "Failed to login with email: " + data.error, icon: "error"});
         return false;
       }
    }, /* end login */

    // ---------------------------------------------------------------
    //     Call backend to register a new account
    //     We set status = registered after a successful registration
    // ----------------------------------------------------------------
    async register({ commit },payload) 
    {
      const { name, email, password } = payload;
      const streamNames = "";

      //Call fetch to register a user
      //const response = await fetch("http://localhost:5000/api/user/register", {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, streamNames }),
      });

      //Validate register if success or not
      const data = await response.json();
      
      if (data.status === "success") {
        commit("REGISTERED", payload);
        return true;
      } 
      else {
        sweetalert({text: "User " + name + " failed to be registered " + data.error, icon: "error"});
        return false;
      }
    }, /* end register */

    //Logout a user by removing the JWT from local storage
    //Remove also relevant state according to user
    logOut({ commit }, payload) {
      commit("LOGOUT", payload);
      return true;
    },

    // ---------------------------------------------------------------
    //     Call backend to create a new stream
    // ----------------------------------------------------------------
    async createStream({commit,getters}, payload) {
      const { name, description } = payload;

      const stream = payload.name;
      const streams = getters.getStreams;

      if(streams.some(x=>x.name.toLowerCase() === stream.toLowerCase())) {
        sweetalert({text:"Stream Name: " + stream + " exist already",icon: "error"});
        return;
      }
      
        //Call fetch to create a new stream
        //const response = await fetch("http://localhost:5000/api/stream/create", {
        const response = await fetch("/api/stream/create", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("jwtToken")},
          body: JSON.stringify({ name, description }),
        });

         //Validate create stream if success or not
        const data = await response.json();

        if (data.status === "success") {
          payload.id = data.stream.id;

          commit("CREATESTREAM", payload);
          return true;
        } 
        else {
          sweetalert({text: "Fail to create a stream: "+ data.error, icon: "error"});
          return false;
        }
    }, /* end createStream */

    // ---------------------------------------------------------------
    //     Call backend to get all streams
    // ----------------------------------------------------------------
    async getAllStreams({commit,state}, payload) {
     
      //Call fetch to get all streams
      //const response = await fetch("http://localhost:5000/api/stream/getall", {
      const response = await fetch("/api/stream/getall", {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("jwtToken")}
    });

      //Validate create stream if success or not
      const data = await response.json();


      if (data.status === "success") {
       
        //Convert a string to array
        const arrStreams = state.streamNames.split(",");

        //Loop throught the result and create an array of stream object
        const streams = data.result.map(item => {
            const stream = {};
            stream.name = item.name;
            stream.description = item.description;
            stream.id = item._id;
            stream.date= item.registerDate;

            //Checkmark those in base array that you have subsribe to
            if(payload !=="addpost")
            {
              arrStreams.find(item => item === stream.name) ? stream.active = true : stream.active=false;
            }

          return stream;
        });


        payload = streams;

        commit("GETALLSTREAMS", payload);

        return true;
      } 
      else {
        sweetalert({text: "Fail to get all streams: "+ data.error,icon: "error"});
        return false;
      }
    },

    // ---------------------------------------------------------------
    //     Call backend to delete a stream by id
    // ----------------------------------------------------------------
    async deleteStream({commit}, payload) {
      const id = payload;

       //Call fetch to delete a  stream
       //const response = await fetch("http://localhost:5000/api/stream/delete", {
       const response = await fetch("/api/stream/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("jwtToken")},
        body: JSON.stringify({ id }),
      });

       //Validate create stream if success or not
       const data = await response.json();

       if (data.status === "success") {
        commit("DELETESTREAM", payload);
        return true;
      } 
      else {
        sweetalert({text: "Fail to delete a stream: " + data.error ,icon: "error"});
        return false;
      }
    },

     // ---------------------------------------------------------------
    //     Call backend to delete the logged in user
    // ----------------------------------------------------------------
    async deleteUser({commit, state}, payload) {
      
      const id = state.id;

      //const response = await fetch("http://localhost:5000/api/user/delete", {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("jwtToken")},
        body: JSON.stringify({ id }),
      });

       //Validate delete to delete a user
       const data = await response.json();

       if (data.status === "success") {
        commit("DELETEUSER", payload);
        sweetalert({text: "Your account has now been deleted:" ,icon: "success"});
        return true;
      } 
      else {
        sweetalert({text: "Fail to delete user: " + data.error ,icon: "error"});
        return false;
      } 
    },
    // -------------------------------------------------------------------
    //     Call backend to create a new post with associated streams(tags)
    // -------------------------------------------------------------------
    async createPost({state}, payload) {
      const post = payload; // The actual message
      const userName = state.userName; //The user that posted the message
      
      //Create a CSV string with stream(tags)
      const suitableTagsForPost= state.streams.filter(x=>x.active == true).map(item => {
        return item['name'];
      }).join(',');


       //Call fetch to create a new post with associated streams(tags)
        //const response = await fetch("http://localhost:5000/api/post/create", {
        const response = await fetch("/api/post/create", {
         method: "POST",
         headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("jwtToken")},
         body: JSON.stringify({userName, post, suitableTagsForPost}),
       });

      //Validate the post
        const data = await response.json();
        
        if (data.status === "success") {
          sweetalert({text: "A new post has been successfully created" ,icon: "success"});
          return true;
        } 
        else {
          sweetalert({text: "Fail to create a post: " + data.error ,icon: "error"});
          return false;
        } 
    },
  
    // -------------------------------------------------------------------
    //     Call backend to fetch all posts
    // -------------------------------------------------------------------
    async getAllPosts({commit},payload) {
      //const response = await fetch("http://localhost:5000/api/post/getall", {
      const response = await fetch("/api/post/getall", {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("jwtToken")}
      });

        //Validate the get posts
        const data = await response.json();

        if (data.status === "success") {

           const sortedOnDate = data.result.sort((a, b) => {
             return (a.registerDate > b.registerDate) ? -1 : ((a.registerDate < b.registerDate) ? 1 : 0)
           });

          const posts = sortedOnDate.map(item => {
            const post = {};
            post.id = item._id;
            post.userName = item.userName;
            post.post = item.post;

            post.tags = item.suitableTagsForPost;
            post.suitableTagsForPost = item.suitableTagsForPost.split(",");
            post.date = item.registerDate;
            return post;
            });

          payload = posts;
          commit("GETALLPOSTS", payload);
          return true;
        } 
        else {
          sweetalert({text: "Fail to get all posts: " + data.error ,icon: "error"});
          return false;
        } 
    }
  },
  //---------------------------------------------------
  //                  All getters 
  //---------------------------------------------------
  getters: {
    isAutenticated: (state) => {
      return state.userName ? true : false;
    },

    getUserName: (state) => {
      return state.userName;
    },

    getSubscribeTags:(state) => {
      return state.streamNames;
    },

    getStreams:(state) => {
      const sorted = state.streams.sort((a, b) => {
        return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0)
      });

      return sorted;
    },
    getPosts:(state) => {
          // const sorted = state.posts.sort((a, b) => {
          //   return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0)
          // });

         return state.posts;
    },

    registerData:(state)=> {
      let regData = {};
      if(state.regEmail && state.regPass)
      {
        regData.email = state.regEmail;
        regData.password = state.regPass;
      }
      return regData;
    }
  },
});

export default store;
