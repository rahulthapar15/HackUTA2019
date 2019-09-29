<template>
    <div>
        <ul v-for="(option,index) in options" :key="index">
            <li class="item" @click.prevent="settingAction(option.key)">{{option.val}}</li>
        </ul>
    </div>
</template>
<script>
import firebase from 'firebase'

export default {
    name: 'settings',
    data(){
        return{
            options: [
                {
                    key: 'theme',
                    val: 'Switch Theme'
                },
                {
                    key: 'change-pass',
                    val: 'Change Password'
                },
                {
                    key: 'logout',
                    val: 'Logout'
                }
            ]
        }
    },

    methods:{
        settingAction(action){
            switch(action){
                case 'theme' : this.toggleTheme();
                break;

                case 'change-pass' : this.changePassword();
                break;

                case 'logout' : this.logoutUser();
                break;
            }
        },

        toggleTheme(){
            window.alert('Change theme')
        },

        changePassword(){
            window.alert('Change password')
        },

        logoutUser(){
            firebase.auth().signOut().then(()=>{
                this.$router.replace('login')
            })
        }
    }
}
</script>