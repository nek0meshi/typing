import { ref, computed } from 'vue'

const INTERVAL_TIME = 10

export default function useTimer() {
  const startTime = ref(0)
  const intervalId = ref(0)
  const seconds = ref(0)
  const timerTime = ref(0)

  const currentTime = computed(() => {
    const value = seconds.value * 1000 - (timerTime.value - startTime.value)

    return value >= 0 ? value : 0
  })
  const currentTimeSeconds = computed(() => Math.ceil(currentTime.value / 1000))

  const start = (_seconds: number, callback = () => {}) => {
    seconds.value = _seconds
    startTime.value = Date.now()

    intervalId.value = setInterval(() => {
      timerTime.value = Date.now()
      if (currentTime.value === 0) {
        // タイムアップ.
        clearInterval(intervalId.value)
        callback()
      }
    }, INTERVAL_TIME)
  }

  return {
    seconds,
    currentTime,
    currentTimeSeconds,
    start,
  }
}
