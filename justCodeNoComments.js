const alphabet = "abcdefghijklmnopqrstuvwxyz";
function encrypt(message, shiftValue) {
  let encryptedMessage = "";
  let counter = 0;
  for (let i = 0; i < message.length; i++) {
    const originalChar = message[i];
    const letter = message[i].toLowerCase();
    const index = alphabet.indexOf(letter);
    if (counter === 2) {
      encryptedMessage += generateRandomLetter();
      counter = 0;
    }
    if (index === -1) {
      encryptedMessage += originalChar;
    } else {
      let newIndex = (index + shiftValue) % alphabet.length;
      if (newIndex < 0) {
        newIndex += alphabet.length;
      }
      const encryptedChar = alphabet[newIndex];
      if (originalChar === originalChar.toUpperCase()) {
        encryptedMessage += encryptedChar.toUpperCase();
      } else {
        encryptedMessage += encryptedChar;
      }
    }
    counter++;
  }
  return encryptedMessage;
}
console.log(encrypt("Hello Brutus, meet me at the high gardens!!", 42));

function generateRandomLetter() {
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}
function decrypt(message, shiftValue) {
  let readSecretMessage = "";
  let counter = 0;
  const decryptionShift = -shiftValue;
  for (let i = 0; i < message.length; i++) {
    let character = message[i];

    if (counter === 2) {
      counter = 0;
      continue;
    }
    const letter = character.toLowerCase();
    const index = alphabet.indexOf(letter);
    if (index === -1) {
      readSecretMessage += character;
    } else {
      let newIndex = (index + decryptionShift) % alphabet.length;
      if (newIndex < 0) {
        newIndex += alphabet.length;
      }
      const decryptedChar = alphabet[newIndex];
      if (character === character.toUpperCase()) {
        readSecretMessage += decryptedChar.toUpperCase();
      } else {
        readSecretMessage += decryptedChar;
      }
    }
    counter++;
  }
  return readSecretMessage;
}

console.log(
  decrypt(
    "Xudbbpe fRhdkjlkig, xcumujv csu sqjq joxua xxywxx swqlhtrudoi!r!",
    42
  )
);
console.log(
  decrypt(
    "Iueuan jrxuq cjythdykwxaj mixkqtaeml ebv wHenckvbkei rqdmt fHukckvi.r Jbxuihus, tmxayiwfuxh sjxau amenhtv 'zQkhhuubyjkit' yjew jhxux mxydatij. zJxmu hvymhihj ajel kldlsuyjb dyju yid uekdh qIbkqsxa xsxqqdvduzb wuqzhdoi qjxwu waueo xjem jfxuy dpuntj dgkvuiwj.",
    42
  )
);
//Seek the midnight shadow of Romulus and Remus. There, whisper the word 'aurelius' to the winds. The first to unveil it in our Slack channel earns the key to the next quest.
