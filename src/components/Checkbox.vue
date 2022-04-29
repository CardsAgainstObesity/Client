<script>
export default {
    data() {
        return {
            checked: false,
        };
    },
};
</script>

<template>
    <input
        type="text"
        class="checkbox noselect"
        :class="checked ? 'checked' : ''"
        maxlength="0"
        @click="checked = !checked; $emit('checked', checked)"
    />
</template>
