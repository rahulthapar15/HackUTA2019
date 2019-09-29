<template>
    <div>
        <p class="heading__small rhythymMargin1">Poll Settings</p>
        <div class="rhythmMargin2">
            <div class="rhythmMargin1" v-for="(setting,index) in settingOptions" :key="index">
                <label class="toggle-switch">
                    <input @click="toggleSetting(settingOptions[index].id)" :disabled="isSettingDisabled(settingOptions[index].id)" type="checkbox">
                    <span  class="slider"></span>
                </label>
                <span class="info smallText" :class="isSettingEnabled(settingOptions[index].id)">{{settingOptions[index].text}}</span>
            </div>

            <div class="link-share rhythmMargin1" v-if="settingOptions[1].status">
                Submit the poll to get the sharable link.
            </div>
            <!-- NEEDS OPTIMISATION -->
             <!-- <div class="info--box rhythmMargin1" v-if="settingOptions[1].status">
                 <p class="info">LINK</p>
            </div>  -->
        </div>
    </div>
</template>
<script>
import firebase from 'firebase'

export default {
    name: 'poll-settings',
    data(){
        return{
            settingOptions: [
                {
                    id: 'duplicate-poll',
                    text: "Restrict duplicate vote cast.",
                    status: false
                },
                {
                    id: 'accessibility',
                    text: 'Make this poll private',
                    status: false
                }
            ],
            loggedInUser: null,
        }
    },

    methods:{
        toggleSetting(id){
            switch(id){
                case 'duplicate-poll' :
                    this.settingOptions[0].status = !this.settingOptions[0].status
                    this.$emit('duplicate',this.settingOptions[0].status)
                 break;

                case 'accessibility' : 
                    this.settingOptions[1].status = !this.settingOptions[1].status
                    this.$emit('private',this.settingOptions[1].status)
                    break;
            }
        },
        isSettingDisabled(id){
            switch(id){
                case 'duplicate-poll' :
                    if(this.loggedInUser == null)
                        return true;
                    else
                        return false;
                     
                     break;

                case 'accessibility' : return false; break;
            }
        },
        isSettingEnabled(id){
            switch(id){
                case 'duplicate-poll' :
                    if(this.settingOptions[0].status)
                        return 'info--active' 
                 break;

                case 'accessibility' : 
                    if(this.settingOptions[1].status)
                        return 'info--active' 
                    break;
            }
        },
        checkUserLoggedIn(){
            this.loggedInUser = firebase.auth().currentUser;
        },
    },


    mounted(){
        this.checkUserLoggedIn();
    }
}
</script>
