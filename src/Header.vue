<template>
    <div class="header">
        <div class="title">Title</div>
        <div class="right">
            <div class="search">search</div>
            <div class="config">name</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #000;
    }
    .title{
        width: 60%;
    }
    .right{
        width: 30%;
    }
</style>