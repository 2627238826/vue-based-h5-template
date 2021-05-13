const home = r => require.ensure([], () => r(require('./home.vue')), 'home');

export default home;
