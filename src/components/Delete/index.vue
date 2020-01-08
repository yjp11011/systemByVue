<template>
  <Modal
    v-model="flag"
    width="360"
    class-name="self-madol"
  >
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="ios-information-circle"></Icon>
      <span>删除确认</span>
    </p>
    <div style="text-align: center">
      此操作将永久删除此数据，是否继续？
    </div>
    <div slot="footer">
      <Button type="primary" ghost shape="circle" class="query-btn" @click="del">确定</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        flag: false
      }
    },
    methods: {
      show() {
        this.flag = true;
      },
      hide() {
        this.flag = false;
      },
      del() {
        this.$emit('deleteRow')
      }
    }
  }
</script>

<style scoped>

</style>
