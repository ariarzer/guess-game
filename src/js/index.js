require('./components/registr');
require('./components/results');
require('./components/answer/answer-form');

var question = require('../../data/question.json');

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
