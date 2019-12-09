<template>
    <div class="koala-modal">
        <div class="mask">
            <div class="content" ref="contents" :style="contentSize">
                <div class="closed" @click="baseClosed">
                    X
                </div>
                <div>
                  <slot></slot>
                </div>
                <div class="button-group">
                    <button @click="baseCancel" class="cancel">取消</button>
                    <button @click="baseConfirm" class="confirm">确定</button>
                    <!--<button @click="base('confirmCallback')" class="confirm">确定</button>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Modal",
        //传this vue每个组件都是对象
        props:['self','confirmCallback','cancelCallback','closeCallback'],
        data(){
            return{
                contentSize:{}
            }
        },
        methods:{
            //接口隔离思想
            //外观模式提供更高级的统一接口
            /**
             * 基本
             * @param type
             */
            base(type){
                this.baseHidden(type)
            },
            /**
             * 关闭 icon
             */
            baseClosed(){
                this.baseHidden('closeCallback');
            },
            /**
             * 确认button
             */
            baseConfirm(){
                this.baseHidden('confirmCallback');
            },
            /**
             * 取消button
             */
            baseCancel(){
                this.baseHidden('cancelCallback');
            },
            /**
             * 基本关闭方法
             * @param type
             */
            baseHidden(type){
                const _fn = this[type] || function(){}
                _fn.call(this.self)
                this.self.modal = false;
            },
        },
        mounted(){
            //计算居中
            this.contentSize = {
                marginLeft:-this.$refs.contents.clientWidth/2+'px',
                marginTop:-this.$refs.contents.clientHeight/2+'px',
            }
        },
    }
</script>

<style lang="scss" scoped >
    .closed{
        padding-bottom: 10px;
        text-align: right;
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,0.3)
    }
    .content{
        border: 1px solid #d3d3d3;
        padding: 10px;
        left: 50%;
        top: 50%;
        background-color: #fff;
        position: fixed;
    }


</style>