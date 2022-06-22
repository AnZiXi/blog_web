<template>
    <div class="home">
        <el-container>
            <el-header>
                <TopBar></TopBar>
            </el-header>
            <el-container>
                <el-main>
                    <div class="grid-content bg-purple">
                        <router-view/>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import TopBar from '@/components/NavMenu/TopBar.vue'
   

    export default {

        name: 'Home',
        components: {
            TopBar, 
        },

    }
</script>
