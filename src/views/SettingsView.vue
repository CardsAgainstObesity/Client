<script setup>
import Nav from "@/components/Nav.vue";
</script>

<template>
    <div>
        <Nav />
        <main class="centered_text">
            <label for="language">{{$display.text("settings_language")}}</label>
            <select name="language" v-model="language">
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
            <!-- TODO: CSS por favor -->
        </main>
    </div>
</template>

<script>
export default {
  name: "SettingsView",
  data() {
    return {
      language: "",
    }
  },
  watch: {
      language: function(value){
          this.language = value;
          this.$display.language = value;
      }
  },
  mounted(){
      // TODO: Check IndexedDB
      this.language = this.$display.language;
  }
}
</script>