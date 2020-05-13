<template>
    <div class="main-container">
        <div>{{message}}</div>
        <Button @click="showModal" type="rasied" color="custom">Clikc Me!</Button>
        <Modal v-if="modal" :self="this" :confirmCallback="confirmWay" :cancelCallback="cancelWay">
            <div>Modal组件</div>
            <div>Modal组件</div>
            <div>Modal组件</div>
            <div>Modal组件</div>
            <div>Modal组件</div>
            <div>Modal组件</div>
        </Modal>
        <Button @click="clicked('default')" type="default" color="default">Default</Button>
        <Button @click="clicked('rasied')" type="rasied" color="custom">Rasied</Button>
        <Button @click="clicked('outline')" type="outline" color="primary">Outline</Button>
        <Button @click="clicked('text')" type="text" color="custom">Text</Button>
        <div class="time-picker">
        <button click="">加</button>
        <input type="number"  value="1">
        <input type="number" value="2">
        <input type="number" value="3">
        <button click="">减</button>
        </div>
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

<style lang="scss" scoped>
.time-picker{
    display: flex;
    flex-flow: row nowrap;
    margin-top:100px;
}
.time-picker input, .time-picker button{

}
</style>