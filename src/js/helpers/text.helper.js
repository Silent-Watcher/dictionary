export default function capitalize(word) {
  let firstLetter = word.charAt(0);
  return firstLetter.toUpperCase() + word.slice(1);
}
