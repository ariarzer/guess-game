Vue.component('registration-form', {
  props: ['score'],
  template: '\
    <div class="registr"> \
      <div class="registr_inputs"> \
        <input \
          v-for="item in score" \
          v-model="item.name" \
          v-bind:key="item.id" \
          type="text" \
          placeholder="What is your name?..." \
          class="input-text main-design" \
        > \
      </div> \
      <button v-on:click="addTextArea()" class="registr_button main-design">+</button> \
      <button v-on:click="exit()" class="registr_button main-design">start!</button> \
    </div>',
  data: function () {
    return {
      countTextArea: 1};
    },
  methods: {
    areEmpty: function(){
      for(var i = 0; i < this.score.length; i++){
        if(this.score[i].name == ''){
          alert('Fill out the empty input fields first!');
          return true;
        }
      }
      return false;
    },
    exit: function() {
      if(this.areEmpty()) {return 0;}
      this.$emit('i-finish');
    },
    addTextArea: function() {
      if(this.areEmpty()) return 0;
      if(this.countTextArea < 4) {
        this.score.push({id: this.countTextArea, name: '', report: []});
        this.countTextArea++;
      }
      else {
        alert("You can't add more players :(");
      }
    },
  }
});

Vue.component('answer-item', {
  props: ['answer', 'scoreItem', 'answerIndex'],
  template: ' \
    <div class="question"> \
      <div class="main-design question_title"> \
        Вопрос для <span> {{scoreItem.name}}</span> \
      </div> \
      <div class="main-design"> \
        {{answer.question}} \
      </div> \
      <div class="question_answer-list"> \
        <button \
          v-for="(item, index) in answer.answers" \
          v-on:click="response(index)" \
          class="main-design question_answer" \
          v-bind:class="[{true: istrue(index)}, {error: iserror(index)}]" \
        > \
          {{item}} \
        </button> \
      </div> \
    </div>',
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
});

Vue.component('answering-form', {
  props: ['score','answer'],
  template: ' \
    <div> \
      <div v-for="(item, index) in answer"> \
        <answer-item \
          v-bind:answer=item \
          v-bind:scoreItem="score[index % score.length]" \
          v-bind:answerIndex="index" \
          v-if="render[index]" \
          v-on:step="answerStep(index)" \
        > \
        </answer-item> \
      </div> \
    </div>',
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

Vue.component('showing-results', {
  props: ['score', 'answer'],
  template: ' \
    <div class="results"> \
      <div v-for="team in score"> \
        <div class="main-design vertica-centering"> \
          {{team.name}} : {{result(team)}} из {{team.report.length}}\
        </div> \
      </div> \
    </div>',
  methods: {
    result: function (team) {
      var result = 0;
      for(var i = 0; i < team.report.length; i++){
        result += +team.report[i].right;
      }
      return result;
    },
  },
})

var basic = new Vue({
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
