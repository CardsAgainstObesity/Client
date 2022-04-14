<script setup>
import Nav from "@/components/Nav.vue";
import 'vue-select/dist/vue-select.css';
</script>

<template>
    <div>
        <Nav />
        <main class="centered_text">
            <label for="language">{{$display.text("settings_language")}}</label>
            <v-select name="language" :options="languages" v-model="language" :clearable="false" />
        </main>
    </div>
</template>

<script>
export default {
  name: "SettingsView",
  data() {
    return {
      language: "",
      languages: [
          {label: '🇬🇧 English', code: 'en'},
          {label: '🇪🇸 Español', code: 'es'}
      ]
    }
  },
  watch: {
      language: function(value){
          this.$display.language = value.code;
      }
  },
  mounted(){
        // Set selected value
        document.querySelector('.vs__selected').innerHTML = this.languages.find(language => { return language.code == this.$display.language }).label;
    }
}
</script>

<style scoped>
.v-select {
    background-color: #222;
    --vs-controls-color: #83B4F0;
    --vs-border-color: #83B4F0;

    --vs-dropdown-bg: #222222;
    --vs-dropdown-color: #cc99cd;
    --vs-dropdown-option-color: #83B4F0;

    --vs-selected-bg: #83B4F0;
    --vs-selected-color: #83B4F0;

    --vs-search-input-color: #eeeeee;

    --vs-dropdown-option--active-bg: #83B4F0;
    --vs-dropdown-option--active-color: #222222;
}
</style>