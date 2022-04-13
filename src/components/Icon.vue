<script setup>
defineProps({
  path: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <svg style="width: 24px; vertical-align: bottom" viewBox="0 0 24 24">
    <path fill="currentColor" :d="path" />
  </svg>
</template>