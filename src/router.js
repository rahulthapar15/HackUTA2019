import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import NewPoll from './views/NewPoll.vue'
import Entry from './views/Entry.vue'
import Dashboard from './views/Dashboard.vue'

import firebase from  'firebase';

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/login',
      name: 'login',
      component: Entry
    },
    {
      path: '/signup',
      name: 'signup',
      component: Entry
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name:'new',
      component: NewPoll
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/poll-*',
      name: 'view-poll',
      // route level code-splitting
      // this generates a separate chunk (view-poll.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "view-poll" */ './views/ViewPoll.vue')
    },
    {
      path: '/allpolls',
      name: 'all-polls',
      component: () => import(/* webpackChunkName: "all-poll" */ './views/AllPolls.vue')
    }
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some( record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser){
    next('login');
   }//else if(!requiresAuth && currentUser){
  //   next('dashboard');
  // }
   else{
    next();
  }
});

 export default router;
