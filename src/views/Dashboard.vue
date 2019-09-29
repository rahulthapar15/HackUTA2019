<template>
    <div>
        <navigation></navigation>
        <div class="container">
            <div>
                <div class="info--card belowMargin" v-if="!userPolls.length > 0">
                    <p class="bold belowMargin">Did you know?</p>
                    <p class="belowMargin">You can manage your campaign online and get realtime feedback on different outcomes.</p>

                    <button @click.prevent="$router.push('new')" class="primaryBtn">+ Create a poll</button>
                </div>
                <div v-if="userPolls.length > 0">
                    <button @click.prevent="$router.push('new')" class="primaryBtn belowMargin pull-right">+ Create a poll</button>
                    <data-table
                        :data=userPolls
                        :columns="columns"
                    ></data-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import DataTable from '@/components/DataTable.vue'

import firebase from 'firebase'

export default {
    name: 'dashboard',
    data(){
        return{
            loggedInUser: null,
            collectionName: 'polls',
            userPolls: [],
            columns: ['Polls','Posted On','Votes', 'Accessibility', 'Duplicate Allowed','Status', 'Link'] //Status : Ongoing or Ended
        }
    },

    methods:{
        getUserPolls(){
            var vm = this
            let collectionRef = this.collectionName
            //this.privatePoll ? collectionRef = this.privateCollection : collectionRef = this.publicCollection

             //db Reference
            let db = firebase.firestore();

            //collection Reference
            let ref = db.collection(collectionRef);

            ref.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                if(doc.data().data.userID == vm.loggedInUser.uid){
                    let obj = {}
                    obj.id = doc.id;
                    obj.data = doc.data().data;

                    vm.userPolls.push(obj)
                }
                 });
            });
            
        }
    },

    mounted(){
        var currentUser = firebase.auth().currentUser;
        this.loggedInUser = currentUser;
        this.getUserPolls();
    },

    components: {
        Navigation,
        DataTable
    }
}
</script>

