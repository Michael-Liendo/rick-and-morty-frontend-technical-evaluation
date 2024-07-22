export default function getId(url: string) {
  const splitWords = url.split('');
  return splitWords[splitWords.length - 1];
}
