<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view v-wechat-title="$route.meta.title || ''"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss" scoped>
#app {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  html,
  body {
    height: 100%;
  }

  body {
    width: 100%;
  }
}
</style>
