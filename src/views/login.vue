<template>
    <div class="koala-login">
        <label >用户名</label>
        <input type="text" name="username"/>
        <label >密码</label>
        <input type="password" name="password"/>
        <Button>登录</Button>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                modal:false,
                message:'没点'
            }
        },
        methods:{
            //这里的请求会发送到router/routerList/home.router.js

        },
    }
</script>

<style scoped>

</style>