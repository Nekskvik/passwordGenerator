const characterAmountNumber = document.getElementById('characterAmountNumber')
const characterAmountRange = document.getElementById('characterAmountRange')

const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')

const passwordDisplay = document.getElementById('passwordDisplay')
const form = document.getElementById('passwordGeneratorForm')

const UPPERCASE_CHAR_CODES = arrayFromFirstToLast(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromFirstToLast(97, 122)
const NUMBER_CHAR_CODES = arrayFromFirstToLast(48, 57)
const SYMBOL_CHAR_CODES = arrayFromFirstToLast(33, 47).concat(arrayFromFirstToLast(58, 64)).concat(arrayFromFirstToLast(91, 96)).concat(arrayFromFirstToLast(123, 126))

const clipboardEl = document.getElementById('copyToClipBoard')

const syncCharacterAmount = (e) => {
    const sameValue = e.target.value
    characterAmountNumber.value = sameValue
    characterAmountRange.value = sameValue
}
characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

function arrayFromFirstToLast(first, last){
    const array = []

    for(let i = first; i <= last; i++){
        array.push(i)
    }

    return array
}

form.addEventListener('submit', e => {
    e.preventDefault()

    const characterAmount = characterAmountNumber.value
    const includeUppercase = includeUppercaseElement.checked
    const includeNumbers = includeNumbersElement.checked
    const includeSymbols = includeSymbolsElement.checked

    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
    passwordDisplay.innerText = password

    clipboardEl.style.display = "block"
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols){
    let charCodes = LOWERCASE_CHAR_CODES

    if(includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
    if(includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
    if(includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)

    const passwordCharacters = []
    
    for(let i = 0; i < characterAmount; i++){
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return passwordCharacters.join('')
}

// copy to clip board
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const passwordCopy = passwordDisplay.innerText

    if(!passwordCopy || passwordCopy === 'Будущий пароль'){
        alert('Убедитесь, что вы сгенерировали пароль')
        return
    }

    textarea.value = passwordCopy
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Пароль скопирован !')
    hideCopyBtn()
})

function hideCopyBtn(){
    clipboardEl.style.display = "none"
}