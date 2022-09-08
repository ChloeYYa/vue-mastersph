<template>
<div>
 <Header />
 <router-view></router-view>
 <Footer />
</div>

</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: '',
  data () {
    return {}
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch("getCategoryList")
    this.$store.dispatch("getUserInfo")
  }
}
</script>

<style lang="less" scope>
</style>
