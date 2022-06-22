<template>
    <div class="Register">
        <el-container>
            <el-card class="box-card">
                <el-form label-position="left"
                         label-width="0px" :model="form" :rules="rules" ref="form">
                    <h3>博客管理系统</h3>
                    <el-form-item>
                        <el-input type="text" v-model="form.username"
                                  auto-complete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" v-model="form.password"
                                  auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item style="width: 100%">
                        <el-button type="primary" size="medium" v-on:click="register">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
				rules:{
					username:[
						{required: true, message: '请输入账号', trigger: 'blur' },
						{min: 3, max: 10, message: '长度在 3到 10 个字符', trigger: 'blur'},
						{
							required: true,
							pattern: /^[a-zA-Z][a-zA-Z0-9_]+$/,
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
                form: {
                    username: '',
                    password: ''
                },
            }
        },
        methods: {
            register() {
                this.axios.post('/users', {
                    username: this.form.username,
                    password: this.form.password
                })
                    .then(response => {
                        console.log(response);
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                    })
                    .catch(error => {
                        console.log(response);
                        this.$message.error('注册失败');
                    })
            }
        }
    }
</script>

<style scoped>
	.box-card{
		margin: auto;
	}
</style>
