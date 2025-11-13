const alphabet = "abcdefghijklmnopqrstuvwxyz";
// let shiftValue = 42; //test both functions together

// //Step 1: Take a plaintext message and a shift value and return an encrypted string. If the message includes a character out of the alphabet, pass it as is to the encrypted string.
// //refered back to exercise 8 since  I knew I needed to make a function with a loop
// // function encryptLetter(letter, shift) {
// //   const index = alphabet.indexOf(letter.toLowerCase());
// //   const newIndex = (index + shift) % alphabet.length;
// //   return alphabet[newIndex];}
//Remember to handle both uppercase and lowercase characters??? looks like I did that in exercise 8 by making everything lowercase?
// function encrypt(message, shiftValue) {
//   let encryptedMessage = ""; //message is stored in a string
//   for (let i = 0; i < message.length; i++) {
//     //start loop
//     let letter = message[i].toLowerCase(); //defining letter and making lowercase to match alphabet
//     if (alphabet.includes(letter)) {
//       const index = alphabet.indexOf(letter); //getting index of letter
//       const newIndex = (index + shiftValue) % alphabet.length; //shift and store wrapping around alphabet
//       encryptedMessage += alphabet[newIndex]; //
//       //const encryptedMessage = alphabet[newIndex]; //store as result
//     } //end if statement
//     else {
//       encryptedMessage += letter; //if alphabet doesn't include character add it to encrypted message
//     }
//   }
//   return encryptedMessage;
// }
// function encryptSimplified(message, shiftValue) {
//   let encryptedMessage = "";
//   let counter = 0;

//   for (const originalChar of message) {
//     // 1. Random Character Insertion Logic
//     if (counter === 2) {
//       encryptedMessage += generateRandomLetter();
//       counter = 0;
//     }

//     const lowerChar = originalChar.toLowerCase();
//     const index = alphabet.indexOf(lowerChar);

//     if (index === -1) {
//       // 2. Non-Alphabetic Characters
//       encryptedMessage += originalChar;
//     } else {
//       // 3. Core Caesar Cipher Logic
//       // A common way to handle positive/negative shifts and modulo correctly in JS
//       // is to use Math.floor for the negative shifts.
//       let newIndex = (index + shiftValue) % alphabet.length;

//       // Handle negative results from the modulo (e.g., -1 % 26 is -1 in JS)
//       if (newIndex < 0) {
//         newIndex += alphabet.length;
//       }

//       const newChar = alphabet[newIndex];

//       // 4. Case Preservation
//       // Check if the original character was uppercase.
//       // The 'character !== lowerChar' check reliably confirms it's a letter AND it's uppercase.
//       if (
//         originalChar === originalChar.toUpperCase() &&
//         originalChar !== lowerChar
//       ) {
//         encryptedMessage += newChar.toUpperCase();
//       } else {
//         encryptedMessage += newChar;
//       }

//       counter++;
//     }

