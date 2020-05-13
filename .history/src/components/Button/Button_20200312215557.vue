<template>
    <component
            class="koala-button"
            :class="buttonType"
            is="button"
            @click="onClick"
    >
        <slot></slot>
    </component>
</template>

<script>
    //type color icon
    export default {
        name: "Button",
        props:['self','type','color'],
        data(){
            return{
            }
        },
        components:{

        },
        computed:{
            buttonType(){
                return `koala-button-${this.type}`
            },
        },
        methods:{
            onClick(e){
                this.$emit('click', e);
            }
        },
        mounted(){
        },
    }
</script>

<style lang="scss" scoped >
    @import "../../styles/global.scss";

    .koala-button-default{
        background-color:$color-btn-default;
    }
    .koala-button-primary{
        background-color:$color-btn-primary;
    }
</style>