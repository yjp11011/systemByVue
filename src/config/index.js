export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */

  baseUrl: {
    // 开发环境地址
    dev: '/server/',
  },
  /**
   * @description 滚动条的设置
   */
  scrollOps: {
    scrollPanel: {
      scrollingX: false,
      speed: 800,
      easing: 'easeInQuad'
    },
    rail: {
      opacity: '0.2',
      background: '#999999',
      border: '0',
      size: '6px'
    },
    bar: {
      background: '#999999',
      keepShow: false,
      size: '6px',
      minSize: '0.2'
    }
  }
}
