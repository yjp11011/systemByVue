<template>
  <Layout class="layouts">
    <Header class="header" v-show="$route.meta.bread">
      <Bread :breaddata="$route.meta.bread"/>
    </Header>
    <Content class="main">
      <vue-scroll :ops="$config.scrollOps">
        <div class="content">
          <Dropdown>
            <a href="javascript:void(0)">
              下拉菜单
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="changeColor(1)">摇滚主题</DropdownItem>
              <DropdownItem @click.native="changeColor(2)">新时代主题</DropdownItem>
              <DropdownItem @click.native="changeColor(3)">基础主题</DropdownItem>
              <DropdownItem @click.native="changeColor(4)">黄色主题</DropdownItem>
              <DropdownItem @click.native="changeColor(5)">黑色主题</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <router-view/>
<!--          <Loading v-show="this.$store.state.app.loading"/>-->
        </div>
      </vue-scroll>
    </Content>
  </Layout>
</template>

<script>
    import Bread from '@/components/Bread'
    import Loading from '@/components/Loading'

    export default {
        name: 'layouts',
        components: {
            Bread,
            Loading
        },
        methods: {
            changeColor(num) {

                document.body.className = 'theme' + num;
                this.localStorageDate()
            },
            //存储localStoarge，用于进入系统时，记住用户上一次的选择，自动加载用户上一次选择的主题主题，记得在mounted()里面调用
            localStorageDate() {
                localStorage.setItem('app', document.body.className)
            }
        },
        mounted () {
            let color = localStorage.getItem('app')
            if(color) {
                document.body.className = color
            }
        }
    }
</script>
<style lang="less">
  .layouts {
    height: 100%;

    .header {
      background: none;
      height: 38px !important;
      padding: 10px !important;

      .ivu-breadcrumb {
        line-height: 20px;
      }
    }

    .main {
      height: calc(~"100% - 40px");
      padding: 0 10px 10px;
      flex: unset;

      .content {
        background: #FFFFFF;
        border: 1px solid #eeeeee;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        height: calc(~"100% - 70px");
        overflow: hidden;
      }
    }
  }
</style>
