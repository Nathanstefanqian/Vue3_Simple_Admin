<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="../assets/logo.png" class="logo" /></el-col>
          <el-col :span="16"><h2>后台管理系统</h2></el-col>
          <el-col :span="4"><span class="quit-login">退出登录</span></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#666" default-active="2" text-color="#fff" router>
          <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
/* todo 这边el-row的高度不知道该如何控制  */

export default defineComponent({
  name: "HomeView",
  setup () {
    const router = useRouter()
    const list = router.getRoutes().filter( v => v.meta.isShow)
    console.log(list)
    return { list }
  }
})
</script>






<style lang="scss" scoped>
.el-header {
  height: 80px;
  background-color: #666;
  .logo {
    height: 80px;
  }
  h2,.quit-login {
    margin: 0;
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
  }
}

.el-aside {
  .el-menu {
    height: calc(100vh - 80px)
  }
}
</style>