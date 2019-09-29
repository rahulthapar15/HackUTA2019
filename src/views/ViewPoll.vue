<template>
    <div>
        <navigation></navigation>
        <div v-if="pollData.length>0" class="container">

        <div class="belowMargin share-link">Invite people to vote: <label @click.prevent="copyLink()" class="link">{{getSharableLink()}}</label></div>
        <input class="hdnInput" type="hidden" id="shareLink" :value="getSharableLink()">

        <!-- Poll Data :<pre>{{pollData}} </pre> -->

        <div >{{hasAlreadyVoted()}}</div>
        <div class="margin--left">
            <label class="question belowMargin">{{pollData[0].data.question}}</label>

            <li class="optionlist" v-for="(option,index) in pollData[0].data.options" :key="index">
                <input class="input-btn" type="radio" :value="option.value" v-model="selectedOption">
                <label class="input-lbl">{{option.value}}</label>
            </li>
            <button class="primaryBtn" @click.prevent="submitVote">Submit Vote</button>
        </div>
        </div>
        
    </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import firebase from 'firebase'
export default {
    name: 'view-poll',
    data(){
        return{
            pollID: '',
            pollData: [],
            selectedOption: '',
            sharableLink: '',
            collectionName:'polls',
            votedFor: [],
            numberOfTimesVoted: 0,
            loggedInUser: null,
            isLoggedIn: false,
            hasVoted: false
        }
    },
    methods:{
        getPollData(){
            var vm = this
            this.pollID = window.location.href.toString().split('poll-')[1]
            firebase.firestore().collection(this.collectionName).doc(this.pollID)
                .onSnapshot(function(doc) {
                   // vm.pollData = []
                    vm.pollData.push(doc.data())
                    vm.callMultipleVoteCaseAPI();
            });
        },

        submitVote(){
            for(var option of this.pollData[0].data.options){
                if(option.value == this.selectedOption){
                    option.count +=1;
                    this.pollData[0].data.voteCount +=1;
                }
            }
            this.commitDataBack();
            
        },

        commitDataBack(){
            var vm = this
            let collectionRef = this.collectionName
            let db = firebase.firestore();

            let ref = db.collection(collectionRef);


            if(!this.loggedInUser.uid)
                console.log("Error in adding data")
            else{
                ref.doc(this.pollID).set(this.pollData[0]).then((response) => {
                    
                    vm.votedFor.push(this.pollID)
                    vm.updateUserVoteList();
                })
                
            }
            
            
        },
        updateUserVoteList(){
            var vm = this
            let collectionRef = this.collectionName
            let db = firebase.firestore();

            let ref = db.collection("userVotedFor");


            if(!this.loggedInUser.uid)
                console.log("Error in adding data")
            else{
                let data = {...this.votedFor};
                ref.doc(this.loggedInUser.uid).set({data}).then((response) => {
                    window.alert('Vote has been recorded')
                    vm.$router.push('/dashboard')
                })
                
            }
        },
        callMultipleVoteCaseAPI(){
            var vm = this
            firebase.firestore().collection("userVotedFor").doc(this.loggedInUser.uid)
                .onSnapshot(function(doc) {
                    if(doc.data() && doc.data() != 'undefined'){
                        var obj = doc.data().data;
                        Object.keys(obj).some(function(k) {
                            obj[k] === vm.pollID ? vm.hasVoted=true : vm.hasVoted=false
                        });
                    }
                    
            });
        },
        getSharableLink(){
            return window.location.href.toString();
        },
        copyLink(){
            let linkToCopy = document.querySelector('#shareLink')
            linkToCopy.setAttribute('type', 'text')
            linkToCopy.select()


          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            alert('Links has been copied ');
          } catch (err) {
            alert('Oops, unable to copy');
          }

          testingCodeToCopy.setAttribute('type', 'hidden')
          window.getSelection().removeAllRanges()
        },

        hasAlreadyVoted(){
            return this.hasVoted ? "You have already voted for this poll." : ""
        }
    },

    mounted(){
        var currentUser = firebase.auth().currentUser;
            this.loggedInUser = currentUser;
            if(currentUser){
                this.isLoggedIn = true
        }
        this.getPollData();
        this.sharableLink = window.location.href.toString();
    },

    components: {
        Navigation
    }
}
</script>
