export const encryptData = async (obj: object, password: string) => {
  try {
    const jsonString = JSON.stringify(obj);

    // Generate a random salt and derive a key
    const salt = crypto.getRandomValues(new Uint8Array(16)); // 16-byte salt
    const derivedKey = await deriveKey(password, salt);

    // Encrypt the JSON string
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte Initialization Vector
    const encodedData = new TextEncoder().encode(jsonString);
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      derivedKey,
      encodedData
    );

    // Convert encrypted data and IV to Base64 and save to localStorage
    const encryptedData = btoa(
      String.fromCharCode(...new Uint8Array(encrypted))
    );
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const saltBase64 = btoa(String.fromCharCode(...salt));

    return { salt: saltBase64, iv: ivBase64, data: encryptedData };
  } catch (error) {
    return { error: "Encryption Failed!" };
  }
};

// ! derive a key

export async function deriveKey(
  password: string,
  salt: Uint8Array<ArrayBuffer>
) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt, // Use the provided salt
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// ! decrypt data

export const decryptData = async (
  encryptedString: string,
  password: string
) => {
  try {
    const { salt, iv, data } = JSON.parse(encryptedString);

    // Decode salt and IV from Base64
    const saltArray = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));
    const ivArray = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
    const encryptedArray = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));

    // Derive the same cryptographic key using the saved salt
    const derivedKey = await deriveKey(password, saltArray);

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivArray },
      derivedKey,
      encryptedArray
    );

    // Convert decrypted data back to JSON object
    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (error) {
    return { error: "Decryption Failed!" };
  }
};

// ! encrypt file



export const encryptFile = async (file: File, password: string) => {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Generate a random salt and derive a key
    const salt = crypto.getRandomValues(new Uint8Array(16)); // 16-byte salt
    const derivedKey = await deriveKey(password, salt);

    // Generate a random initialization vector (IV) for AES-GCM
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV

    // Encrypt the file data (ArrayBuffer) using AES-GCM
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      derivedKey,
      arrayBuffer
    );

    // Convert encrypted data and IV to Base64
    const encryptedData = btoa(
      String.fromCharCode(...new Uint8Array(encrypted))
    );
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const saltBase64 = btoa(String.fromCharCode(...salt));

    // Return the encrypted data along with the salt and IV (all encoded in Base64)
    return { salt: saltBase64, iv: ivBase64, data: encryptedData };
  } catch (error) {
    console.error("Encryption failed:", error);
    return { error: "Encryption Failed!" };
  }
};
