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
        // ['type','color','diabled','size'],
        props: {
            type:{
                type: String,
                default:'default', // 'default', 'rasied , 'text', 'outline'
            },
            color:{
                type: String,
                default: 'default', // 'default', 'primary', 'accent', 'green', 'orange', or 'red'
            },
            size:{
                type: String,
                default: 'normal' // 'small', 'normal', 'large','custom'
            },
            disabled: {
                type: Boolean,
                default: false
            }   
        },
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
        box-shadow: 0 0 0 0 rgba(0,0,0,.2), 0 0 0 0 rgba(0,0,0,.14), 0 0 0 0 rgba(0,0,0,.12);
        background-color:$color-btn-default;
    }
    .koala-button-rasied{
        background-color:$color-btn-primary;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0,0,0,.12);
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .koala-button-text{
        background-color:$color-btn-default;
    }
    .koala-button-outline{
        top: -1px;
        left: -1px;
        border: 1px solid transparent;
        background-color:$color-btn-primary;
    }
</style>