<template>
    <div class="TopBar">
        <el-menu
                :default-active="'/index'"
                class="el-menu-demo"
                mode="horizontal"
                router
                background-color="white"
                style="padding-left: 150px;">
            <el-menu-item>
                <img src="../../assets/logo.png" alt="博客" style="width: 25px;height: 25px;"/>
            </el-menu-item>
            <el-menu-item index="/index">首页</el-menu-item>
            <el-menu-item index="/edit" v-if="isShowUser">发表</el-menu-item>
            <el-menu-item index="/backstage" v-if="isShowAdmin">管理后台</el-menu-item>
			<el-menu-item index="/search" class="el-icon-search" v-if="isShowAdmin">搜索</el-menu-item>
            <el-menu-item index="/personl" style="float: right;" v-if="isShowUser">{{userInfo.username}}</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        created() {
            this.axios.get('/users/userInfo').then(response =>{
                console.log(response.data);
                this.userInfo = response.data.data;
                for(let i = 0; i < this.userInfo.roles.length; i++){
                    if (this.userInfo.roles[i].name === 'ROLE_ADMIN') {
                         this.isShowAdmin = true;
                         this.isShowUser = true;
                    }else if(this.userInfo.roles[i].name === 'ROLE_USER'){
                        this.isShowUser = true;
                    }

                }

            }).catch(error =>{
                console.log(error);
            })
        },
        name: 'TopBar',
        data() {
            return {
				userInfo: [],
				isShowAdmin: false,
				isShowUser: false,
            }
        },
        methods: {}
    }
</script>

<style>
</style>
