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
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList.comList" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="introduce" label="详情" />
      </el-table>
      <el-pagination @current-change='currentChange' @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch, onMounted } from 'vue'
import { getGoodsList } from '@/request/api'
import { InitData, ListInt }  from '../type/goods'
export default defineComponent({
  setup () {
    const data = reactive(new InitData())

    onMounted(() => {
      getGoods()
    })

    const getGoods = () => {
      getGoodsList().then( res => {
        console.log(res.data)
        data.list = res.data
        data.selectData.count = res.data.length
      }).catch(err => console.log('报错',err))
    }

    const dataList = reactive({ comList: computed(() => 
      { return data.list.slice((data.selectData.page - 1) * data.selectData.pagesize, data.selectData.page * data.selectData.pagesize ) }) 
    })

    const currentChange = (page: number)  => {
      data.selectData.page = page
    }

    const sizeChange = (pagesize: number) => {
      data.selectData.pagesize = pagesize
    }

    const onSubmit = () => {
      let arr:ListInt[] = []
      if(data.selectData.title || data.selectData.introduce) {
        if(data.selectData.title) {
          arr = data.list.filter( item => item.title.indexOf(data.selectData.title) !== -1)
        }
        if(data.selectData.introduce) {
          arr = data.list.filter(item => item.introduce.indexOf(data.selectData.introduce) !== -1)
        }
      }
      else {
        arr = data.list
      }
      data.list = arr
      data.selectData.count = arr.length
    }

    watch(
      [() => data.selectData.title, () => data.selectData.introduce],
      () => {
        if(data.selectData.title == '' && data.selectData.introduce == '') {
          getGoods()
        }
        else {
          let arr:ListInt[] = []
          if(data.selectData.title || data.selectData.introduce) {
            if(data.selectData.title) {
              arr = data.list.filter( item => item.title.indexOf(data.selectData.title) !== -1)
            }
            if(data.selectData.introduce) {
              arr = data.list.filter(item => item.introduce.indexOf(data.selectData.introduce) !== -1)
            }
          }
          else {
            arr = data.list
          }
          data.list = arr
          data.selectData.count = arr.length
        }
      }
    )

    return { ...toRefs(data), currentChange, sizeChange, dataList, onSubmit }
  }
})
</script>

<style scoped>

</style>