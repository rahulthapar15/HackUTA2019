<template>
    <div>
        <nav>
            <button v-if="!isLoggedIn" @click.prevent="signupUser" id="signup">Sign Up</button>
            <button v-if="!isLoggedIn" @click.prevent="loginUser" id="login">Login</button>
            <!-- <button v-if="isLoggedIn" @click.prevent="logoutUser"  id="logout">Logout</button> -->
             <div v-if="isLoggedIn" @click.prevent="openUserModal">
                 <avatar></avatar>
            </div>

            <button v-if="isLoggedIn" @click.prevent="getAllPolls" class=""  id="dashboard">All Polls</button>
             <button v-if="isLoggedIn" @click.prevent="$router.push('dashboard')"  id="dashboard">Dashboard</button>

            <button v-if="!isLoggedIn"  id="newPoll" @click.prevent="newPoll">Create a poll</button>
            <!-- <button id="publicPoll" @click.prevent="publicPolls">Public Polls</button> -->
            <modal ref="userModal">
                <component :is="user_settings"></component>
            </modal>
        </nav>
    </div>
</template>
<script>
import Avatar from '@/components/Avatar.vue'
import Modal from '@/components/Modal.vue'
import Settings from '../views/Settings'

import firebase from 'firebase'

export default {
    name: 'navigation',
    data(){
        return{
            isLoggedIn: false,
            loggedInUser: null,
            user_settings: 'settings',
            collectionName: 'polls'
        }
    },

    methods:{
        newPoll(){
            this.$router.push('new');
        },
        publicPolls(){
            this.$router.push('public');
        },
        openUserModal(){
           this.$refs.userModal.show();
        },

        loginUser(){
            this.$router.push('login');
        },

        signupUser(){
            this.$router.push('signup');
        },

        logoutUser(){
            firebase.auth().signOut().then(()=>{
                this.$router.replace('login')
            })
        },

    //     getMyPolls(){
    //         var vm = this
    //         let collectionRef = this.collectionName
    //         //this.privatePoll ? collectionRef = this.privateCollection : collectionRef = this.publicCollection

    //          //db Reference
    //         let db = firebase.firestore();

    //         //collection Reference
    //         var myPolls = db.collection(collectionRef).where('userID','==',this.loggedInUser.uid);

    //         myPolls.get().then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //              });
    //         }).catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    //     },

        getAllPolls(){
            this.$router.push('/allpolls');
            // var vm = this
            // let collectionRef = this.collectionName
            // //this.privatePoll ? collectionRef = this.privateCollection : collectionRef = this.publicCollection

            //  //db Reference
            // let db = firebase.firestore();

            // //collection Reference
            // let ref = db.collection(collectionRef);

            // ref.get().then(function(querySnapshot) {
            // querySnapshot.forEach(function(doc) {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            //      });
            // });
        }
    },

    components:{
        Avatar,
        Modal,
        Settings
    },

    mounted(){
        var currentUser = firebase.auth().currentUser;
        this.loggedInUser = currentUser;
        if(currentUser){
            this.isLoggedIn = true
        }
    }
}
</script>

