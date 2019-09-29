<template>
    <div>
        <navigation></navigation>
        <div id="backNav"><button id="backBtn" @click.prevent="$router.go(-1)">Back</button></div>
        <div class="flex-card container belowMargin">
            
            <div class="poll-pannel">
                <p class="heading__medium">Create a poll</p>
                <p v-if="loggedInUser == null" class="info">This poll will be anonymous. <a class="link" @click.prevent="$router.push('login')">Login</a> to track the poll results.</p>
            
                <div class="section rhythmMargin2">
                    <p class="txtLabel">Ask something</p>
                    <textarea v-model="question" id="poll-question" type="text"
                    placeholder="Eg. What's your favorite kind of cookie?" cols="30" rows="5" name="question"></textarea>

                    <p class="txtLabel rhythmMargin2">Poll Option</p>
                    <div v-for="(option,index) in options" :key="index" class="option-box flex-card">
                        <textarea v-model="options[index].value" type="text" class="option-box--item"
                        :placeholder="getPlaceholderText(index)"></textarea>
                        <button v-if="options.length > defaultOptionsVisible" @click="removeOption(index)" class="option-box--button">X</button>
                    </div>
                    <div>
                        <button  @click.prevent="addNewOption" class="primaryBtn">Add another option +</button>
                    </div>

                    <p class="txtLabel rhythmMargin2">Poll Tags</p>
                    
                    <div class="section--divider"></div>

                    <div class="flex-card rhythmMargin2">
                        <button class="primaryBtn primaryBtn--success" @click.prevent="submitPoll">Submit your poll</button>
                        <button class="primaryBtn primaryBtn--outline" @click.prevent="previewPoll">Preview your poll</button>
                    </div>
                    
                </div>
            </div>


            <div class="setting-pannel">
                <poll-settings @private="makePrivate" @duplicate="duplicatePolling"></poll-settings>
            </div>
        </div>

        <modal ref="modal"></modal>

    </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import PollSettings from '@/components/PollSettings.vue'
import Modal from '@/components/Modal.vue'
import firebase from 'firebase'

export default {
    name: 'new-poll',
    data(){
        return{
            defaultOptionsVisible: 2,
            optionsLimit: 4,
            question: '',
            options: [{ value: '',count: 0 }, { value: '',count: 0 }],
            privatePoll: false,
            preventDuplicateVotes: false,
            loggedInUser: null,
            publicCollection : 'public-polls',
            privateCollection: 'private-polls',
            collectionName: 'polls'
        }
    },

    methods:{
        addNewOption(){
            if(this.options.length < this.optionsLimit)
                this.options.push({ value: '',count: 0 });
            else
                window.alert('Only 4 options are allowed')
        },

        removeOption(index){
           this.options.splice(index,1);
        },

        getPlaceholderText(index){
            return 'Eg. Option ' + ++index
        },

        submitPoll(){
            var vm = this
            let collectionRef = this.collectionName
            //this.privatePoll ? collectionRef = this.privateCollection : collectionRef = this.publicCollection

             //db Reference
            let db = firebase.firestore();

            //collection Reference
            let ref = db.collection(collectionRef);

            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+'/'+time;

            //Create Data Object
            let data = {}
            if(this.question){
                data.question = this.question;
                data.options = [...this.options]
                data.privatePoll = this.privatePoll
                data.preventDuplicateVotes = this.preventDuplicateVotes
                data.voteCount = 0
                data.postedOn = dateTime
                data.userID = this.loggedInUser.uid
            }

            //add data to the collection

            if(!this.loggedInUser.uid)
                console.log("Error in adding data")
            else{
                
                ref.add({ data })
                .then(function(response){
                    window.alert('Data submited with ID : ' + response.id)
                    vm.$router.push('/poll-'+response.id)
                })
                .catch(function(error){
                    window.alert('Error : ' + error)
                })
            }
            

        },

        makePrivate(status){
            this.privatePoll = status
        },
        duplicatePolling(val){
            this.preventDuplicateVotes = val 
        },

        previewPoll(){
            this.$refs.modal.show();
        },
        checkUserLoggedIn(){
            this.loggedInUser = firebase.auth().currentUser;
        }
    },
    
    mounted(){
        this.checkUserLoggedIn();
    },
    components: {
        Navigation,
        PollSettings,
        Modal
    }
}
</script>
