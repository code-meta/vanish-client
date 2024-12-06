import _sodium from "libsodium-wrappers";

export async function gen_crypto_box_keypair() {
  await _sodium.ready;
  const sodium = _sodium;

  const box_keypair = sodium.crypto_box_keypair();

  const publicKeyBase64 = sodium.to_base64(box_keypair.publicKey);
  const privateKeyBase64 = sodium.to_base64(box_keypair.privateKey);

  return { publicKeyBase64, privateKeyBase64 };
}

export async function to_base64_for_string(value: string) {
  await _sodium.ready;
  const sodium = _sodium;

  const base64Value = sodium.to_base64(sodium.from_string(value));

  return { base64Value };
}

export async function create_new_connection(
  idBase64: string,
  nameBase64: string,
  otherPublicKey: string,
  privateKey: string
) {
  await _sodium.ready;
  const sodium = _sodium;

  const otherPublicKeyRaw = sodium.from_base64(otherPublicKey);
  const localPrivateKey = sodium.from_base64(privateKey);

  const sharedSecret = sodium.crypto_scalarmult(
    localPrivateKey,
    otherPublicKeyRaw
  );

  const randomString1 = sodium.crypto_generichash(32, sharedSecret);

  const randomString2 = sodium.crypto_generichash(32, randomString1);

  const one_to_one_room_id = sodium.to_base64(randomString1);
  const one_to_one_message_secret = sodium.to_base64(randomString2);

  const connection_id = sodium.to_string(sodium.from_base64(idBase64));
  const connection_name = sodium.to_string(sodium.from_base64(nameBase64));

  const sharedSecretBase64 = sodium.to_base64(sharedSecret);

  const newConnection = {
    id: connection_id,
    name: connection_name,
    sharedSecretBase64,
    public_key: otherPublicKey,
    one_to_one_room_id,
    one_to_one_message_secret,
  };

  return { newConnection };
}

export async function genRandomKey() {
  await _sodium.ready;
  const sodium = _sodium;

  const randomKey = sodium.randombytes_buf(32);

  const randomString1 = sodium.crypto_generichash(32, randomKey);

  return sodium.to_base64(randomString1);
}

/*







*/
async function gen_shared_public_key_name(publicKeyBase64: string) {
  await _sodium.ready;
  const sodium = _sodium;

  const name = "Donald J Trump";

  const nameBase64 = sodium.to_base64(sodium.from_string(name));

  const shareInfo = `${publicKeyBase64}.${nameBase64}`;

  console.log(shareInfo);

  const sharedNameBase64 = shareInfo.split(".")[1];

  console.log(sharedNameBase64);

  console.log(nameBase64);

  // Convert back from base64 to the original object
  const deserializedBytes = sodium.from_base64(sharedNameBase64);
  const deserializedName = sodium.to_string(deserializedBytes);

  console.log(deserializedName);
}
