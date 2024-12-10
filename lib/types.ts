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
  iv: string;
  salt: string;
  content: string;
}

export interface AssetMessage {
  type: "ASSET";
  iv: string;
  salt: string;
  url: string;
}

export type MessageContent = TextMessage | AssetMessage;

export interface Message {
  id: string;
  creator_id: string;
  creator_name: string;
  created_at: string;
  messagePayload: MessageContent;
}

export interface RoomBase {
  id: string;
  messageSecret: string;
}

export interface OneToOneRoom extends RoomBase {
  type: "DIRECT";
  sharedSecretBase64: string;
}

export interface ManyToManyRoom extends RoomBase {
  type: "MANY";
  roomName: string;
  creator: {
    id: string;
    name: string;
  };
}

export type ChatRoom = OneToOneRoom | ManyToManyRoom;

export interface SelectedChatRoom {
  type: ChatRoom["type"];
  roomId: string;
  room: ChatRoom;
}
