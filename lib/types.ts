export interface Connection {
  id: string;
  name: string;
  sharedSecretBase64: string;
  public_key: string;
  one_to_one_room_id: string;
  one_to_one_message_secret: string;
}

export interface Room {
  id: string;
  roomName: string;
  creator: {
    id: string;
    name: string;
  };
  room_id: string;
  room_message_secret: string;
}

export interface PersonalRoom extends Room {}

export interface TextMessage {
  type: "TEXT";
  content: string;
}

export interface AssetMessage {
  type: "ASSET";
  content: string;
}

export type MessageContent = TextMessage | AssetMessage;

export interface Message {
  id: string;
  creator_id: string;
  creator_name: string;
  messageType: MessageContent["type"];
  content: MessageContent["content"];
  created_at: string;
}
