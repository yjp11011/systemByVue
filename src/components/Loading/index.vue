<template>
  <div class="loading">
    <Spin fix size="large">
      <Icon type="ios-loading" class="demo-spin-icon-load" size="40"></Icon>
      <div class="loading-title">数据加载中···</div>
    </Spin>
  </div>
</template>

<script>
  export default {
    name: "loading"
  }
</script>

<style lang="less" scoped>
  .loading{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000000;
    width: 100%;
    height: 100vh;
    background: rgba(255,255,255,.5);
    &-title{
      padding: 20px;
      font-size: 16px;
    }
    .ivu-spin-fix{
      background: unset;
    }
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg)}
    50% { transform: rotate(180deg)}
    to { transform: rotate(360deg)}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eeeeee;
  }
</style>
