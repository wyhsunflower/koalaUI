<template>
    <div class="side">
        <div class="top">
            <div>img</div>
            <!--<img src="./static/img/logo.jpg">-->
        </div>
        <ul>
            <li v-for="x of lists">{{x.name}}</li>
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
                        name:'overview',
                        icon:'overview',
                    },
                    {
                        name:'button',
                        icon:'button',
                    },
                    {
                        name:'card',
                        icon:'card',
                    },
                    {
                        name:'table',
                        icon:'table',
                    },
                    {
                        name:'tab',
                        icon:'tab',
                    },
                    {
                        name:'modal',
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
</style>