<template>
    <div>
        <navigation></navigation>

        <div class="container">
            <data-table 
            :data=allPolls
            :columns="columns"></data-table>
        </div>
        
    </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import DataTable from '@/components/DataTable.vue'
import firebase from 'firebase'

export default {
    name: 'all-polls',
    data(){
        return{
            loggedInUser: null,
            isLoggedIn: false,
            collectionName: 'polls',
            allPolls: [],
            columns: ['Polls','Posted On','Votes', 'Accessibility', 'Duplicate Allowed','Status', 'Link'] //Status : Ongoing or Ended
        }
    },

    methods: {
        getAllPolls(){
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
                    let obj = {}
                    obj.id = doc.id;
                    obj.data = doc.data().data;

                    vm.allPolls.push(obj)
                
                 });
            });
        }
    },

    mounted(){
         var currentUser = firebase.auth().currentUser;
            this.loggedInUser = currentUser;
            if(currentUser){
                this.isLoggedIn = true
            }

            this.getAllPolls();
    },

    components:{
        DataTable,
        Navigation
    }
}
</script>
