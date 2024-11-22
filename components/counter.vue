<script setup lang="ts">
const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 })
</script>

<template>
  <div class="flex h-min gap-3 border-dotted m-1 border-2">
    <p>Count: {{ count }}</p> <button class="border-2" @click="inc">
      Increment
    </button> <button class="border-2" @click="dec">
      Decrement
    </button> <button class="border-2" @click="reset">
      Reset
    </button>
  </div>
</template>
