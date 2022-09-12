/* Check if string is a valid Hashtag */
function checkIfValidHashtag(str) {
 // Regular expression to check if string is a hashtag
 const regexExp = /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi;

 return regexExp.test(str);
}

function generateHashtags(str) {
 let hashtags = "";

 const listStrings = str.trim().split(/\s+/);

 listStrings.forEach((string, i) => {
  if (checkIfValidHashtag(string)) {
   hashtags = hashtags.concat(string + " ");
  }
 });

 return hashtags;
}

module.exports = { generateHashtags, checkIfValidHashtag };
