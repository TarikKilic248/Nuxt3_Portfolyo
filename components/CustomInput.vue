<script setup>
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <input :value="modelValue" @input="emit('update:modelValue')" />
</template>
