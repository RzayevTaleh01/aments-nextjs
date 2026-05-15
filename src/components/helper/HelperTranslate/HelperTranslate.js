export default function HelperTranslate(props) {
  const { translateText, translatedText, defaultText } = props ?? {};
  return translateText ?? translatedText ?? defaultText ?? "";
}

