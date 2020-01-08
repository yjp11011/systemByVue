<template>
  <div class="bread">
    <Breadcrumb>
      <BreadcrumbItem v-for="(item, key) in breaddata" :key="key">{{ item }}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'bread',
  props: ['breaddata']
}
</script>

<style scoped lang="less">
.bread {
  height: 100%;
  span{
    font-size: 12px;
  }
}
</style>
