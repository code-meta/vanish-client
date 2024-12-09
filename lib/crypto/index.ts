export { encryptData, decryptData, deriveKey } from "./web_crypto_data";

export {
  gen_crypto_box_keypair,
  to_base64_for_string,
  create_new_connection,
  genRandomKey,
} from "./libsodium";

(async () => {
  const key = "myEncryptedData";
  const password = "xEr6jM<*vu8UCjx1";
  const myObject = { name: "John", age: 30 };

  // Encrypt and save to localStorage
  // await encryptAndSaveToLocalStorage(key, myObject, password);

  // Later, decrypt from localStorage
  try {
    // const decryptedData = await decryptFromLocalStorage(key, password);
    // console.log("Decrypted Data:", decryptedData);
  } catch (error: any) {
    console.error("Decryption failed:", error.message);
  }
})();
