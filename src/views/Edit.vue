<template>
    <div class="Edit">
        <el-card class="box-card">
            <el-form :model="createform" label-position="top" :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="createform.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="summary">
                    <el-input v-model="createform.summary"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-select v-model="createform.tags" multiple placeholder="请选择">
                        <el-option
                                v-for="item in tagsOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="栏目" prop="category">
                    <el-select v-model="createform.category" clearable placeholder="请选择">
                        <el-option
                                v-for="item in categoryOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="createform.content"/>
                </el-form-item>
                <el-button type="primary" @click="createArticle">立即发表</el-button>
            </el-form>

        </el-card>
    </div>
</template>

<script>
    export default {
        created() {
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
        name: 'Edit',
        components: {},
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
					tags: [
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
                tagsOptions: [],
                categoryOptions: [],
                tag: [],
                createform: {
                    title: '',
                    summary: '',
                    tags: [],
                    category: [],
                    content: '',
                },

            };
        },
        methods: {
            createArticle() {
                for (let i = 0; i < this.createform.tags.length; i++) {
                    for (let j = 0; j < this.tagsOptions.length; j++) {
                        if (this.createform.tags[i] === this.tagsOptions[j].id) {
                            this.tag.push(this.tagsOptions[j])
                        }
                    }
                }
                this.axios
                    .post('/articles',
                        {
                            title: this.createform.title,
                            summary: this.createform.summary,
                            content: this.createform.content,
                            tags: this.tag,
                            categoryId: this.createform.category,
                        })
                    .then(response => {
                        console.log(response);
                        this.$message({
                            message: '发表成功',
                            type: 'success'
                        });
                    })
                    .catch(error => {
                        console.log(response);
                    })
            }

        }
    }
</script>

<style scoped>
	.Edit{
		margin: auto;
		width: 600px;
		
	}
</style>
