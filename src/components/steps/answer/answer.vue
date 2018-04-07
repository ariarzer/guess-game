<template>
  <div class="question">
    <div class="main-design question_title">
      Вопрос для <span>{{scoreItem.name}}</span>
    </div>
    <div class="main-design">
       {{answer.question}}
    </div>
    <div class="question_answer-list">
      <button
      	v-for="(item, index) in answer.answers"
      	v-on:click="response(index)"
      	v-bind:class="[{true: istrue(index)}, {error: iserror(index)}]"
        v-bind:key=index
      >
	      {{item}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["answer", "scoreItem", "answerIndex"],
  data: function() {
    return {
      end: false
    };
  },
  methods: {
    response: function(i) {
      this.scoreItem.report.push({
        answerIndex: this.answerIndex,
        right: i == this.answer.trueAnswerIndex
      });
      this.end = true;
      this.checked = i;
      setTimeout(this.exit, 2000);
    },
    exit: function() {
      this.$emit("step");
    },
    istrue: function(i) {
      return i == this.answer.trueAnswerIndex && this.end;
    },
    iserror: function(i) {
      return i != this.answer.trueAnswerIndex && this.end && i == this.checked;
    }
  }
};
</script>


<style>
.question {
  display: flex;
  flex-direction: column;
  width: 1000px;
}

.question_title {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.question_answer-list {
  display: flex;
  justify-content: space-between;
}

.question_answer {
  min-width: 200px;
}

.true {
  position: relative;
  font-size: 53px;
  background: rgba(255, 175, 72, 0.6);
  transition-property: font-size, background;
  transition-duration: 0.5s;
}

.error {
  color: rgba(255, 255, 255, 0.2);
  background: rgba(10, 102, 62, 0.3);
  transition-property: color, background;
  transition-duration: 0.5s;
}
</style>
