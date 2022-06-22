<template>
    <div class="SideBar">
		    <el-menu
		      :default-active="'/articles'"
		      class="el-menu-vertical-demo"
			  router
			  style="width: 200px;"
		      >
		      <el-menu-item index="/articles"><span>全部</span></el-menu-item>  
		      <el-menu-item :index="'/articles/categories/' + item.id" v-for="item in categories" :key="item.id" >{{item.name}}</el-menu-item>
		    </el-menu>
    </div>
</template>

<script>
    export default {
		created() {
		    this.axios
		        .get('/categories/all')
		        .then(response => {
		            console.log(response.data);
		            this.categories = response.data.data;
		        })
		        .catch(error => {
		            console.log(error);
		        })
		},
        name: 'SideBar',
        data() {
            return {
				categories: [],
			}
        },
		methods: {
		     
		    }
    }
</script>

<style>
</style>
