<template>
    <div class="registr">
      <div class="registr_inputs">
      	<input
      	  v-for="item in score"
      	  v-model="item.name"
      	  v-bind:key="item.id"
      	  type="text"
      	  placeholder="What is your name?..."
      	  class="input-text main-design"
      	>
      </div>
      <button v-on:click="addTextArea()" class="registr_button main-design">+</button>
      <button v-on:click="exit()" class="registr_button main-design">start!</button>
    </div>
</template>

<script>
export default {
  props: ["score"],
  data: function() {
    return {
      countTextArea: 1
    };
  },
  methods: {
    areEmpty: function() {
      for (var i = 0; i < this.score.length; i++) {
        if (this.score[i].name == "") {
          alert("Fill out the empty input fields first!");
          return true;
        }
      }
      return false;
    },
    exit: function() {
      if (this.areEmpty()) {
        return 0;
      }
      this.$emit("i-finish");
    },
    addTextArea: function() {
      if (this.areEmpty()) return 0;
      if (this.countTextArea < 4) {
        this.score.push({ id: this.countTextArea, name: "", report: [] });
        this.countTextArea++;
      } else {
        alert("You can't add more players :(");
      }
    }
  }
};
</script>


<style>
.registr {
  display: flex;
  margin-bottom: 130px;
}

.registr_inputs {
  display: flex;
  flex-direction: column;
}

.input-text {
  transition: padding 0.5s;
}

.input-text:focus {
  padding: 15px;
  transition: padding 0.5s;
}

.registr_button {
  transition-property: box-shadow, border-radius;
  transition-duration: 0.5s;
}

.registr_button:hover {
  box-shadow: 0 0 10px rgba(101, 136, 67, 1);
  border-radius: 10px;
  transition-property: box-shadow, border-radius;
  transition-duration: 0.5s;
}
</style>
