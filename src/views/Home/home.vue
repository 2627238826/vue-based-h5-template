<template>
  <div class="home">
    <p class="demo">👏使用基于Vue.js的CSR项目模板！</p>
  </div>
</template>

<script>
import * as Apis from './api';
export default {
  name: 'Home',
  components: {},
  filters: {},
  data() {
    return {
      loginForm: {
        telephone: '10001',
        password: '123456',
        userType: 4
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    userApi() {
      Apis.login(this.loginForm).then(({ success, data }) => {
        console.log(success, data);
        // debugger;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
