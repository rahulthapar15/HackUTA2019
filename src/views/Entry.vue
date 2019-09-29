// This is the main entry page for login and sign up components. 
<template>
    <div class="parent container">
       <div class="centered">
           <div class="flex-card">
               <div class="left-side">
                   <!-- IMAGE GOES HERE -->
               </div>

               <div class="right-side">
                 <div class="auth__container">
                   <transition name="component-fade" mode="out-in">
                       <component :is="currentComponent"></component>
                   </transition>
                 </div>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
import Login from './Login'
import SignUp from './SignUp'

export default {
    name: 'entry',
    data(){
        return{
            currentComponent: ''
        }
    },

    methods:{
        loadRequiredComponent(){
           let url = window.location.href.toString();
           if(url.indexOf('login') > 0)
                this.currentComponent = 'Login'
            else
            if(url.indexOf('signup') > 0)
                this.currentComponent = 'SignUp'
            else
                this.currentComponent = '' //ADD A 404 page

        }
    },

    mounted(){
        this.loadRequiredComponent();
    },

    watch:{
        $route(to, from){
            if(to.name != from.name){
                to.name == 'login' ? this.currentComponent='Login' : this.currentComponent = 'SignUp'
            }
        }
    },

    components: {
        Login,
        SignUp
    }
}
</script>

