<template>
    <div class="modal" :class="isModalVisible">
        <div class="modal--content">
            <span @click.prevent="hide" class="modal--closeBtn">X</span>
            <div class="modal--body rhythmMargin1">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'modal',
    data(){
        return{
            showModal: false
        }
    },

    methods:{
        show(){
            this.showModal = true
        },

        hide(){
            this.showModal = false
        }
    },

    computed:{
        isModalVisible(){
            if(this.showModal)
                return 'modal--show'
        }
    }
}
</script>

