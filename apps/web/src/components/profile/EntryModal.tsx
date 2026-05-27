import * as Dialog from "@radix-ui/react-dialog";
import Button from "../ui/Button";
import {
  Check,
  ChevronDown,
  Globe,
  Heart,
  Lock,
  MessageCircleIcon,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "../../utils/utils";
import { Card } from "../ui/Card";
import type {
  CreateCommentDto,
  CreateEntryDto,
  EntryWithUserHobbyEntity,
} from "@hobbies-dashboard/types";
import { format, formatDate, formatRelative, subDays } from "date-fns";
import Input from "../ui/Input";
import { useCallback, useRef, useState } from "react";
import { entryService } from "../../services/entry";
import { showToast } from "../../utils/toast";
import { useEntryMood } from "../../hooks/useEntryMood";
import { useLike } from "../../hooks/useLike";
import RadioPill from "../ui/RadioPill";
import TextArea from "../ui/TextArea";
import { useAuth } from "../../context/auth/useAuth";
import { useComment } from "../../hooks/useComment";
import { useForm } from "react-hook-form";
import { useRequireAuth } from "../../hooks/useRequireAuth";

type View = "default" | "delete" | "visibility" | "edit";

interface LogEntryModalProps {
  open: boolean;
  onClose: () => void;
  data: EntryWithUserHobbyEntity;
  onRefresh: () => Promise<void>;
}

function EntryModal({ open, onClose, data, onRefresh }: LogEntryModalProps) {
  const hobby = data.userHobby.hobby;
  const entryUser = data.userHobby.user;
  const hasImage = !!data.image;
  const isPublic = data.visibility === "PUBLIC";
  const switchingToPublic = !isPublic;

  const { entryMoods } = useEntryMood();
  const { liked, count, isToggling, toggle } = useLike(data.id);
  const {
    comments,
    isSubmitting: isSubmittingComment,
    addComment,
  } = useComment(data.id);
  const { user } = useAuth();

  const requireAuth = useRequireAuth();

  const [view, setView] = useState<View>("default");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editTitle, setEditTitle] = useState(data.title ?? "");
  const [editNote, setEditNote] = useState(data.note ?? "");
  const [editMoodId, setEditMoodId] = useState<number | undefined>(
    data.moodId ?? undefined,
  );
  const [editDate, setEditDate] = useState(
    data.activityDate
      ? new Date(data.activityDate).toISOString().split("T")[0]
      : "",
  );
  const [canScrollDownNote, setCanSCrollDownNote] = useState(false);

  const scrollCleanup = useRef<(() => void) | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollCallback = useCallback((el: HTMLDivElement | null) => {
    scrollCleanup.current?.();
    scrollCleanup.current = null;
    scrollRef.current = el;
    if (!el) return;
    const check = () =>
      setCanSCrollDownNote(
        el.scrollTop + el.clientHeight < el.scrollHeight - 1,
      );
    el.addEventListener("scroll", check);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    check();
    scrollCleanup.current = () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, []);

  const enterEdit = () => {
    setEditTitle(data.title ?? "");
    setEditNote(data.note ?? "");
    setEditMoodId(data.moodId ?? undefined);
    setEditDate(
      data.activityDate
        ? new Date(data.activityDate).toISOString().split("T")[0]
        : "",
    );
    setView("edit");
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await entryService.delete(data.id);
      showToast.success("Entry deleted.");
      onRefresh();
      onClose();
    } catch {
      showToast.error("Failed to delete entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVisibilityToggle = async () => {
    const newVisibility = data.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    setIsSubmitting(true);
    try {
      await entryService.update(data.id, { visibility: newVisibility });
      showToast.success(
        `Entry is now ${newVisibility === "PUBLIC" ? "public" : "private"}.`,
      );
      await onRefresh();
      setView("default");
    } catch {
      showToast.error("Failed to update visibility.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSave = async () => {
    setIsSubmitting(true);
    try {
      const updates: Partial<CreateEntryDto> = {
        title: editTitle || undefined,
        note: editNote || undefined,
        moodId: editMoodId,
        activityDate: editDate ? new Date(editDate) : undefined,
      };
      await entryService.update(data.id, updates);
      showToast.success("Entry updated.");
      await onRefresh();
      setView("default");
    } catch {
      showToast.error("Failed to update entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateCommentDto>();

  const onSubmit = async (formData: CreateCommentDto) => {
    await addComment(formData.content);
    reset();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#080c14e6] backdrop-blur-md" />

        {/* Content */}
        <Dialog.Content
          className={cn(
            "fixed inset-0 z-50",
            "overflow-y-auto",
            "border-none bg-transparent shadow-none outline-none",
          )}
        >
          <Dialog.Close asChild>
            <Button
              variant="translucent"
              shape="pill"
              size="icon"
              className="fixed top-4 right-[max(2rem,calc((100vw-90rem)/2-2rem))] z-60 text-white"
            >
              <X size={16} />
            </Button>
          </Dialog.Close>

          <div className="flex min-h-full w-full flex-col items-center px-4 py-16">
            <div
              className={cn(
                "flex w-full flex-col gap-4",
                hasImage ? "max-w-5xl" : "max-w-2xl",
              )}
            >
              {/* Image/Logo and Content */}
              <div
                className={cn(
                  "flex flex-col gap-4",
                  hasImage && "md:h-130 md:flex-row",
                )}
              >
                {/* Image or Hobby Logo */}
                {hasImage ? (
                  <Card className="aspect-square flex-6 overflow-hidden border-none p-0 md:h-full md:min-h-0">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="size-full object-cover"
                    />
                  </Card>
                ) : (
                  <Card
                    className="flex flex-col items-center justify-center gap-3 py-10"
                    style={{
                      background: `${hobby.color}18`,
                      borderColor: `${hobby.color}30`,
                    }}
                  >
                    <span className="text-5xl">{hobby.icon}</span>
                    <div
                      className="rounded-full px-3 py-1 text-sm"
                      style={{
                        background: `${hobby.color}30`,
                        color: hobby.color,
                      }}
                    >
                      {hobby.name}
                    </div>
                  </Card>
                )}

                {/* Entry Content Card */}
                <Card
                  className={cn(
                    "flex max-h-120 flex-col overflow-hidden md:max-h-130",
                    hasImage && "-order-1 flex-4 md:order-2",
                  )}
                >
                  {/* Header — always visible */}
                  <div className="mb-2 flex justify-between">
                    <div
                      className="flex size-fit items-center justify-center gap-2 rounded-full px-2 py-1 text-sm"
                      style={{ backgroundColor: hobby.color }}
                    >
                      <span>{hobby.icon}</span>
                      <span className="text-white">{hobby.name}</span>
                    </div>
                    {data.mood && (
                      <div className="text-muted-foreground flex items-center justify-center gap-2">
                        <span className="text-md">{data.mood.icon}</span>
                        <span className="text-xs">{data.mood.name}</span>
                      </div>
                    )}
                  </div>

                  {/* --- DEFAULT VIEW --- */}
                  {view === "default" && (
                    <>
                      <div className="flex min-h-0 flex-1 flex-col">
                        <div className="mb-4">
                          <Dialog.Title className="text-2xl">
                            {data.title}
                          </Dialog.Title>
                          <p className="text-muted-foreground text-xs">
                            {format(new Date(data.activityDate), "PPPPp")}
                          </p>
                        </div>
                        <div
                          ref={scrollCallback}
                          className="scrollbar-custom relative min-h-0 flex-1 overflow-y-auto"
                        >
                          <Dialog.Description className="text-muted-foreground min-h-0 flex-1 text-sm leading-relaxed">
                            {data.note}
                          </Dialog.Description>
                          {canScrollDownNote && (
                            <div className="sticky bottom-0 h-0 overflow-visible md:hidden">
                              <Button
                                shape="pill"
                                size="icon"
                                onClick={() =>
                                  scrollRef.current?.scrollTo({
                                    top: scrollRef.current.scrollHeight,
                                    behavior: "smooth",
                                  })
                                }
                                className={cn(
                                  "absolute bottom-2 left-1/2 size-8 -translate-x-1/2",
                                  "bg-hobbly-sky-dark text-white opacity-75 hover:opacity-100",
                                )}
                              >
                                <ChevronDown />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-border mt-4 mb-2 border" />

                      <div className="flex flex-col">
                        <div className="mb-2 flex items-center gap-4">
                          {entryUser?.profilePicture ? (
                            <img
                              src={entryUser.profilePicture}
                              className="size-8 shrink-0 rounded-full object-cover"
                              alt={entryUser.username}
                            />
                          ) : (
                            <div className="from-hobbly-sky to-hobbly-lavender flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold text-white">
                              {entryUser?.username?.[0].toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {entryUser.displayName ?? entryUser.username}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              @{entryUser.username}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="transparent"
                            className={cn(
                              "p-2",
                              liked ? "text-destructive" : "",
                            )}
                            disabled={isToggling}
                            onClick={() => requireAuth(toggle)}
                          >
                            <Heart
                              size={16}
                              fill={liked ? "currentColor" : "none"}
                            />
                            <span>
                              {count > 0 && count}{" "}
                              {count > 1 ? "likes" : "like"}
                            </span>
                          </Button>
                          <Button variant="transparent" className="p-2">
                            <MessageCircleIcon size={16} />
                            <span>comment</span>
                          </Button>
                        </div>

                        {user?.id === entryUser.id && (
                          <>
                            <div className="border-border mb-4 border" />
                            <div className="flex justify-between">
                              <div className="flex gap-2">
                                <Button
                                  shape="pill"
                                  size="sm"
                                  onClick={() => setView("visibility")}
                                  className={cn(
                                    isPublic
                                      ? "bg-hobbly-green/10 text-hobbly-green hover:bg-hobbly-green/20"
                                      : "bg-foreground text-background hover:bg-foreground/90",
                                  )}
                                >
                                  {isPublic ? (
                                    <Globe size={12} />
                                  ) : (
                                    <Lock size={12} />
                                  )}
                                  {isPublic ? "Public" : "Private"}
                                </Button>
                                <Button
                                  variant="secondary"
                                  shape="pill"
                                  size="sm"
                                  className="text-muted-foreground"
                                  onClick={enterEdit}
                                >
                                  Edit
                                </Button>
                              </div>
                              <Button
                                shape="pill"
                                size="sm"
                                className="bg-destructive/10 text-destructive hover:bg-destructive/20"
                                onClick={() => setView("delete")}
                              >
                                Delete
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}

                  {/* --- DELETE CONFIRM VIEW --- */}
                  {view === "delete" && (
                    <>
                      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-6 text-center">
                        <Trash2
                          size={48}
                          className="text-destructive mb-2 opacity-80"
                        />
                        <Dialog.Title className="text-xl">
                          Delete this entry?
                        </Dialog.Title>
                        <Dialog.Description className="text-muted-foreground text-sm">
                          This can't be undone.
                        </Dialog.Description>
                      </div>

                      <div className="border-border mb-4 border" />
                      <div className="flex gap-2">
                        <Button
                          shape="pill"
                          fullWidth
                          className="bg-destructive hover:bg-destructive/90 text-white"
                          disabled={isSubmitting}
                          onClick={handleDelete}
                        >
                          Yes, delete
                        </Button>
                        <Button
                          variant="secondary"
                          shape="pill"
                          fullWidth
                          disabled={isSubmitting}
                          onClick={() => setView("default")}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}

                  {/* --- VISIBILITY CONFIRM VIEW --- */}
                  {view === "visibility" && (
                    <>
                      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-6 text-center">
                        <span className="mb-2 text-5xl">
                          {switchingToPublic ? "🌏" : "🔒"}
                        </span>
                        <Dialog.Title className="text-xl">
                          {switchingToPublic
                            ? "Make this public?"
                            : "Make this private?"}
                        </Dialog.Title>
                        <Dialog.Description className="text-muted-foreground max-w-xs text-sm">
                          {switchingToPublic
                            ? "This entry will appear on your profile and be visible to everyone."
                            : "This entry will be hidden from your profile. Only you can see it."}
                        </Dialog.Description>
                      </div>

                      <div className="border-border mb-4 border" />
                      <div className="flex gap-2">
                        <Button
                          shape="pill"
                          fullWidth
                          className={cn(
                            switchingToPublic
                              ? "bg-hobbly-green hover:bg-hobbly-green/90 text-white"
                              : "bg-foreground text-background hover:bg-foreground/90",
                          )}
                          disabled={isSubmitting}
                          onClick={handleVisibilityToggle}
                        >
                          <Check size={14} />
                          {switchingToPublic
                            ? "Yes, make public"
                            : "Yes, make private"}
                        </Button>
                        <Button
                          variant="secondary"
                          shape="pill"
                          fullWidth
                          disabled={isSubmitting}
                          onClick={() => setView("default")}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}

                  {/* --- EDIT VIEW --- */}
                  {view === "edit" && (
                    <>
                      <div className="scrollbar-custom min-h-0 flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-4 py-1">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-muted-foreground text-xs">
                              Title
                            </label>
                            <Input
                              variant="auth"
                              shape="pill"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="What did you do?"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-muted-foreground text-xs">
                              Note
                            </label>
                            <TextArea
                              variant="auth"
                              shape="rounded"
                              rows={4}
                              value={editNote}
                              onChange={(e) => setEditNote(e.target.value)}
                              placeholder="What happened? How did it feel?"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-muted-foreground text-xs">
                              Mood
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {entryMoods.map((mood) => (
                                <RadioPill
                                  key={mood.id}
                                  ref={null}
                                  name="editMood"
                                  label={mood.name}
                                  icon={mood.icon}
                                  value={mood.id}
                                  activeColor={hobby.color}
                                  isChecked={editMoodId === mood.id}
                                  onChange={() => setEditMoodId(mood.id)}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-muted-foreground text-xs">
                              Activity Date
                            </label>
                            <Input
                              type="date"
                              variant="auth"
                              shape="pill"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-border mt-4 mb-4 border" />
                      <div className="flex gap-2">
                        <Button
                          shape="pill"
                          fullWidth
                          variant="gradient"
                          disabled={isSubmitting}
                          onClick={handleEditSave}
                        >
                          <Check size={14} />
                          Save changes
                        </Button>
                        <Button
                          variant="secondary"
                          shape="pill"
                          fullWidth
                          disabled={isSubmitting}
                          onClick={() => setView("default")}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}
                </Card>
              </div>

              {/* Comments */}
              <Card>
                <div className="mb-2 flex items-center gap-2">
                  <h3>Comments</h3>
                  <div className="bg-accent rounded-full px-2 py-1 text-xs">
                    {comments.length}
                  </div>
                </div>

                {/* Comment collection */}
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="mb-4 flex items-center gap-2"
                  >
                    {comment.user.profilePicture ? (
                      <img
                        src={comment.user.profilePicture}
                        alt={`${comment.user.username}'s profile picture`}
                        className="size-10 shrink-0 self-start rounded-full object-cover"
                      />
                    ) : (
                      <div className="from-hobbly-sky to-hobbly-lavender flex size-10 shrink-0 items-center justify-center self-start rounded-full bg-linear-to-br text-sm font-bold text-white">
                        {comment.user.username?.[0].toUpperCase()}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span>
                          {comment.user.displayName ??
                            `@${comment.user.username}`}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {new Date(comment.createdAt) < subDays(new Date(), 6)
                            ? formatDate(comment.createdAt, "PP")
                            : formatRelative(comment.createdAt, new Date())}
                        </span>
                      </div>
                      <div className="text-sm">{comment.content}</div>
                    </div>
                  </div>
                ))}

                {/* Comment Input */}
                {user && (
                  <>
                    <div className="border-border my-4 border" />
                    <div className="flex items-center gap-2">
                      {user?.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt=""
                          className="size-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="from-hobbly-sky to-hobbly-lavender flex size-10 shrink-0 items-center justify-center self-start rounded-full bg-linear-to-br text-sm font-bold text-white">
                          {user?.username?.[0].toUpperCase()}
                        </div>
                      )}

                      <form
                        onSubmit={(e) => { e.preventDefault(); requireAuth(() => handleSubmit(onSubmit)(e)); }}
                        className="flex w-full items-center justify-center gap-2"
                      >
                        <Input
                          variant="auth"
                          shape="pill"
                          fullWidth
                          placeholder="Write a comment..."
                          autoComplete="off"
                          disabled={isSubmittingComment}
                          {...register("content", {
                            maxLength: {
                              value: 8000,
                              message: "Comment cannot exceed 8000 characters",
                            },
                          })}
                        />
                        <Button
                          type="submit"
                          variant="secondary"
                          shape="pill"
                          size="icon"
                          className="size-10 shrink-0"
                          disabled={isSubmittingComment}
                        >
                          <Send size={20} />
                        </Button>
                      </form>
                    </div>
                    {errors.content && (
                      <p className="text-destructive mt-2 text-center text-xs">
                        {errors.content.message}
                      </p>
                    )}
                  </>
                )}
              </Card>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EntryModal;
