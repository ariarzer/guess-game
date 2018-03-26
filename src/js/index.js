require('./components/registr');
require('./components/results');
require('./components/answer/answer-form');

var question = require('../../data/question.json');

new Vue({
  el: '#guess-game',
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
