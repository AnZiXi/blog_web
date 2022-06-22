<template>
    <div class="Index">
		<el-container>
			<el-aside>
				<SideBar></SideBar>
			</el-aside>
			<el-main>
				<router-view></router-view>
		    </el-main>
		</el-container>
    </div>
</template>

<script>
	import SideBar from '@/components/NavMenu/SideBar.vue'
export default { 
	
	name: 'Index',
	components: {
		 SideBar,
	},
	data() {
		return {
		}
	},
	methods: {
	}

}
</script>

<style scoped>
</style>
