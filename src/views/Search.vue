<template>
<div class="Search">
	<el-tabs>
	    <el-tab-pane label="搜索博客">
	        <ArticleSearch></ArticleSearch>
	    </el-tab-pane>
	    <el-tab-pane label="搜索用户">
	        <UserSearch></UserSearch>
	    </el-tab-pane>
	    <el-tab-pane label="搜索角色">
	        <RoleSearch></RoleSearch>
	    </el-tab-pane>
	    <el-tab-pane label="搜索栏目">
	        <CategorySearch></CategorySearch>
	    </el-tab-pane>
	    <el-tab-pane label="搜索标签">
	        <TagSearch></TagSearch>
	    </el-tab-pane>
	    <el-tab-pane label="搜索评论">
	        <CommentSearch></CommentSearch>
	    </el-tab-pane>
	</el-tabs>
</div>
</template>

<script>
	import ArticleSearch from '@/views/search/ArticleSearch'
	import UserSearch from '@/views/search/UserSearch'
	import RoleSearch from '@/views/search/RoleSearch'
	import CategorySearch from '@/views/search/CategorySearch'
	import TagSearch from '@/views/search/TagSearch'
	import CommentSearch from '@/views/search/CommentSearch'
export default{
	name: 'Search',
	components: {
	    ArticleSearch,
	    UserSearch,
	    RoleSearch,
	    CategorySearch,
	    TagSearch,
	    CommentSearch
	},
	data() {
	    return {}
	},
	methods: {}
}
</script>

<style>
</style>
