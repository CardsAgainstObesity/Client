<script>
export default {
    data() {
        return {
            displayStore: $display
        }
    },
    props: {
        displayCode: {
            type: String,
            required: true
        },
        h1Text: {
            type: Boolean,
            required: true
        },
    },
}
</script>

<template>
    <div>
        <!-- TODO: Hacer que el tipo de texto se defina con un prop desde fuera del componente. -->
        <h1 v-if="h1Text">{{ displayStore.text(displayCode) }}</h1>
        <span v-else>{{ displayStore.text(displayCode) }}</span>
    </div>
</template>