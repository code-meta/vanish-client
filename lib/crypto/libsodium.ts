import _sodium from "libsodium-wrappers";

export async function gen_crypto_box_keypair() {
  await _sodium.ready;
  const sodium = _sodium;

  const box_keypair = sodium.crypto_box_keypair();

  const publicKeyBase64 = sodium.to_base64(box_keypair.publicKey);
  const privateKeyBase64 = sodium.to_base64(box_keypair.privateKey);

  return { publicKeyBase64, privateKeyBase64 };
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
