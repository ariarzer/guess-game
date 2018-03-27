const Vue = require('vue/dist/vue.js');

const registr = require('./components/registr');
const results = require('./components/results');
const answerForm = require('./components/answer/answer-form');

var question = require('../../data/question.json');

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
