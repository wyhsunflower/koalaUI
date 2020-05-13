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
        props:['type','color','diabled','size'],
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
// .koala-button{
//     background-color:#ccc;
//     min-width: 4.5rem;
//     border-radius: .25rem;
//     color: #fff;
//     font-size: .875rem;
//     font-weight: 300;
//     box-sizing: border-box;
//     position: relative;
//     -webkit-user-select: none;
//     -moz-user-select: none;
//     -ms-user-select: none;
//     user-select: none;
//     cursor: pointer;
//     outline: none;
//     border: none;
//     -webkit-tap-highlight-color: transparent;
//     display: inline-block;
//     white-space: nowrap;
//     text-decoration: none;
//     vertical-align: baseline;
//     text-align: center;
//     margin: 0;
//     min-width: 64px;
//     line-height: 36px;
//     padding: 0 16px;
//     border-radius: 4px;
//     overflow: visible;
//     transform: translate3d(0, 0, 0);
//     transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
// }
    .koala-button-default{
        background-color:$color-btn-default;
    }
    .koala-button-primary{
        background-color:$color-btn-primary;
    }
</style>