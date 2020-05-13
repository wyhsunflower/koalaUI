<template>
    <div id="app" class="container">
        <SideBar></SideBar>
        <div class="right">
            <Header></Header>
            <div class="main">
                <transition>
                 <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import SideBar from './SideBar';
    import Header from './Header';
    export default {
        name: "app",
        components:{
            SideBar,
            Header
        },
    }
</script>

<style lang="scss" scoped>
    @import "styles/global";
    .container{
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        height: 100%;
    }
    .right{
        width: 82%;
        height: 100%;
    }
        .main{
            width: 100%;
            height: 100%;
        }
</style>