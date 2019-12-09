<template>
    <div class="main-container">
        <div>{{message}}</div>
        <button @click="showModal">button</button>
        <Modal v-if="modal" :self="this" :confirmCallback="confirmWay" :cancelCallback="cancelWay">
            <div>Modal组件</div>
            <div>Modal组件</div>
            <div>Modal组件</div>
            <div>Modal组件</div>
            <div>Modal组件</div>
            <div>Modal组件</div>
        </Modal>
        <Button :self="this" @click="clickeddd" type="default">default</Button>
        <Button :self="this" @click="clickeddd" type="primary">primary</Button>
    </div>
</template>

<script>
    // import Modal from '../components/Modal/Modal.vue'
    // import Button from '../components/Button/Button.vue'
    export default {
        name: "home",
        data(){
            return{
                modal:false,
                message:'没点'
            }
        },
        // components:{
        //     Button
        // },
        methods:{
            onClick(e) {
                this.$emit('click', e);
            },
            showModal(){
                this.modal = true
            },
            confirmWay(){
                this.message = '确定'
            },
            cancelWay(){
                this.message = '取消了'
            },
            clickeddd(){
                console.log('111')
            },
        },
    }
</script>

<style scoped>

</style>