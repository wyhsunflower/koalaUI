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
                default: 'default', // 'default', 'primary', 'custom'
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
                const buttonClass = {
                    "outline": [`koala-button-${this.type}`,`koala-button-ouline-color-${this.color}`],
                    "text": [`koala-button-${this.type}`,`koala-button-text-color-${this.color}`],
                    "default": [`koala-button-${this.type}`,`koala-button-color-${this.color}`],
                    "rasied": [`koala-button-${this.type}`,`koala-button-color-${this.color}`],
                }
                return buttonClass[this.type]
                // return [
                //     `koala-button-${this.type}`,
                //     `koala-button-color-${this.color}`,
                //     ]
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
    }
    .koala-button-rasied{
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0,0,0,.12);
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .koala-button-text{
        background-color: transparent;
        // color: $color-btn-primary;
    }
    .koala-button-outline{
        top: -1px;
        left: -1px;
        // border: 1px solid transparent;
        // color:$color-btn-primary;
        // border-color: $color-btn-primary;
    }
    .koala-button-color-default{
        background-color:$color-btn-default;
    }
    .koala-button-color-primary{
        background-color:$color-btn-primary;
    }
    .koala-button-color-custom{
        background-color:$color-btn-custom;
    }
    .koala-button-ouline-color-default{
        border: 1px solid transparent;
        color:$color-btn-default;
        border-color: $color-btn-default;
    }
    .koala-button-ouline-color-primary{
        border: 1px solid transparent;
        color:$color-btn-primary;
        border-color: $color-btn-primary;
    }
    .koala-button-ouline-color-custom{
        border: 1px solid transparent;
        color:$color-btn-custom;
        border-color: $color-btn-custom;
    }
    .koala-button-text-color-default{
        color: $color-btn-default;
    }
    .koala-button-text-color-primary{
        color: $color-btn-primary;
    }
    .koala-button-text-color-custom{
        color: $color-btn-custom;
    }
</style>