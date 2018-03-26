const answerItem = {
  props: ['answer', 'scoreItem', 'answerIndex'],
  template: `
    <div class="question">
      <div class="main-design question_title">
        Вопрос для <span> {{scoreItem.name}}</span>
      </div>
      <div class="main-design">
        {{answer.question}}
      </div>
      <div class="question_answer-list">
        <button
          v-for="(item, index) in answer.answers"
          v-on:click="response(index)"
          class="main-design question_answer"
          v-bind:class="[{true: istrue(index)}, {error: iserror(index)}]"
        >
          {{item}}
        </button>
      </div>
    </div>`,
  data: function () {
    return {
      end: false,
    }
  },
  methods: {
    response: function(i) {
      this.scoreItem.report.push({answerIndex: this.answerIndex, right: (i == this.answer.trueAnswerIndex)});
      this.end = true;
      this.checked = i;
      console.log(this.checked);
      setTimeout(this.exit, 2000);
    },
    exit: function() {this.$emit('step');},
    istrue: function(i) {return ((i ==  this.answer.trueAnswerIndex) && this.end);},
    iserror: function(i) {return ((i !=  this.answer.trueAnswerIndex) && this.end && (i == this.checked));}
  }
};

module.exports = answerItem;
