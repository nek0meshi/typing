import { ref, computed } from 'vue'

export default function useTextTyper() {
  const text = ref('')
  const inputTextArray = ref<string[]>([])
  const inputCurrentLetter = ref('')

  const textArray = computed(() => text.value.split(''))
  const textAlphabetArray = computed(() => textArray.value
    .map((letter) => parse(letter))
  )
  const inputText = computed(() => inputTextArray.value.join('') + inputCurrentLetter.value)
  const inputIndex = computed(() => inputTextArray.value.length)
  const currentLetterCandidates = computed(() => textAlphabetArray.value[inputIndex.value]
    .filter((item: string) => item.startsWith(inputCurrentLetter.value))
  )
  const expectedText = computed(() => inputTextArray.value
    .concat(currentLetterCandidates.value[0] || [])
    .concat(textAlphabetArray.value.slice(inputIndex.value + 1).map((item: string[]) => item[0]))
    .join('')
  )
  const isCompleted = computed(() =>
    textArray.value.length > 0
    && inputTextArray.value.length === textArray.value.length
  )

  const set = (_text: string) => {
    text.value = _text
    inputTextArray.value = []
    inputCurrentLetter.value = ''
  }

  const type = (key: string) => {
    if (!currentLetterCandidates.value
      .find((item: string) => item.startsWith(inputCurrentLetter.value + key))
    ) {
      return false
    }

    inputCurrentLetter.value += key

    if (currentLetterCandidates.value.find((item: string) => item === inputCurrentLetter.value)) {
      inputTextArray.value.push(inputCurrentLetter.value)
      inputCurrentLetter.value = ''
    }

    return true
  }

  return {
    // data
    text,

    // computed
    inputText,
    expectedText,
    isCompleted,

    // methods
    set,
    type,
  }
}

const parse = (letter: string) => {
  return LETTER_MAP[letter] || [letter]
}

const LETTER_MAP = {
  'あ': ['a'],
  'い': ['i'],
  'う': ['u'],
  'え': ['e'],
  'お': ['o'],
  'か': ['ka'],
  'き': ['ki'],
  'く': ['ku'],
  'け': ['ke'],
  'こ': ['ko'],
  'さ': ['sa'],
  'し': ['si', 'shi'],
  'す': ['su'],
  'せ': ['se'],
  'そ': ['so'],
  'た': ['ta'],
  'ち': ['ti', 'chi'],
  'つ': ['tu', 'tsu'],
  'て': ['te'],
  'と': ['to'],
  'な': ['na'],
  'に': ['ni'],
  'ぬ': ['nu'],
  'ね': ['ne'],
  'の': ['no'],
  'は': ['ha'],
  'ひ': ['hi'],
  'ふ': ['hu', 'fu'],
  'へ': ['he'],
  'ほ': ['ho'],
  'ま': ['ma'],
  'み': ['mi'],
  'む': ['mu'],
  'め': ['me'],
  'も': ['mo'],
  'や': ['ya'],
  'ゆ': ['yu'],
  'よ': ['yo'],
  'ら': ['ra'],
  'り': ['ri'],
  'る': ['ru'],
  'れ': ['re'],
  'ろ': ['ro'],
  'わ': ['wa'],
  'を': ['wo'],
  'ん': ['nn'],
}
