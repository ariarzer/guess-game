import Vue from 'vue/dist/vue.esm.js';

import registr from './components/registr.vue';
import results from './components/results.vue';
import answerForm from './components/answer/answer-form.vue';

import question from '../../data/question.json';

new Vue({
  el: '#guess-game',
  components: {
    'registration-form': registr,
    'showing-results': results,
    'answer-form': answerForm,
  },
  data: {
    render: [true, false, false],
    score: [{id: 0, name: '', report: []}],
    answer: question,
  },
  methods: {
    renderStep: function(i) {
      this.$set(this.render, i, false);
      this.$set(this.render, (i + 1), true);
    }
  }
});
