<template>
	<div class="RoleSearch">
		<el-container>
				<el-input
				style="display: inline-block;width: 300px;"
				  placeholder="请输入角色名"
				  v-model="input"
				  clearable>
				</el-input>
				<span style="display: inline-block"><el-button icon="el-icon-search" circle @click="handleSearch" ></el-button></span>
			<div v-if="isSearch">
				<el-card class="box-card" v-for="item in roles" :key="item.id">
					<div slot="header" class="clearfix">
						<p>角色名: {{ item.name }}</p>	
					</div>
					<div style="padding: 14px;">
						<div class="bottom clearfix">
							<time class="time">创建时间:{{ item.createtime }}</time>
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
	name: 'RoleSearch',
	components: {
	},
	data() {
	    return {
			input:'',
			roles: [],
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
			this.axios.get('/roles/name/search', {
			    params: {
					name: this.input,
			        currentPage: this.currentPage,
			        pageSize: this.pageSize
			    }
			}).then(response => {
			    console.log(response.data);
			    this.roles = response.data.data;
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
