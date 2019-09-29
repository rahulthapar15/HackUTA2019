import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app =''

var firebaseConfig = {
  apiKey: "AIzaSyBl4CYw2YDA3msqP-VakaP7OHMTn_hNVu8",
  authDomain: "vupoll.firebaseapp.com",
  databaseURL: "https://vupoll.firebaseio.com",
  projectId: "vupoll",
  storageBucket: "",
  messagingSenderId: "948423490436",
  appId: "1:948423490436:web:ca3e6fc67ca3f525"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() =>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});
