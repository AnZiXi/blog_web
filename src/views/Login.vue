<template>
    <div class="Login">
        <el-container>
            <el-card class="box-card">
                <el-form class="login-container" label-position="left"
                         label-width="0px" :model="form" :rules="rules" ref="form">
                    <h3 class="login_title">博客管理系统</h3>
                    <el-form-item prop="username">
                        <el-input type="text" v-model="form.username"
                                  auto-complete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="form.password"
                                  auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item style="width: 100%">
                        <el-button type="primary" size="medium" v-on:click="login">登录</el-button>
                        <el-button type="primary" size="medium" v-on:click="register">注册</el-button>
                        <el-button type="primary" size="medium" v-on:click="anonymous">随便看看</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
				rules:{
					username:[
						{required: true, message: '请输入账号', trigger: 'blur' },
						{min: 3, max: 10, message: '长度在 3到 10 个字符', trigger: 'blur'},
						{
							required: true,
							pattern: /^[a-zA-Z][a-zA-Z0-9]+$/,
							message: '账户格式错误',
							trigger: 'blur'
						}
					],
					password:[
						{required: true, message: '请输入密码', trigger: 'blur' },
						{min: 6, max: 16, message: '长度在 6到 16 个字符', trigger: 'blur'},
						{
							required: true,
							pattern: /^[A-Za-z0-9]+$/,
							message: '密码格式错误',
							trigger: 'blur'
						}
					]
				},
            }
        },
        methods: {
            login() {
                var data = new FormData();
                data.append("username", this.form.username);
                data.append("password", this.form.password)
                this.axios
                    .post('/login', data)
                    .then(response => {
                        console.log(response);
                        if (response.data.message == 'success') {
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            this.$router.replace({path: '/home'})
                        }

                    })
                    .catch(error => {
                        console.log(response);
                        this.$message.error('登录失败');
                    })
            },
            register() {
                this.$router.replace({path: '/register'})
            },
            anonymous() {
                this.$router.replace({path: '/home'})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.box-card{
		margin: auto;
	}
</style>
