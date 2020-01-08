<!--
    接收参数
    handCurrentchange: function 改变页码
    handleSizechange: function 改变每页条数
    pagenumber: number 当前页码
    total：number 总页数
    sizes: array  每页条数切换配置
-->
<template>
  <div class="page">
    <span style="display: inline-block;padding-left: 10px" v-if="showTotal">共&nbsp;{{total}}&nbsp;条</span>
    <Page
      class-name="pagination"
      @on-change="handCurrentchange"
      @on-page-size-change="handleSizechange"
      :current="pagenumber"
      :page-size-opts="sizes"
      :page-size="size"
      show-sizer
      size="small"
      :total="total"
      :showTotal="showTotal"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    handCurrentchange: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    handleSizechange: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    pagenumber: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    sizes: {
      type: Array,
      default: () => {
        return [10,20,30,40]
      }
    },
    size: {
      type: Number,
      default: 10
    },
    showTotal: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">

</style>
