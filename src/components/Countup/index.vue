<template>
  <span>{{tweeningValue|formatMoney}}</span>
</template>

<script>
  import TWEEN from '@tweenjs/tween.js'
  export default {
    name: "Countup",
    data(){
      return {
        tweeningValue: 0
      }
    },
    props: {
      value:{
        type: Number,
        required: true
      }
    },
    watch: {
      value: function (newValue, oldValue) {
        this.tween(oldValue, newValue)
      }
    },
    methods: {
      tween: function (startValue, endValue){
        let vm = this
        function animate() {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
            TWEEN.update()
          }
        }
        new TWEEN.Tween({tweeningValue: startValue})
          .to({tweeningValue: endValue}, 2000)
          .onUpdate(res => {
            vm.tweeningValue = res.tweeningValue.toFixed(2)
          })
          .start()
        animate()
      }
    },
    mounted(){
      this.tween(0, this.value)
    }
  }
</script>

<style scoped>

</style>
