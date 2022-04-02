<script>
export default {
	name: "ToastTransition",
};
</script>
<template>
<Transition name="slide-fade">
	<slot></slot>
</Transition>
</template>

<style>
.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px) !important;
	opacity: 0;
}
</style>
