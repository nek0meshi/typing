import { ref, computed } from 'vue'

const DUMMY_TEXTS = [
  // サンプルデータ.
  'inu',
  'tako',
  'saru',
  'kuni',
  'kutsu',
  'kusa',
  'matsu',
  'kame',
  'tai',
  'teko',
  'tora',
  'gyuunyuu',
  'mitsubachi',
  'rakko',
  'koara',
  'ramune',
  'neko',
  'koshiann',
  'amaguri',
]

export default function useTextGenerator(texts: string[] = DUMMY_TEXTS) {
  const usedIndexes = ref<number[]>([])

  const remainingIndexes = computed(
    () => [...Array(texts.length).keys()]
      .filter((i) => !usedIndexes.value.includes(i))
  )

  const generate = () => {
    const index = remainingIndexes.value[
      Math.floor(Math.random() * remainingIndexes.value.length)
    ]
    usedIndexes.value.push(index)

    if (remainingIndexes.value.length === 0) {
      reset()
    }

    return texts[index]
  }

  const reset = () => {
    usedIndexes.value = []
  }

  return {
    generate,
    reset,
  }
}
