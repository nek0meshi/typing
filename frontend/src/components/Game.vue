<template>
  <div>
    <div v-if="gameStatus === GAME_STATUS_INITIAL">
      <h1>Enterキーを押して, ゲームを開始ください。</h1>
    </div>
    <div v-else-if="gameStatus === GAME_STATUS_FINISHED">
      <h1>ゲームが終了しました。</h1>
      <p>キー数: {{ keyCount }}</p>
      <p>Enterキーを押してください。</p>
    </div>
    <div v-else>
      <h1>{{ currentText }}</h1>
      <p>{{ time }}</p>

      <p>{{ currentInput }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import useTextGenerator from '../composable/use-text-generator'
import useTextTyper from '../composable/use-text-typer'
import useTimer from '../composable/use-timer'

const GAME_STATUS_INITIAL = 0
const GAME_STATUS_RUNNING = 1
const GAME_STATUS_FINISHED = 2
const TIMER_TIME = 10

export default defineComponent({
  setup: () => {
    const textGenerator = useTextGenerator()
    const textTyper = useTextTyper()
    const timer = useTimer()

    const gameStatus = ref(GAME_STATUS_INITIAL)
    const keyCount = ref(0)

    const start = () => {
      gameStatus.value = GAME_STATUS_RUNNING
      keyCount.value = 0
      timer.start(TIMER_TIME, () => {
        timeUp()
      })
      textGenerator.reset()
      textTyper.set(textGenerator.generate())
    }
    const reset = () => {
      gameStatus.value = GAME_STATUS_INITIAL
    }
    const timeUp = () => {
      gameStatus.value = GAME_STATUS_FINISHED
    }
    const onKeyInput = (e: KeyboardEvent) => {
      switch (gameStatus.value) {
        case GAME_STATUS_INITIAL:
          if (e.key === "Enter") {
            start()
          }
          break
        case GAME_STATUS_RUNNING:
          if (textTyper.type(e.key)) {
            keyCount.value++
          }
          if (textTyper.remainingText.value.length === 0) {
            // 現在のテキストの入力完了
            textTyper.set(textGenerator.generate())
          }
          break
        case GAME_STATUS_FINISHED:
          if (e.key === "Enter") {
            reset()
          }
          break
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', onKeyInput)
    })

    return {
      // constants
      GAME_STATUS_INITIAL,
      GAME_STATUS_RUNNING,
      GAME_STATUS_FINISHED,

      // data
      gameStatus,
      currentInput: textTyper.input,
      currentText: textTyper.text,
      keyCount,

      // computed
      remainingText: textTyper.remainingText,
      time: timer.currentTimeSeconds,

      // methods
      onKeyInput,
    }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
