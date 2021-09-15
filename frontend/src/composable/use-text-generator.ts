import { ref, computed } from 'vue'

const DUMMY_TEXTS = [
  // サンプルデータ.
  'あんこ',
  'けん',
  'だんぼう',
  'らっこ',
  'まっと',
  'ほっともっと',
  'きゃべつ',
  'にんじゃ',
  'とうりょう',
  'ちゃっと',
  'ぎゅうにゅう',
  'びみょう',
  'ちょうじょう',
  'きゃんでぃ',
  'ふぁいと',
  'ふぁっくす',
  'ふゅーちゃー',
  'ゔぁいおりん',
  'ゔぇろしてぃ',
  'とら',
  'みつばち',
  'こあら',
  'らむね',
  'ねこ',
  'こしあん',
  'ふね',
  'つち',
  'あまぐり',

  'hello',
  'apple',
  'pen',
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
