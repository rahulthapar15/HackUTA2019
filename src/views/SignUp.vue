<template>
     <div>
        <p class="heading__medium">Sign up for free!</p>
        <p class="auth__info">Takes less than a minute.</p>

        <div class="rhythmMargin2">
            <p class="auth__txtLabel">Email</p>
            <input v-model="email" class="auth__txtInput" type="email" placeholder="name@domain.com">

            <p class="rhythmMargin1 auth__txtLabel">Password</p>
            <input v-model="password" class="auth__txtInput" type="password" placeholder="Enter your password">

            <p class="rhythmMargin1 auth__txtLabel">Confirm Password</p>
            <input v-model="c_password" class="auth__txtInput" type="password" placeholder="Re-Enter your password">

            <br>
            <button :class="signupDisabled" @click.prevent="createUser" class=" rhythmMargin1 primaryBtn primaryBtn--success primaryBtn__small">Sign up</button>

            <p class="rhythmMargin1 auth__info">Already have an account? <a @click.prevent="$router.push('login')" class="link">Sign in</a></p>
        </div>
     </div>
</template>
<script>
import firebase from 'firebase';

export default {
    name: 'sign-up',
    data(){
        return{
            awaitResponse: false,
            email :'',
            password: '',
            c_password: ''
        }
    },

    methods: {
        createUser(){
            if(this.password != this.c_password){
                window.alert('password do not match');
            }else{
                let user = {};
                user.email = this.email
                user.password = this.password
                
                this.registerNewUser(user);
            }
        },
        registerNewUser(user){
            var vm = this
            vm.awaitResponse = true;
            let fireInstance = firebase.auth();
            fireInstance.createUserWithEmailAndPassword(user.email, user.password)
            .then(function(response){
                vm.$router.replace('dashboard')
                vm.awaitResponse = false;
            }, function(err){
                window.alert(err);
                vm.awaitResponse = false;
            })
        }
    },

    computed: {
        signupDisabled(){
            if(this.awaitResponse){
                return 'loading'
            }
        }
    }
}
</script>

