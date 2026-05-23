import { useEffect, useRef, useState } from "react";
import { likeService } from "../services/like";
import { showToast } from "../utils/toast";
import { useAuth } from "../context/auth/useAuth";

export function useLike(entryId: number) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const likedRef = useRef(liked);

  useEffect(() => {
    likedRef.current = liked;
  }, [liked]);

  useEffect(() => {
    void likeService.count(entryId).then(({ count }) => setCount(count));

    if (user) {
      void likeService
        .status(entryId)
        .then(({ liked }) => setLiked(liked))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [entryId, user]);

  const toggle = async () => {
    const wasLiked = likedRef.current;
    setIsToggling(true);
    setLiked(!wasLiked);
    setCount((prev) => (wasLiked ? prev - 1 : prev + 1));
    try {
      const { liked } = await likeService.toggle(entryId);
      setLiked(liked);
      if (liked !== !wasLiked) {
        setCount((prev) => (liked ? prev + 1 : prev - 1));
      }
    } catch {
      setLiked(wasLiked);
      setCount((prev) => (wasLiked ? prev + 1 : prev - 1));
      showToast.error("Failed to toggle like");
    } finally {
      setIsToggling(false);
    }
  };

  return { liked, count, isLoading, isToggling, toggle };
}
