<template>
    <div>
        <p class="heading__medium">Sign in</p>
        <p class="auth__info">Enter your details below</p>

        <div class="rhythmMargin2">
            <p class="auth__txtLabel">Email</p>
            <input v-model="email" class="auth__txtInput" type="text" placeholder="name@domain.com">

            <p class="rhythmMargin1 auth__txtLabel">Password</p>
            <input v-model="password" class="auth__txtInput" type="password" placeholder="Enter your password">

             <p class="pull-right rhythmMargin1 link">Forgot Password?</p>

            
            <button @click.prevent="signInUser" :class="signInDisabled" class="rhythmMargin3 primaryBtn primaryBtn__small">Sign in</button>

            <p class="rhythmMargin1 auth__info">Don't have an account? <a @click.prevent="$router.push('signup')" class="link">Sign Up</a></p>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data(){
        return{
            awaitResponse: false,
            email: '',
            password: ''
        }
    },

    methods: {
        signInUser(){
            var vm = this
            let user =  {}

            vm.awaitResponse = true
            user.email = this.email
            user.password = this.password

            if(user.email && user.password){
                let fireInstance = firebase.auth()

                fireInstance.signInWithEmailAndPassword(user.email, user.password)
                .then(function(response){
                    vm.$router.replace('dashboard')
                    vm.awaitResponse = false
                }, function(err){
                    window.alert(err)
                    vm.awaitResponse = false
                })
            }
        }
    },

    computed: {
        signInDisabled(){
            if(this.awaitResponse){
                return 'loading'
            }
        }
    }
}
</script>
<style>
 /* styling is in _entry.scss */
</style>

