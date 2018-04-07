import Vue from 'vue/dist/vue.esm.js';

import Root from '~/src/components/root.vue';

new Vue({
  el: '#guess-game',

  render: h => h(Root), 
})
