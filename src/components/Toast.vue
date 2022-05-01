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
            required: false
        },
    },
}
</script>

<template>
    <div class="noselect">
        <h1 v-if="h1Text">{{ displayStore.error(displayCode) }}</h1>
        <span v-else>{{ displayStore.error(displayCode) }}</span>
    </div>
</template>