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
        <Button @click="clicked('default')" type="default">Default</Button>
        <Button @click="clicked('primary')" type="primary">Primary</Button>
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
            showModal(){
                this.modal = true
            },
            confirmWay(){
                this.message = '确定'
            },
            cancelWay(){
                this.message = '取消了'
            },
            clicked(name){
                alert(name)
            },
        },
    }
</script>

<style scoped>

</style>