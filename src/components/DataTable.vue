<template>
    <div>
         <!-- {{data[0]}} -->
        <!--{{columns}} -->


        <table class="belowMargin">

                <tr>
                    <th v-for="el in columns" :key="el">
                    {{el}}
                    </th>
                </tr>
                    <br>
                <tr v-for="(record,index) in data" :key="index" @click="openPoll(data[index])">
                    <td>{{ record["data"].question }}</td>
                    <td>{{ getPostedDate(record["data"].postedOn) }}</td>
                    <td>{{ record["data"].voteCount }}</td>
                    <td>{{ getRecordAccessibility(record["data"].privatePoll) }}</td>
                    <td>{{ getDuplicateStatus(record["data"].preventDuplicateVotes)}}</td>
                    <td>Ongoing</td>
                    <td>https://www.google.com</td>
                </tr>
        </table>

    </div>
</template>
<script>
export default {
    name: 'data-table',
    data(){
        return{

        }
    },

    props: {
        data: {
            type: Array,
            required: false
        },
        columns:{
            type: Array,
            required: true
        }
    },

    methods:{
        // sortBy(key){

        // },

        getRecordAccessibility(acc){
            return acc ? 'Private' : 'Public'
        },
        getDuplicateStatus(val){
            return val ? 'No' : 'Yes'
        },
        // getPollOngoingStatus(t_date){

        // },
        openPoll(data){
            this.$router.push('/poll-'+data["id"])
        },

        getPostedDate(val){
            return val.split('/')[0];
        }
    }
}
</script>