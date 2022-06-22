<template>
    <div class="CategoryMange">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="分类ID" width="180">
            </el-table-column>
            <el-table-column prop="name" label="分类名" width="180">
            </el-table-column>
            <el-table-column prop="createtime" label="创建时间" width="180">
            </el-table-column>
            <el-table-column prop="updatetime" label="修改时间" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot="header" slot-scope="scope">
                    <el-button size="mini" @click="handleCreate">创建</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除
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

        <el-dialog title="创建分类" :visible.sync="createdialogFormVisible" :before-close="handleClose">
            <el-form :model="createform" label-position="top" :rules="rules">
                <el-form-item label="分类名" prop="name">
                    <el-input v-model="createform.name" autocomplete="off" placeholder="请输入分类名"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmitCreate">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改分类" :visible.sync="upatedialogFormVisible" :before-close="handleClose">
            <el-form :model="updateform" label-position="top" :rules="rules">
                <el-form-item label="分类名" prop="name">
                    <el-input v-model="updateform.name" autocomplete="off" placeholder="请输入分类名"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="upatedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmitUpdate">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        created() {
            this.axios
                .get('/categories/page', {
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
        },
        name: 'CategoryMange',
        data() {
            return {
				rules: {
					name: [
						{ required: true, message: '请输入栏目名', trigger: 'blur' },
					]
				},
                tableData: [],
                createdialogFormVisible: false,
                upatedialogFormVisible: false,
                createform: {
                    name: '',
                },
                updateform: {
                    id: '',
                    name: '',
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
            handleCreate() {
                this.createdialogFormVisible = true;
            },
            handleSubmitCreate() {
                this.axios.post('/categories', {
                    name: this.createform.name
                })
                    .then(response => {
                        console.log(response);
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        this.refresh();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('失败');
                    })
                this.createdialogFormVisible = false;

            },
            handleEdit(index, row) {
                console.log(index, row);
                this.upatedialogFormVisible = true;
                this.updateform.id = row.id;
                this.updateform.name = row.name;
            },
            handleSubmitUpdate() {
                this.axios.put('/categories', {
                    id: this.updateform.id,
                    name: this.updateform.name
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
                this.upatedialogFormVisible = false;

            },
            handleDelete(index, id) {
                console.log(index, id);
                this.axios
                    .delete('/categories', {
                        params: {
                            categoryId: id,
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
                    .get('/categories/page', {
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
                        this.$message.error('刷新失败');
                    })
            }
        },

    }
</script>

<style>
</style>
