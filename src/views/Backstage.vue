<template>
    <div class="Backstage">
        <el-tabs>
            <el-tab-pane label="博客管理">
                <ArticleMange></ArticleMange>
            </el-tab-pane>
            <el-tab-pane label="用户管理">
                <UserMange></UserMange>
            </el-tab-pane>
            <el-tab-pane label="角色管理">
                <RoleMange></RoleMange>
            </el-tab-pane>
            <el-tab-pane label="栏目管理">
                <CategoryMange></CategoryMange>
            </el-tab-pane>
            <el-tab-pane label="标签管理">
                <TagMange></TagMange>
            </el-tab-pane>
            <el-tab-pane label="评论管理">
                <CommentMange></CommentMange>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import ArticleMange from '@/views/backstage/ArticleMange'
    import UserMange from '@/views/backstage/UserMange'
    import RoleMange from '@/views/backstage/RoleMange'
    import CategoryMange from '@/views/backstage/CategoryMange'
    import TagMange from '@/views/backstage/TagMange'
    import CommentMange from '@/views/backstage/CommentMange'


    export default {
        name: 'Backstage',
        components: {
            ArticleMange,
            UserMange,
            RoleMange,
            CategoryMange,
            TagMange,
            CommentMange
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style>
</style>
