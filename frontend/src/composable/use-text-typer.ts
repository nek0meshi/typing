import { ref, computed } from 'vue'

export default function useTextTyper() {
  const text = ref('')
  const inputTextArray = ref<string[]>([])
  const inputCurrentLetter = ref('')
  const reserved = ref<string[]>([])

  const textArray = computed(() => parseTextArray(text.value))
  const textAlphabetArray = computed(() => textArray.value
    .map((letter, index) => {
      switch (letter) {
        case 'っ':
          if (textArray.value.length >= index) {
            // 次の文字の、最初のアルファベット.
            return [
              parse(textArray.value[index + 1])[0][0],
              ...parse(letter)
            ]
          }
      }

      return parse(letter)
    })
  )
  const inputText = computed(() => inputTextArray.value.join('') + inputCurrentLetter.value)
  const inputIndex = computed(() => inputTextArray.value.length)
  const currentLetterCandidates = computed(
    () => reserved.value.length
      ? reserved.value
      : textAlphabetArray.value[inputIndex.value]
        .filter((item: string) => item.startsWith(inputCurrentLetter.value))
  )
  const expectedText = computed(() => inputTextArray.value
    .concat(currentLetterCandidates.value[0] || [])
    .concat(textAlphabetArray.value.slice(inputIndex.value + 1).map((item: string[]) => item[0]))
    .join('')
  )
  const isCompleted = computed(
    () =>
      textArray.value.length > 0
      && inputTextArray.value.length === textArray.value.length
  )

  const set = (_text: string) => {
    text.value = _text
    inputTextArray.value = []
    inputCurrentLetter.value = ''
    reserved.value = []
  }

  const goNextChar = () => {
    inputTextArray.value.push(inputCurrentLetter.value)
    inputCurrentLetter.value = ''
    reserved.value = []
  }

  const type = (key: string) => {
    switch (textArray.value[inputIndex.value]) {
      case 'ん':
        if (
          inputCurrentLetter.value === 'n'
          && key !== 'n'
          && textAlphabetArray.value.length >= inputIndex.value + 1
          && !['a', 'i', 'u', 'e', 'o', 'n']
            .includes(textAlphabetArray.value[inputIndex.value + 1]
              .map((item: string) => item[0])
            )
          && textAlphabetArray.value[inputIndex.value + 1]
            .map((item: string) => item[0])
            .includes(key)
        ) {
          inputTextArray.value.push(inputCurrentLetter.value)
          inputCurrentLetter.value = key
          return true
        }
        break
      case 'っ':
        if (
          inputCurrentLetter.value === ''
          && key !== 'l'
          && textAlphabetArray.value.length >= inputIndex.value + 1
          && textAlphabetArray.value[inputIndex.value + 1].map((item: string) => item[0]).includes(key)
        ) {
          inputCurrentLetter.value = key
          goNextChar()
          reserved.value = textAlphabetArray.value[inputIndex.value].filter((item: string) => item.startsWith(key))
          return true
        }
        break
    }

    if (
      !currentLetterCandidates.value
        .find((item: string) => item.startsWith(inputCurrentLetter.value + key))
    ) {
      return false
    }

    inputCurrentLetter.value += key

    if (currentLetterCandidates.value.find((item: string) => item === inputCurrentLetter.value)) {
      goNextChar()
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
  return LETTER_MAP[letter] || TWO_LETTER_MAP[letter] || [letter]
}

const parseTextArray = (text: string) => {
  const arr = text.split('')

  const result = []
  let index = 0

  while (index < arr.length) {
    if (
      index < arr.length - 1
      && Object.keys(TWO_LETTER_MAP).includes(arr[index] + arr[index + 1])
    ) {
      result.push(arr[index] + arr[index + 1])
      index += 2
    } else {
      result.push(arr[index])
      index += 1
    }
  }

  return result
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
  'っ': ['ltu', 'ltsu'],
  'ゃ': ['lya'],
  'ゅ': ['lyu'],
  'ょ': ['lyo'],
  'ぁ': ['la'],
  'ぃ': ['li'],
  'ぅ': ['lu'],
  'ぇ': ['le'],
  'ぉ': ['lo'],
  'が': ['ga'],
  'ぎ': ['gi'],
  'ぐ': ['gu'],
  'げ': ['ge'],
  'ご': ['go'],
  'ざ': ['za'],
  'じ': ['zi', 'ji'],
  'ず': ['zu'],
  'ぜ': ['ze'],
  'ぞ': ['zo'],
  'だ': ['da'],
  'ぢ': ['di'],
  'づ': ['du'],
  'で': ['de'],
  'ど': ['do'],
  'ば': ['ba'],
  'び': ['bi'],
  'ぶ': ['bu'],
  'べ': ['be'],
  'ぼ': ['bo'],
  'ぱ': ['pa'],
  'ぴ': ['pi'],
  'ぷ': ['pu'],
  'ぺ': ['pe'],
  'ぽ': ['po'],
  'ー': ['-'],
}

// 二音
const TWO_LETTER_MAP = {
  ...Object.fromEntries(
    Object.entries({
      'き': 'k',
      'ぎ': 'g',
      'ぢ': 'd',
      'に': 'n',
      'ひ': 'h',
      'び': 'b',
      'ぴ': 'p',
      'み': 'm',
      'り': 'r',
    })
      .flatMap(([kana, consonant]: string[]) => [
        ['ゃ', 'ya'],
        ['ゅ', 'yu'],
        ['ょ', 'yo'],
      ]
        .map(([kanaYayuyo, alphabetYayuyo]) => [kana + kanaYayuyo, [consonant + alphabetYayuyo]])
      )
  ),
  ...Object.fromEntries(
    Object.entries({
      'し': ['sy', 'sh'],
      'じ': ['zy', 'j'],
      'ち': ['cy', 'ch', 'ty'],
      'て': ['th'],
    })
      .flatMap(([kana, consonants]) => [
        ['ゃ', 'a'],
        ['ゅ', 'u'],
        ['ょ', 'o'],
      ]
        .map(([kanaYayuyo, alphabetAuo]) => [
          kana + kanaYayuyo,
          consonants.map((consonant: string) => consonant + alphabetAuo)
        ])
      )
  ),
  'ふぁ': ['fa'],
  'ふぃ': ['fi'],
  'ふぇ': ['fe'],
  'ふゅ': ['fyu'],
  'うぃ': ['whi'],
  'うぇ': ['we', 'whe'],
  'うぉ': ['who'],
  'ゔぁ': ['va'],
  'ゔぃ': ['vi'],
  'ゔぇ': ['ve'],
  'ゔぉ': ['vo'],
  'ちぇ': ['che'],
  'しぇ': ['she'],
  'じぇ': ['je'],
  'てぃ': ['thi'],
  'でぃ': ['dhi'],
  'でゅ': ['dhu'],
  'とぅ': ['twu'],
}
