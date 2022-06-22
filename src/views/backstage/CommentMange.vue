<template>
    <div class="CommentMange">
		<el-table :data="tableData" style="width: 100%">
		    <el-table-column type="expand">
		        <template slot-scope="props">
		            <el-form label-position="left" inline class="demo-table-expand">
		                <el-form-item label="评论 ID">
		                    <span>{{ props.row.id }}</span>
		                </el-form-item>
		                <el-form-item label="评论用户ID">
		                    <span>{{ props.row.userId }}</span>
		                </el-form-item>
		                <el-form-item label="评论博客ID">
		                    <span>{{ props.row.articleId }}</span>
		                </el-form-item>
		                <el-form-item label="评论内容">
		                    <span>{{ props.row.content }}</span>
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
		    <el-table-column prop="id" label="评论ID" width="180">
		    </el-table-column>
		    <el-table-column prop="userId" label="评论用户ID" width="180">
		    </el-table-column>
		    <el-table-column prop="articleId" label="评论博客ID" width="180">
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
		
		<el-dialog title="创建评论" :visible.sync="createDialog" :before-close="handleClose">
		    <el-form :model="createComment" label-position="top" :rules="rules">
		        <el-form-item label="博客ID" prop="articleId">
		            <el-input v-model="createComment.articleId"></el-input>
		        </el-form-item>
		        <el-form-item label="内容" prop="content">
		            <el-input v-model="createComment.content"/>
		        </el-form-item>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="createDialog = false">取 消</el-button>
		        <el-button type="primary" @click="handleSubmitCreate">确 定</el-button>
		    </div>
		</el-dialog>
		
		<el-dialog title="修改评论" :visible.sync="upateDialog" :before-close="handleClose">
		    <el-form :model="updateComment" label-position="top" :rules="rules">
		        <el-form-item label="内容" prop="content">
		            <el-input v-model="updateComment.content"/>
		        </el-form-item>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="upateDialog = false">取 消</el-button>
		        <el-button type="primary" @click="handleSubmitUpdate">确 定</el-button>
		    </div>
		</el-dialog>
    </div>
</template>

<script>
	
    export default {
		created() {
		    this.axios
		        .get('/comments/page', {
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
        name: 'CommentMange',
		data() {
		    return {
				rules:{
					articleId:[
						{ required: true, message: '请输入博客ID', trigger: 'change' }
					],
					content:[
						{ required: true, message: '请输入评论内容', trigger: 'blur' },
						{ min: 15, max: 500, message: '长度在 15到 500 个字符', trigger: 'blur' }
					]
				},
		        tableData: [],
		        createComment: {
		            articleId: '',
		            content: '',
		        },
		        updateComment: {
		            id: '',
		            content: '',
		        },
		        currentPage: 1,
		        pageSize: 5,
		        createDialog: false,
		        upateDialog: false,
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
		        this.createDialog = true;
		    },
		    handleSubmitCreate() {
		        this.axios
		            .post('/articles/comment',
		                {
		                    articleId: this.createComment.articleId,
		                    content: this.createComment.content
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
		                console.log(response);
		                this.$message.error('失败');
		            })
		        this.createDialog = false;
		
		    },
		
		    handleEdit(index, row) {
		        console.log(index, row);
		        this.upateDialog = true;
		        this.updateComment.id = row.id;
		        this.updateComment.content = row.content;
		    },
		
		    handleSubmitUpdate() { 
		        this.axios.put('/comments', {
		            id: this.updateComment.id,
		            content: this.updateComment.content,
		            
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
		        this.upateDialog = false;
		
		    },
		
		    handleDelete(index, id) {
		        console.log(index, id);
				
		        this.axios
		            .delete('/articles/comment', {
		                params: {
							commentId: id,
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
		            .get('/comments/page', {
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
		    },
		}
    }
</script>

<style>
</style>
