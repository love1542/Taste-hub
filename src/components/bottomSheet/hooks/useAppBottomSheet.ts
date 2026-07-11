import { useContext } from "react";
import { BottomSheetContext } from "../bottomSheetContext";

export const useAppBottomSheet = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error(
      "useAppBottomSheet must be used inside BottomSheetProvider"
    );
  }

  return context;
};