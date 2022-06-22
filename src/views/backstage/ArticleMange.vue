<template>
    <div class="ArticleMange">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="博客 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="博客标题">
                            <span>{{ props.row.title }}</span>
                        </el-form-item>
                        <el-form-item label="分类">
                            <span>{{ props.row.category.name }}</span>
                        </el-form-item>
                        <el-form-item label="tags">
                            <el-tag v-for="item in props.row.tags" :key="item.id"><span>{{item.name}}</span></el-tag>
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
            <el-table-column prop="id" label="博客ID" width="180">
            </el-table-column>
            <el-table-column prop="title" label="博客标题" width="180">
            </el-table-column>
            <el-table-column prop="category.name" label="分类" width="180">
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

        <el-dialog title="创建博客" :visible.sync="createDialog" :before-close="handleClose">
            <el-form :model="createArticle" label-position="top" :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="createArticle.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="summary">
                    <el-input v-model="createArticle.summary"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tag">
                    <el-select v-model="createArticle.tag" multiple placeholder="请选择">
                        <el-option
                                v-for="item in tagsOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <el-select v-model="createArticle.category" clearable placeholder="请选择">
                        <el-option
                                v-for="item in categoryOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="createArticle.content"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createDialog = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmitCreate">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改博客" :visible.sync="upateDialog" :before-close="handleClose">
            <el-form :model="updateArticle" label-position="top" :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="updateArticle.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="summary">
                    <el-input v-model="updateArticle.summary"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tag">
                    <el-select v-model="updateArticle.tag" multiple placeholder="请选择">
                        <el-option
                                v-for="item in tagsOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <el-select v-model="updateArticle.category" clearable placeholder="请选择">
                        <el-option
                                v-for="item in categoryOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="updateArticle.content"/>
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
                .get('/articles/page', {
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
                .get('/tags/all')
                .then(response => {
                    console.log(response.data);
                    this.tagsOptions = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })

            this.axios
                .get('/categories/all')
                .then(response => {
                    console.log(response.data);
                    this.categoryOptions = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        name: 'ArticleMange',
        data() {
            return {
				rules:{
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' },
						{ min: 5, max:50 , message: '长度在 5 到 50个字符', trigger: 'blur' }
					],
					summary: [
						{ required: true, message: '请输入摘要', trigger: 'blur' },
						{ min: 15, max:250 , message: '长度在 15 到 250个字符', trigger: 'blur' }
					],
					tag: [
						{type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change'}
					],
					category: [
						{required: true, message: '请选择栏目', trigger: 'change'}
					],
					content: [
						{ required: true, message: '请输入内容', trigger: 'blur' },
						{ min: 15, max:5000 , message: '长度在 15 到 5000个字符', trigger: 'blur' }
					],
				},
                tableData: [],
                tagsOptions: [],
                categoryOptions: [],
                tags: [],
                tagIds: [],
                createArticle: {
                    title: '',
                    summary: '',
                    content: '',
                    tag: [],
                    category: [],
                },
                updateArticle: {
                    id: '',
                    title: '',
                    summary: '',
                    content: '',
                    tag: [],
                    category: [],
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
                for (let i = 0; i < this.createArticle.tag.length; i++) {
                    for (let j = 0; j < this.tagsOptions.length; j++) {
                        if (this.createArticle.tag[i] === this.tagsOptions[j].id) {
                            this.tags.push(this.tagsOptions[j])
                        }
                    }
                }
                this.axios
                    .post('/articles',
                        {
                            title: this.createArticle.title,
                            summary: this.createArticle.summary,
                            content: this.createArticle.content,
                            categoryId: this.createArticle.category,
                            tags: this.tags
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
                this.updateArticle.id = row.id;
                this.updateArticle.title = row.title;
                this.updateArticle.summary = row.summary;
                this.updateArticle.content = row.content;
                this.updateArticle.category = row.category.id
                for (let i = 0; i < row.tags.length; i++) {
                    this.tagIds.push(row.tags[i].id)
                }
                this.updateArticle.tag = this.tagIds;
            },

            handleSubmitUpdate() {

                for (let i = 0; i < this.updateArticle.tag.length; i++) {
                    for (let j = 0; j < this.tagsOptions.length; j++) {
                        if (this.updateArticle.tag[i] === this.tagsOptions[j].id) {
                            this.tags.push(this.tagsOptions[j])
                        }
                    }
                }
                this.axios.put('/articles', {
                    id: this.updateArticle.id,
                    title: this.updateArticle.title,
                    summary: this.updateArticle.summary,
                    content: this.updateArticle.content,
                    categoryId: this.updateArticle.category,
                    tags: this.tags
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
                    .delete('/articles', {
                        params: {
                            articleId: id,
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
                    .get('/articles/page', {
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
