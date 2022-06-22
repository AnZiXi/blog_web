<template>
    <div class="ArticleDetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{article.title}}</span>
                <el-popover trigger="hover" placement="top" style="float: right;">
                    <p>昵称: {{((article || {}).user|| {}).nickname}}</p>
                    <p>角色:
                        <el-tag v-for="item in ((article || {}).user|| {}).roles" :key="item.id">{{item.authority}}
                        </el-tag>
                    </p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">作者:{{((article || {}).user|| {}).username}}</el-tag>
                    </div>
                </el-popover>
            </div>
            <div>
                内容: {{article.content}}
                <el-divider></el-divider>
                摘要: {{article.summary}}
                <el-divider></el-divider>
                TAG:
                <el-tag v-for="item in article.tags" :key="item.id"><span>{{item.name}}</span></el-tag>
                <el-divider></el-divider>
                分类: {{((article || {}).category|| {}).name}}
                <el-divider></el-divider>
                发表时间: {{article.createtime}}
                <el-divider></el-divider>
                修改时间: {{article.updatetime}}
                <el-divider></el-divider>
                <el-badge :value="article.commentsize" class="item">
                    <el-button size="small">评论</el-button>
                </el-badge>
				<el-badge :value="article.readsize" class="item">
					<el-button size="small">阅读量</el-button>
				</el-badge>
                <el-divider></el-divider>
                <div>
					<el-form :model="commentForm" :rules="rules">
						<el-form-item prop="comment">
							<el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="commentForm.comment" >
                            </el-input>
						</el-form-item>
						<el-button type="primary" @click="handleComment">发送评论</el-button>
					</el-form>
                    
                    
                </div>
				<el-divider></el-divider>
				<div>
					<el-card class="box-card" v-for="item in comments" :key="item.id" style="margin-top: 10px;">
					<el-popover trigger="hover" placement="top" style="float: left;">
						<p>昵称: {{ item.user.nickname }}</p>
						<p>角色:
							<el-tag v-for="item in item.user.roles" :key="item.id">{{item.authority}}</el-tag>
						</p>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">作者:{{ item.user.username }}</el-tag>
						</div>
					</el-popover>
					<br />
					<el-divider></el-divider>
					<p>  {{item.content}}</p>
					<el-divider></el-divider>
					发表时间: {{article.createtime}}
					</el-card>
					<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[5, 10, 15, 20]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
					>
					</el-pagination>
				</div>
            </div>
        </el-card>

    </div>
</template>

<script>
    export default {
        created() {
            this.axios.get('/articles/detail', {
                params: {
                    articleId: this.$route.params.id
                }
            }).then(response => {
                console.log(response.data);
                this.article = response.data.data;
            }).catch(error => {
                console.log(error);
            })
			
			this.axios.get('/articles/comments', {
			    params: {
					articleId: this.$route.params.id,
			        currentPage: this.currentPage,
			        pageSize: this.pageSize
			    }
			}).then(response => {
			    console.log(response.data);
			    this.comments = response.data.data;
			}).catch(error => {
			    console.log(error);
			})
        },
        name: 'ArticleDetail',
        components: {},
        data() {
            return {
				rules:{
					comment:[
						{ required: true, message: '请输入评论内容', trigger: 'blur' },
						{ min: 15, max: 500, message: '长度在 15到 500 个字符', trigger: 'blur' }
					]
				},
                article: [],
				comments: [],
				commentForm:{
					comment: '',
				},
				currentPage: 1,
				pageSize: 5
            }
        },
        methods: {
            handleComment() {
                this.axios.post('/articles/comment', {
					articleId: this.$route.params.id,
					content: this.comment
		   
                })
                    .then(response => {
                        console.log(response);
                        this.$message({
                            message: '评论成功',
                            type: 'success'
                        });
                    })
                    .catch(error => {
                        console.log(response);
                        this.$message.error('评论失败');
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
			        .get('/articles/comments', {
			            params: {
			            	articleId: this.$route.params.id,
			                currentPage: this.currentPage,
			                pageSize: this.pageSize
			            }
			        })
			        .then(response => {
			            console.log(response.data);
			            this.comments = response.data.data;
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
        }

    }
</script>

<style>
</style>
