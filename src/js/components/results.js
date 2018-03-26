const Vue = require('vue');

module.exports = Vue.component('results', {
  props: ['score', 'answer'],
  template: `
    <div class="results">
      <div v-for="team in score">
        <div class="main-design vertica-centering">
          {{team.name}} : {{result(team)}} из {{team.report.length}}
        </div>
      </div>
    </div>`,
  methods: {
    result: function (team) {
      var result = 0;
      for(var i = 0; i < team.report.length; i++){
        result += +team.report[i].right;
      }
      return result;
    },
  },
});
