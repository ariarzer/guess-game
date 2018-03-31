import Vue from 'vue/dist/vue.esm.js';

import registr from './components/registr.vue';
import results from './components/results.vue';
import answerForm from './components/answer/answer-form.vue';

import question from '../../data/question.json';

new Vue({
  el: '#guess-game',
  template: `
    <registration-form
      v-if=render[0]
      v-bind:score=score
      v-on:i-finish='renderStep(0)'
      >
    </registration-form>
    <answer-form
      v-if=render[1]
      v-bind:score=score
      v-bind:answer=answer
      v-on:i-finish='renderStep(1)'
      >
    </answer-form>
    <showing-results
      v-if=render[2]
      v-bind:score=score
      v-bind:answer=answer
      >
    </showing-results>`,
  components: {
    'registration-form': registr,
    'answer-form': answerForm,
    'showing-results': results,
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
