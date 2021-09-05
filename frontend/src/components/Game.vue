<template>
  <div>
    <div v-if="gameStatus === GAME_STATUS_INITIAL">
      <h1>Enterキーを押して, ゲームを開始ください。</h1>
    </div>
    <div v-else-if="gameStatus === GAME_STATUS_FINISHED">
      <h1>ゲームが終了しました。</h1>
      <p>Enterキーを押してください。</p>
    </div>
    <div v-else>
      <h1>{{ currentText }}</h1>

      <p>{{ currentInput }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, defineComponent } from 'vue'

const GAME_STATUS_INITIAL = 0
const GAME_STATUS_RUNNING = 1
const GAME_STATUS_FINISHED = 2

export default defineComponent({
  setup: () => {
    const gameStatus = ref(GAME_STATUS_INITIAL)
    const texts = ref([])
    const currentIndex = ref(0)
    const currentInput = ref('')
    const currentText = computed(() => texts.value[currentIndex.value] || null)
    const currentRemainingText = computed(() => (currentText.value || '').slice(currentInput.value.length))

    const start = () => {
      gameStatus.value = GAME_STATUS_RUNNING
      texts.value = [
        // サンプルデータ.
        'poppusinanaide',
        'soratobusakana',
        'karasuhamassiro',
      ]
    }
    const reset = () => {
      gameStatus.value = GAME_STATUS_INITIAL
    }

    const onKeyInput = (e: KeyboardEvent) => {
      switch (gameStatus.value) {
        case GAME_STATUS_INITIAL:
          if (e.key === "Enter") {
            start()
          }
          break
        case GAME_STATUS_RUNNING:
          if (e.key === currentRemainingText.value.slice(0, 1)) {
            currentInput.value += e.key
          }
          if (currentRemainingText.value.length === 0) {
            // 現在のテキストの入力完了
            currentInput.value = ''
            if (currentIndex.value + 1 === texts.value.length) {
              // ゲーム終了
              gameStatus.value = GAME_STATUS_FINISHED
            }

            currentIndex.value++
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
      texts,
      currentIndex,
      currentInput,
      currentText,

      // computed
      currentRemainingText,

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
