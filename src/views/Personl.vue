<template>
    <div class="Personl">
        <el-container>
			<el-header style="height: 250px;">
				<el-card class="box-card" >
				    <div slot="header" class="clearfix">
				        <span>用户名：{{userInfo.username}}</span>
				        <el-button style="float: right; padding: 3px 0" type="text" @click="handleEdit">修改资料</el-button>
				    </div>
				    <h5>用户ID：{{userInfo.id}}</h5>
				    <h5>昵称：{{userInfo.nickname}}</h5>
				    <h5>角色：
				        <el-tag v-for="item in userInfo.roles" :key="item.id">{{item.authority}}</el-tag>
				    </h5>
				</el-card>
			</el-header>
			<el-main>
				<el-tabs>
				    <el-tab-pane label="博客">
				        <el-card class="box-card" v-for="item in articles" :key="item.id">
				        	<div slot="header" class="clearfix">
				        		<span>{{item.title}}</span>
				        		<el-popover trigger="hover" placement="top" style="float: right;">
				        			<p>昵称: {{ item.user.nickname }}</p>
				        			<p>角色:
				        				<el-tag v-for="item in item.user.roles" :key="item.id">{{item.authority}}</el-tag>
				        			</p>
				        			<div slot="reference" class="name-wrapper">
				        				<el-tag size="medium">作者:{{ item.user.username }}</el-tag>
				        			</div>
				        		</el-popover>
				        	</div>
				        	<div style="padding: 14px;">
				        		<span>{{item.title}}</span>
				        		<el-divider></el-divider>
				        		<h5>{{item.summary}}</h5>
				        		<el-button type="text" class="button" @click="handleclick(item.id)">查看全部</el-button>
				        		<el-divider></el-divider>
				        		<div class="bottom clearfix">
				        			<time class="time">发表时间:{{ item.createtime }}</time>
				        			<br />
				        			<time class="time">更新时间:{{ item.updatetime }}</time>
				        		</div>
				        		<el-divider></el-divider>
				        		<el-tag v-for="item in item.tags" :key="item.id"><span>{{item.name}}</span></el-tag>
				        		<el-divider></el-divider>
				        		<el-badge :value="item.commentsize" class="item">
				        			<el-button size="small">评论</el-button>
				        		</el-badge>
				        	</div>
				        </el-card>
				        <el-pagination
				        		@size-change="handleArticleSizeChange"
				        		@current-change="handleArticleCurrentChange"
				        		:current-page="currentPage"
				        		:page-sizes="[5, 10, 15, 20]"
				        		:page-size="pageSize"
				        		layout="total, sizes, prev, pager, next, jumper"
				        >
				        </el-pagination>
				    </el-tab-pane>
				    <el-tab-pane label="评论">
				        <el-card class="box-card" v-for="item in comments" :key="item.id">
				        	<div slot="header" class="clearfix">
				        		<span>博客标题：{{item.article.title}}</span>
				        	</div>
				        	<div style="padding: 14px;">
				        		<span>评论内容：{{item.content}}</span>
				        		<el-divider></el-divider>
				        		<div class="bottom clearfix">
				        			<time class="time">发表时间:{{ item.createtime }}</time>
				        			<br />
				        			<time class="time">更新时间:{{ item.updatetime }}</time>
				        		</div>
				        	</div>
				        </el-card>
				        <el-pagination
				        		@size-change="handleCommentSizeChange"
				        		@current-change="handleCommentCurrentChange"
				        		:current-page="currentPage"
				        		:page-sizes="[5, 10, 15, 20]"
				        		:page-size="pageSize"
				        		layout="total, sizes, prev, pager, next, jumper"
				        >
				        </el-pagination>
				    </el-tab-pane>
				</el-tabs>
			</el-main>
				
            

            <el-dialog title="修改资料" :visible.sync="upatedialogFormVisible" :before-close="handleClose">
                <el-form :model="updateform" label-position="top" :rules="rules">
                    <el-form-item label="昵称" prop="nickname">
                        <el-input type="text" v-model="updateform.nickname" autocomplete="off"
                                  placeholder="请输入昵称"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="upatedialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSubmitUpdate">确 定</el-button>
                </div>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    export default {
        created() {
            this.axios.get('/users/userInfo').then(response => {
                console.log(response.data);
                this.userInfo = response.data.data;
				this.axios.get('/articles/users', {
				    params: {
						userId: this.userInfo.id,
				        currentPage: this.currentPage,
				        pageSize: this.pageSize
				    }
				}).then(response => {
				    console.log(response.data);
				    this.articles = response.data.data;
				}).catch(error => {
				    console.log(error);
				})
				
				this.axios.get('/comments/users', {
				    params: {
						userId: this.userInfo.id,
				        currentPage: this.currentPage,
				        pageSize: this.pageSize
				    }
				}).then(response => {
				    console.log(response.data);
				    this.comments = response.data.data;
				}).catch(error => {
				    console.log(error);
				})
				
            }).catch(error => {
                console.log(error);
            })
        },
        name: 'Personl',
        components: {},
        data() {
            return {
				rules:{
					nickname:[
					{required: true, message: '请输入昵称', trigger: 'blur' },
					{ min: 1, max: 8, message: '长度在 1 到 8个字符', trigger: 'blur'}
				   ]
				},
                userInfo: [],
				articles: [],
				comments: [],
				currentPage: 1,
				pageSize: 5,
                upatedialogFormVisible: false,
                updateform: {
                    id: '',
                    nickname: '',
                },
            }
        },
        methods: {
			handleclick(id) {
			    this.$router.push('/articles/detail/' + id)
			},
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
			handleArticleSizeChange(val) {
			    console.log(`每页 ${val} 条`);
			    this.pageSize = val;
				this.handleArticleChange();
			},
			handleArticleCurrentChange(val) {
			    console.log(`当前页: ${val}`);
			    this.currentPage = val;
				this.handleArticleChange();
			},
			handleCommentSizeChange(val) {
			    console.log(`每页 ${val} 条`);
			    this.pageSize = val;
				this.handleCommentChange();
			},
			handleCommentCurrentChange(val) {
			    console.log(`当前页: ${val}`);
			    this.currentPage = val;
				this.handleCommentChange();
			},
			handleArticleChange(){
				this.axios.get('/articles/users', {
				    params: {
						userId: this.userInfo.id,
				        currentPage: this.currentPage,
				        pageSize: this.pageSize
				    }
				}).then(response => {
				    console.log(response.data);
				    this.articles = response.data.data;
				}).catch(error => {
				    console.log(error);
				})
			},
			handleCommentChange(){
				this.axios.get('/comments/users', {
				    params: {
						userId: this.userInfo.id,
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
            handleEdit() {
                this.upatedialogFormVisible = true;
                this.updateform.id = this.userInfo.id
                this.updateform.nickname = this.userInfo.nickname;
            },
            handleSubmitUpdate() {
                this.axios.put('/users', {
                    id: this.updateform.id,
                    nickname: this.updateform.nickname
                })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                this.upatedialogFormVisible = false;
            },
        }
    }
</script>

<style scoped>
	
</style>
