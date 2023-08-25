<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入详情" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList.comList" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="title" label="title" width="180" />
        <el-table-column prop="introduce" label="introduce" />
      </el-table>
      <el-pagination  @current-change='currentChange' @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { getGoodsList } from '@/request/api'
import { InitData }  from '../type/goods'
export default defineComponent({
  setup () {
    const data = reactive(new InitData())
    getGoodsList().then( res => {
        data.list = res.data
        data.selectData.count = res.data.length
    }).catch(err => console.log('报错',err))

    const dataList = reactive({ comList: computed(() => 
      { return data.list.slice((data.selectData.page - 1) * data.selectData.pagesize, data.selectData.page * data.selectData.pagesize ) }) 
    })

    const currentChange = (page: number)  => {
      data.selectData.page = page
    }

    const sizeChange = (pagesize: number) => {
      data.selectData.pagesize = pagesize
    }

     return { ...toRefs(data), currentChange, sizeChange, dataList }
  }
})
</script>

<style scoped>

</style>