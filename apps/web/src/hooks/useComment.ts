import type { CommentWithUserEntity } from "@hobbies-dashboard/types";
import { useEffect, useState } from "react";
import { commentService } from "../services/comment";
import { showToast } from "../utils/toast";

export function useComment(entryId: number) {
  const [comments, setComments] = useState<CommentWithUserEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    commentService
      .findAll(entryId)
      .then(({ data }) => setComments(data))
      .finally(() => setIsLoading(false));
  }, [entryId]);

  const addComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      const newComment = await commentService.create(entryId, { content });
      setComments((prev) => [...prev, newComment]);
    } catch {
      showToast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateComment = async (commentId: number, content: string) => {
    setIsSubmitting(true);
    try {
      const updatedComment = await commentService.update(entryId, commentId, {
        content,
      });
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? updatedComment : c)),
      );
    } catch {
      showToast.error("Failed to update comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await commentService.delete(entryId, commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      showToast.error("Failed to delete comment");
    }
  };

  return {
    comments,
    isLoading,
    isSubmitting,
    addComment,
    updateComment,
    deleteComment,
  };
}
