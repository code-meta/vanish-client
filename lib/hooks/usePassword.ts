import generator from "generate-password";

export default function usePassword() {
  function genStrongPassword() {
    const strong_password = generator.generate({
      length: 16,
      numbers: true,
      uppercase: true,
      lowercase: true,
      strict: true,
      symbols: true,
      excludeSimilarCharacters: true,
      exclude: `"'"*+.,;:{}()/\\!~^|&<>[]{}?=_-%|`,
    });
    return strong_password;
  }

  return { genStrongPassword };
}
