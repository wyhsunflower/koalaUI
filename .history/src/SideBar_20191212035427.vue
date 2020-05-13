<template>
    <div class="side">
        <div class="top">
            <div>img</div>
            <!--<img src="./static/img/logo.jpg">-->
        </div>
        <ul class="side-list">
            <li v-for="x of lists">
                <i class="iconfont" :class="x.icon"></i>
                {{x.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SideBar",
        data(){
            return{
                lists:[
                    {
                        name:'首页',
                        icon:'icon-all',
                    },
                    {
                        name:'按钮 Button',
                        icon:'button',
                    },
                    {
                        name:'卡片 Card',
                        icon:'card',
                    },
                    {
                        name:'表格 Table',
                        icon:'table',
                    },
                    {
                        name:'标签页 Tabs',
                        icon:'tabs',
                    },
                    {
                        name:'弹框 Modal',
                        icon:'modal',
                    },
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
    .side {
        max-width: 300px;
        width: 20%;
        background: rgba(0,0,0,.8);
        height: 100%;
        color: #fff;
    }
    .top {
        height: 50px;
    }
    ul{
        list-style: none;
        padding: 0;
    }
    li{
        padding: 8px 30px;
        &:hover{background: rgba(0,0,0,.2);}
    }
</style>