<script setup>
import { RouterView, RouterLink } from 'vue-router';
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div>
    <Nav />
    <RouterView />
    <Footer />
  </div>
</template>