//     return encryptedMessage;
//   }
// }
// Was originally thinking that I needed two separate funtions instead of just creating a series of if statements and referencing a separate generate random letter function.
//My mentor Taofeek Adesina helped me create these series of nested conditons to match the criteria for the project
function encrypt(message, shiftValue) {
  //declare the function and parameters
  let encryptedMessage = ""; //message is stored in a string
  let counter = 0; //initilize counter to track when to insert a letter
  for (let i = 0; i < message.length; i++) {
    //start loop
    const originalChar = message[i]; //stores character with original casing
    const letter = message[i].toLowerCase(); //defining letter and making lowercase to match alphabet
    const index = alphabet.indexOf(letter); //find index of lowercase letter
    if (counter === 2) {
      //Checks if we are about to process the third character (index 2) of the original message.
      encryptedMessage += generateRandomLetter(); //nserts a random letter into the output
      counter = 0; //reset counter after random insertion
    }
    if (index === -1) {
      //checks if the letter is not a letter
      encryptedMessage += originalChar; //adds the non-letter character directly
    } else {
      let newIndex = (index + shiftValue) % alphabet.length; //Calculates the shifted index. Using modulo % correctly handles shifts that wrap around the alphabet
      if (newIndex < 0) {
        newIndex += alphabet.length;
      }

      //  Preserve Case
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
console.log(encrypt("Hello Brutus, meet me at the high gardens!!", 42)); //test encrypt function
// //Step 2: After every two letters, insert a random letter from the alphabet.
// //if statements for inserting random letter and passing over other characters?
// //what should the parameters be?
// //function insertRandom ()?
// //had to google this one mainly mumbo jumbo but found (i + 1) % 2 == 0 checks if the current character is the second after
// // //looking into random methods
//first attempt at extra letters function works but adds random letter after every character not every two characters
// function extraLetters(encryptedMessage) {
//   let randomEncryptedMessage = "";
//   for (let i = 0; i < encryptedMessage.length; i++) {
//     randomEncryptedMessage += encryptedMessage[i];
//     (i + 1) % 2 === 0;
//     const insertRandom = Math.floor(Math.random() * alphabet.length);
//     randomEncryptedMessage += alphabet[insertRandom];
//   }
//   return randomEncryptedMessage;
// }

//second attempt at extra letters function with counter to only insert after every two original characters
// function extraLetters(encryptedMessage) {
//   let randomEncryptedMessage = "";
//   for (let i = 0; i < encryptedMessage.length; i++) {
//     randomEncryptedMessage += encryptedMessage[i];
//     if ((i + 1) % 3 === 0) {
//       const insertRandom = Math.floor(Math.random() * alphabet.length);
//       randomEncryptedMessage += alphabet[insertRandom];
//       console.log("random letter added:", randomLetter);
//       console.log(randomEncryptedMessage);
//     }
//   }

//   return randomEncryptedMessage;
// }

// console.log(extraLetters("xubbe rhkjki!"));

function generateRandomLetter() {
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

// Take in the encrypted message and a shift value and return the original plaintext message.
//Accurately reverse the encryption process to retrieve the original message.

//The decryption function is the inverse of the encryption function. When applied sequentially, they cancel each other out, restoring the original message.
//- **Introduce Random Letters**: After every two characters in the encrypted message, insert a random letter. This will make your encrypted message longer than the original.
// - When decrypting, you'll need a strategy to skip over these random letters to get back the original message.
// - Keep a counter to track every two characters. Reset this counter after inserting a random letter.
// - Be careful when skipping over random letters during decryption. Ensure you don't accidentally skip over a valid encrypted character.
// let secretMessage = [
//   "IueuanjrxuqcjythdykwxajmixkqtaemlebvwHenckvbkeirqdmtfHukckvi.rJbxuihus,tmxayiwfuxhsjxauamenhtv'zQkhhuubyjkit'yjewjhxuxmxydatij.zJxmuhvymhihjajelkldlsuyjbdyjuyiduekdhqIbkqsxaxsxqqdvduzbwuqzhdoiqjxwuwaueoxjemjfxuydpuntjdgkvuiwj.",
// ];
// function removeRandomInsertions(secretMessage) {
//   let cleanedMessage = [];
//   for (let i = 0; i < secretMessage.length; i++) {
//     if ((i + 1) % 3 !== 0) {
//       cleanedMessage += secretMessage[i]; //add character to cleaned message if not in third position
//     }
//     return cleanedMessage;
//   }
// }
// // //.push?
// // //array.from(secretMessage)? other array methods? filer?
// // console.log(cleanedMessage, secretMessage);
// // ok random letter need to be dealt with first
// //removeRandomInsertions() function: The logic (i + 1) % 3 != 0 ensures we keep characters that are not in the 3rd, 6th, 9th, etc., positions, effectively removing the random insertions.
// // need to skip every third letter since those are the random ones
// //"Iueuan jrxuq cjythdykwxaj mixkqtaeml ebv wHenckvbkei rqdmt fHukckvi.r Jbxuihus,tmxayiwfuxh sjxau amenhtv 'zQkhhuubyjkit' yjew jhxux mxydatij. zJxmu hvymhihj ajel kldlsuyjb dyju yid uekdh qIbkqsxa xsxqqdvduzb wuqzhdoi qjxwu waueo xjem jfxuy dpuntj dgkvuiwj.");
// NOT NEEDED
// function removeRandomInsertions(secretMessage) {
//   let cleanedMessage = ""; // initialize empty string to store cleaned message
//   for (let i = 0; i < secretMessage.length; i++) {
//     if ((i + 1) % 3 !== 0) {
//       cleanedMessage += secretMessage[i]; //add character to cleaned message if not in third position
//       console.log(secretMessage(i));
//     }
//   }
//   return cleanedMessage;
// }
// //THIS IS WORKING CORRECTLY NOW "xubbe rhkjki, cuuj cu qj jxu xywx wqhtudi."
// //google how to skip letters in a string?
// //substring () method? https://www.w3schools.com/java/ref_string_substring.asp definetiely not right method
// // //Stringbuilder?
// // ok instructions say to use a counter that resets after every two letters
// // function decrypt(cleanedMessage, shiftValue) {

// //   let count = 0; //counter to track every two letters
// //   for (let i = 0; i < secretMessage.length; i++) {
// //     let character = secretMessage[i].toLowerCase();  //defining character and making lowercase to match alphabet
// //     if (alphabet.includes(character)) {
// //       count++; //increment counter for valid letters
// //The issue is in the decryption function where the shift logic was incorrect and getting a negative index
//consulted gemini to help with debugging and refining a working decrypt. My mentor Taofeek Adesina also helped a lot with this section creating the structure for if conditions to run through the loop
function decrypt(message, shiftValue) {
  let readSecretMessage = ""; // initialize result string
  let counter = 0; //initialize counter
  const decryptionShift = -shiftValue;
  for (let i = 0; i < message.length; i++) {
    //start loop
    let character = message[i]; //get character from encrypted message
    //    const index = alphabet.indexOf(character.toLowerCase()); //finds the index of character
    if (counter === 2) {
      //Checks if the current character is the random one
      counter = 0; //reset counter
      continue; //skips current character and moves to the next loop iteration therefore removing the random character insertion
    }
    const letter = character.toLowerCase();
    const index = alphabet.indexOf(letter);
    if (index === -1) {
      //handles non-alphabetic characters
      readSecretMessage += character; //appends non letters directly
    } else {
      //start decrytion logic
      let newIndex = (index + decryptionShift) % alphabet.length; //calculates the shifted index backwards
      if (newIndex < 0) {
        //BUG: This combines the uppercase check with the negative index check, which is incorrect.
        // These should be handled separately. The index must be corrected first, then the case applied.
        newIndex += alphabet.length; //corrects the negative index
      }
      const decryptedChar = alphabet[newIndex];
      if (character === character.toUpperCase()) {
        readSecretMessage += decryptedChar.toUpperCase();
      } else {
        readSecretMessage += decryptedChar;
      }
    }
    counter++; //increments the counter for the processed character
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
