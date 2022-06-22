<template>
	<div class="CommentSearch">
		<el-container>
				<el-input
				style="display: inline-block;width: 300px;"
				  placeholder="请输入评论内容"
				  v-model="input"
				  clearable>
				</el-input>
				<span style="display: inline-block"><el-button icon="el-icon-search" circle @click="handleSearch" ></el-button></span>
			<div v-if="isSearch">
				<el-card class="box-card" v-for="item in comments" :key="item.id">
					<div slot="header" class="clearfix">
						<el-popover trigger="hover" placement="top">
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
						<span>{{item.article.title}}</span>
						<el-divider></el-divider>
						<span>{{item.content}}</span>
						<el-divider></el-divider>
						<div class="bottom clearfix">
							<time class="time">发表时间:{{ item.createtime }}</time>
							<br />
							<time class="time">更新时间:{{ item.updatetime }}</time>
						</div>
					</div>
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
		</el-container>
	</div>
</template>

<script>
export default{
	name: 'CommentSearch',
	components: {
	},
	data() {
	    return {
			input:'',
			comments: [],
			isSearch:false,
			currentPage: 1,
			pageSize: 5
		}
	},
	methods: {
		handleSizeChange(val) {
		    console.log(`每页 ${val} 条`);
		    this.pageSize = val;
			this.handleSearch();
		},
		handleCurrentChange(val) {
		    console.log(`当前页: ${val}`);
		    this.currentPage = val;
			this.handleSearch();
		},
		handleSearch(){
			this.axios.get('/comments/content/search', {
			    params: {
					content: this.input,
			        currentPage: this.currentPage,
			        pageSize: this.pageSize
			    }
			}).then(response => {
			    console.log(response.data);
			    this.comments = response.data.data;
				this.isSearch = true;
			}).catch(error => {
			    console.log(error);
			})
		}
	}
}
</script>

<style>
</style>
