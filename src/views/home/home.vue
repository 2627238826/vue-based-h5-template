<template>
  <div class="home">
    <p class="demo">h5工程模板！</p>
  </div>
</template>

<script>
import * as Apis from './api';
export default {
  name: 'home',
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
  created() {
    if (DEV) {
      console.log('DEV变量在本地开发中是true，打包时是false，打包后 if (DEV) 中的代码会自动删除', DEV);
      // 在本地开发时，使用假数据，方便自测（打包后会被删除）
      this.loginForm.telephone = '10001';
    }

    if (PROD) {
      // 如果有些代码只需要在生产环境执行，本地开发中不需要执行
      // console.log('PROD变量在本地开发中是false，打包时是true', PROD);
    }
  },
  methods: {
    async userApi() {
      let { success, data } = await Apis.login(this.loginForm);
      if (success) {
        console.log(success, data);
        // debugger;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
