<template>
  <div>
    <registr
      v-if=render[0]
      v-bind:score=score
      v-on:i-finish='renderStep(0)'
      >
    </registr>
    <questionnaire
      v-if=render[1]
      v-bind:score=score
      v-bind:answer=answer
      v-on:i-finish='renderStep(1)'
      >
    </questionnaire>
    <results
      v-if=render[2]
      v-bind:score=score
      v-bind:answer=answer
      >
    </results>
  </div>
</template>

<script>
import registr from "~/src/components/steps/registr.vue";
import results from "~/src/components/steps/results.vue";
import questionnaire from "~/src/components/steps/answer/questionnaire.vue";

export default {
  el: "#guess-game",
  components: [registr, questionnaire, results],
  data: {
    render: [true, false, false],
    score: [{ id: 0, name: "", report: [] }],
    answer: question
  },
  methods: {
    renderStep: function(i) {
      this.$set(this.render, i, false);
      this.$set(this.render, i + 1, true);
    }
  }
};
</script>

<style>
body {
  background-image: url("./images/night.png");
  background-size: cover;
  height: 100vh;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial;
}

button::-moz-focus-inner {
  border: 0 !important;
}

.main-design {
  background: rgba(74, 112, 70, 0.5);
  color: white;
  border: none;
  font-size: 40px;
  margin: 10px;
  font-weight: bold;
  padding: 10px;
}
</style>
