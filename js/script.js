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
          placeholder="What is your name?" \
          class="input-text main-design" \
        > \
      </div> \
      <button v-on:click="addTextArea()" class="registr_create-button main-design basic-button">+</button> \
      <button v-on:click="exit()" class="registr_start-button main-design basic-button">start!</button> \
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
    <div class="answering"> \
      <div class="main-design vertica-centering"> \
        Answer for {{scoreItem.name}} \
      </div> \
      <div class="main-design vertica-centering"> \
        {{answer.quetion}} \
      </div> \
      <div> \
        <button \
          v-for="(item, index) in answer.answers" \
          v-on:click="response(index)" \
          class="main-design basic-button vertica-centering" \
        > \
          {{item}} \
        </button> \
      </div> \
    </div>',
  methods: {
    getButtonId: function(i) {return 'answer' + i.toString();},
    response: function(i) {
      this.scoreItem.report.push({answerIndex: this.answerIndex, right: (i == this.answer.trueAnswerIndex)});
      this.$emit('step');
    }
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
    <div> \
      <div v-for="team in score"> \
        {{team.name}} \
        <div v-for="score in team.report"> \
          {{answer[score.answerIndex].quetion}} : {{score.right}} \
        </div> \
      </div> \
    </div>'
})

var basic = new Vue({
  el: '#guess-game',
  data: {
    render: [true, false, false],
    score: [{id: 0, name: '', report: []}],
    answer: [
      {
        quetion: "what1??",
        answers: [
          'answer1_1',
          'answer1_2',
          'answer1_3',
          'answer1_4',
        ],
        trueAnswerIndex: 1,
      },
      {
        quetion: "what2??",
        answers: [
          'answer2_1',
          'answer2_2',
          'answer2_3',
          'answer2_4',
        ],
        trueAnswerIndex: 3,
      }
    ],
  },
  methods: {
    renderStep: function(i) {
      this.$set(this.render, i, false);
      this.$set(this.render, (i + 1), true);
    }
  }
});
