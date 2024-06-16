import { useEffect, useState } from "react";
import { auth } from "@/store";
import { onAuthStateChanged } from "firebase/auth";

const useUserId = (): string | null => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user?.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  return userId;
};

export default useUserId;
