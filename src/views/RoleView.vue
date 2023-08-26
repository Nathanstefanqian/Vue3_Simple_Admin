<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style = "width: 100%">
      <el-table-column prop="roleId" label="ID" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名" width="180"></el-table-column>
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button
          link
          size="small" 
          @click="changeRole(scope.row)"
          >
          修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from 'element-plus'
import { getRoleList } from '@/request/api'
import { InitData, ListInt } from '../type/role'

export default defineComponent({
  setup () {
    const data = reactive(new InitData())
    
    const router = useRouter()

    onMounted(() => {
      getRoleList().then( res => {
        console.log(res)
        data.list = res.data
      })
    })

    const onSubmit = () => {
      console.log('123')
    }
 
    const changeRole = (row:ListInt) => {
      router.push({
        path: "authority",
        query: {
          id: row.roleId,
          authority: row.authority.join(',')
        }
      })
    }

    const addRole = (row:any) => {
      console.log(row)
      ElMessageBox.prompt('请输入角色名称', '添加', {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        if(value) {
          data.list.push({ roleId: data.list.length + 1, roleName: value, authority: [] })
          ElMessage({
            type: "success",
            message: `${value}角色添加成功`
          })
        }
        else {
          ElMessage({
            type: "error",
            message: "输入为空"
        })
        }
        }).catch(() => {
          ElMessage({
            type: "error",
            message: "取消操作"
          })
        })
    }

    return { ...toRefs(data), changeRole, addRole, onSubmit }
  }
})
</script>

<style scoped>

</style>