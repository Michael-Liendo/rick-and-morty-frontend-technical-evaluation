export default function getId(url: string) {
  const splitWords = url.trim().split('');
  return splitWords[splitWords.length - 1];
}
