import { encryptData } from "../crypto";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removePersonalRooms } from "../features/user/userSlice";
import { getStorageItem, storeItem } from "../db/indexedDb";
import { useToast } from "@/hooks/use-toast";
import { PersonalRoom } from "../types";

export default function useHandlePersonalRooms() {
  const { toast } = useToast();

  const user = useAppSelector((state) => state.user.user);
  const personalRooms = useAppSelector((state) => state.user.personalRooms);

  const dispatch = useAppDispatch();

  async function updateStoredPersonalRooms(
    updatedPersonalRooms: PersonalRoom[]
  ) {
    const storedPersonalRooms = await getStorageItem("personalRooms");

    if (storedPersonalRooms) {
      const encryptedPersonalRooms = await encryptData(
        [...updatedPersonalRooms],
        user.privateKeyBase64
      );
      await storeItem("personalRooms", JSON.stringify(encryptedPersonalRooms));
    }
  }

  async function handleRemovePersonalRoom(id: string) {
    try {
      const updatedPersonalRooms = [...personalRooms].filter(
        (item) => item.id !== id
      );

      updateStoredPersonalRooms([...updatedPersonalRooms]);

      dispatch(removePersonalRooms(id));

      toast({
        title: "The room has been successfully removed.",
      });
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description:
          "An unexpected error occurred. Please refresh the page and try again.",
        variant: "destructive",
      });
    }
  }

  return {
    handleRemovePersonalRoom,
  };
}
