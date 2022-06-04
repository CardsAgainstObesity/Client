<script>
export default {
    data() {
        return {
            checked: false,
        };
    },
    methods: {
        requestCheck(){
            if (this.$player.isCzar) {
                this.checked = !this.checked;
                this.$emit('checked', this.checked)
            }
        }
    }
};
</script>

<template>
    <input
        type="text"
        class="checkbox noselect"
        :class="checked ? 'checked' : ''"
        maxlength="0"
        @click="requestCheck"
    />
</template>
