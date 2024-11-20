import { ref } from 'vue'

interface UseCounterOptions {
  min?: number
  max?: number
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const count = ref(initialValue)
  const { min, max } = options

  function inc() {
    if (max !== undefined && count.value >= max)
      return
    count.value++
  }

  function dec() {
    if (min !== undefined && count.value <= min)
      return
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return { count, inc, dec, reset }
}
