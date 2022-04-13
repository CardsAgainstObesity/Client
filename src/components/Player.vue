<script setup>
import { mdiAccount, mdiCrown } from '@mdi/js'; 
defineProps({
    name: {
        type: String,
        required: true
    },
    ready: {
        type: Boolean,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    czar: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <div class="player">
        <Icon :path="mdiCrown" v-if="czar" />
        <Icon :path="mdiAccount" v-else />
        <span>{{name}}</span>
    </div>
</template>