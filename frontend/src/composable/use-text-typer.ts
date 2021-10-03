import { ref, computed } from 'vue'

export default function useTextTyper() {
  const text = ref('')
  const input = ref('')

  const remainingText = computed(() => text.value.slice(input.value.length))

  const set = (_text: string) => {
    text.value = _text
    input.value = ''
  }

  const type = (key: string) => {
    if (key !== remainingText.value.slice(0, 1)) {
      return false
    }

    input.value += key

    return true
  }

  return {
    // data
    text,
    input,

    // computed
    remainingText,

    // methods
    set,
    type,
  }
}