<template>
	<div class="Articles">		
		<el-card class="box-card" v-for="item in articles" :key="item.id"
				 style="margin-top: 10px;width: 600px;height: 500px;border-color: #dcdddd;">
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
				<el-badge :value="item.readsize" class="item">
					<el-button size="small">阅读量</el-button>
				</el-badge>
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
</template>

<script>

export default { 
	created() {
	    this.axios.get('/articles/page', {
	        params: {
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
	
	name: 'Index',
	components: {
		
	},
	data() {
		return {
			articles: [],
			currentPage: 1,
			pageSize: 5
		}
	},
	methods: {
		handleclick(id) {
		    this.$router.push('/articles/detail/' + id)
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
		            this.articles = response.data.data;
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
