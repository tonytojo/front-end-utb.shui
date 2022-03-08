import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LogoutDelUser from '../views/LogoutDelUser.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Stream from '../views/Stream.vue'
import AddPost from '../views/AddPost.vue'
import ShowPost from '../views/ShowPost.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/delog',
    name: 'LogoutDelUser',
    component: LogoutDelUser,
    beforeEnter: (to, from, next) => 
    {
      if(!this.$store.state.userName)
      {
        next(false);
      }
      else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Stream',
    name: 'Stream',
    component: Stream,
    beforeEnter: (to, from, next) => 
    {
      if(!this.$store.state.userName)
      {
        next(false);
      }
      else {
        next();
      }
    }
  },
  {
    path: '/showpost',
    name: 'ShowPost',
    component: ShowPost,
    beforeEnter: (to, from, next) => 
    {
      if(!this.$store.state.userName)
      {
        next(false);
      }
      else {
        next();
      }
    }
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost,
    beforeEnter: (to, from, next) => 
    {
      if(!this.$store.state.userName)
      {
        next(false);
      }
      else {
        next();
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
