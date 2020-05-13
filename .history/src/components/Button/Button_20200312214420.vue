<template>
    <component
            class="mc-button"
            
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
.koala-button{
    padding: 8px 10px;
    background-color:#ccc;
    min-width: 4.5rem;
    border-radius: .25rem;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: .875rem;
    font-weight: 300;
}
    .koala-button-default{
        background-color:$color-btn-default;
    }
    .koala-button-primary{
        background-color:$color-btn-primary;
    }
</style>