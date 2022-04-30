<script setup>
import { RouterView, RouterLink } from 'vue-router';
import Nav from "@/components/Nav.vue";
</script>

<template>
  <div>
    <Nav />
    <RouterView />
    <footer>
      <p>
        Creado por
        <a href="https://twitter.com/guskikalola">Guskikalola</a> y
        <a href="https://twitter.com/Zlender02">Zlendy</a>.
      </p>
      <p>
        <RouterLink :to="{ name: 'lobby', params: { id: 'DEBUG' } }">DEBUG Lobby</RouterLink>, 
        <RouterLink :to="{ name: 'choosing', params: { id: 'DEBUG' } }">DEBUG Elegir</RouterLink>, 
        <RouterLink :to="{ name: 'voting', params: { id: 'DEBUG' } }">DEBUG Votar</RouterLink>
      </p>
    </footer>
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
