const Vue = require('vue');
require('./answer-item');

module.exports = Vue.component('answer-form', {
  props: ['score','answer'],
  template: `
    <div>
      <div v-for="(item, index) in answer">
        <answer-item
          v-bind:answer=item
          v-bind:scoreItem="score[index % score.length]"
          v-bind:answerIndex="index"
          v-if="render[index]"
          v-on:step="answerStep(index)"
        >
        </answer-item>
      </div>
    </div>`,
  data: function () {
    return {
      render: []
    }
  },
  created: function () {
    this.render[0] = true;
    for(var i = 1; i < this.answer.length; i++){
      this.render[i] = false;
    }
  },
  methods: {
    answerStep: function(i) {
      this.$set(this.render, i, false);
      this.$set(this.render, (i + 1), true);
      if(i == this.answer.length - 1) this.$emit('i-finish');
    }
  },
});
