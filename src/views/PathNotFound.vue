<script setup>
import Nav from "@/components/Nav.vue";
// document.title = "Error 404"; // TODO
</script>

<template>
    <div>
        <Nav />
        <main class="centered_text">
            <h1>Error 404</h1>
            <p>Pagina no encontrada.</p>
            <!-- TODO: Añadir traducciones -->
        </main>
    </div>
</template>

<style scoped>
h1,
h2 {
    margin-top: 15px;
}
b {
    font-weight: bold;
}
</style>