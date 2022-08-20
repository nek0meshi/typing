import { ref, computed } from 'vue'

const INTERVAL_TIME = 10

export default function useTimer() {
  const intervalId = ref(0)
  const seconds = ref(0)
  const currentTime = ref(0)

  const currentTimeSeconds = computed(() => Math.ceil(currentTime.value / 1000))
  const remainingTimeSeconds = computed(
    () => seconds.value - currentTimeSeconds.value
  )

  const start = (_seconds: number, callback: () => void) => {
    seconds.value = _seconds

    intervalId.value = setInterval(() => {
      currentTime.value += INTERVAL_TIME
      if (remainingTimeSeconds.value <= 0) {
        // タイムアップ.
        clearInterval(intervalId.value)
        currentTime.value = 0
        callback()
      }
    }, INTERVAL_TIME)
  }

  return {
    seconds,
    currentTimeSeconds,
    remainingTimeSeconds,
    start,
  }
}
