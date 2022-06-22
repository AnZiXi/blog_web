<template>
    <div class="UserMange">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <span>{{ props.row.username }}</span>
                        </el-form-item>
                        <el-form-item label="用户昵称">
                            <span>{{ props.row.nickname }}</span>
                        </el-form-item>
                        <el-form-item label="用户角色">
                            <el-tag v-for="item in props.row.roles" :key="item.id"><span>{{item.authority}}</span>
                            </el-tag>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ props.row.createtime }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ props.row.updatetime }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户 ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="username">
            </el-table-column>
            <el-table-column
                    label="用户昵称"
                    prop="nickname">
            </el-table-column>
            <el-table-column label="操作">
                <template slot="header" slot-scope="scope">
                    <el-button size="mini" @click="handleCreateUser">创建</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEditUser(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDeleteUser(scope.$index, scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>

        <el-dialog title="创建用户" :visible.sync="createUserVisible" :before-close="handleClose">
            <el-form :model="createUser" label-position="top" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="createUser.username" autocomplete="off"
                              placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="createUser.password" autocomplete="off"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmitCreateUser">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改用户" :visible.sync="updateUserVisible" :before-close="handleClose">
            <el-form :model="updateUser" label-position="top" :rules="rules">
                <el-form-item label="昵称" prop="nickname">
                    <el-input type="text" v-model="updateUser.nickname" autocomplete="off"
                              placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="updateUser.value" multiple placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmitUpdateUser">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        created() {
            this.axios
                .get('/users/page', {
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.tableData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })
            this.axios
                .get('/roles/all')
                .then(response => {
                    console.log(response.data);
                    this.options = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        name: 'UserMange',
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
					],
					nickname:[
						{required: true, message: '请输入昵称', trigger: 'blur' },
						{ min: 1, max: 8, message: '长度在 1 到 8个字符', trigger: 'blur'}
					]
				},
                tableData: [],
                options: [],
                createUserVisible: false,
                updateUserVisible: false,
                updateUserRolesVisible: false,
                createUser: {
                    username: '',
                    password: ''
                },
                updateUser: {
                    id: '',
                    nickname: '',
                    value: [],
                },
                currentPage: 1,
                pageSize: 5
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            handleCreateUser() {
                this.createUserVisible = true;
            },
            handleSubmitCreateUser() {
                this.axios.post('/users', {
                    username: this.createUser.username,
                    password: this.createUser.password
                })
                    .then(response => {
                        console.log(response);
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('失败');
                    })
                this.createUserVisible = false;

                this.refresh();
            },
            handleEditUser(index, row) {
                console.log(index, row);
                this.updateUserVisible = true;
                this.updateUser.id = row.id
                this.updateUser.nickname = row.nickname;
                let roleIds = []
                for (let i = 0; i < row.roles.length; i++) {
                    roleIds.push(row.roles[i].id)
                }
                this.updateUser.value = roleIds;
            },
            handleSubmitUpdateUser() {
                let roles = []
                for (let i = 0; i < this.updateUser.value.length; i++) {
                    for (let j = 0; j < this.options.length; j++) {
                        if (this.updateUser.value[i] === this.options[j].id) {
                            roles.push(this.options[j])
                        }
                    }
                }
                this.axios.put('/users', {
                    id: this.updateUser.id,
                    nickname: this.updateUser.nickname,
                    roles: roles
                })
                    .then(response => {
                        console.log(response);
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.refresh();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('失败');
                    })
                this.updateUserVisible = false;
            },
            handleDeleteUser(index, id) {
                console.log(index, id);
                this.axios
                    .delete('/users', {
                        params: {
                            userId: id,
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.refresh();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('失败');
                    })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.refresh();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.refresh();
            },
            refresh() {
                this.axios
                    .get('/users/page', {
                        params: {
                            currentPage: this.currentPage,
                            pageSize: this.pageSize
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                        this.tableData = response.data.data;
                        this.$message({
                            message: '刷新成功',
                            type: 'success'
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('刷新失败');
                    })
            }
        },

    }
</script>

<style scoped>

</style>
