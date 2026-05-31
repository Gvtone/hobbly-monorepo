import {
  Bell,
  Camera,
  CameraOff,
  ChevronRight,
  Lock,
  Palette,
  Shield,
  Trash,
  User,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useRef, useState } from "react";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/auth/useAuth";
import Input from "../components/ui/Input";
import Modal from "../components/layout/Modal";
import TextArea from "../components/ui/TextArea";
import { useForm, useWatch } from "react-hook-form";
import { useTheme } from "../context/theme/useTheme";
import SettingToggleRow from "../components/ui/SettingToggleRow";
import { userService } from "../services/user";
import { showToast } from "../utils/toast";
import type { UpdateUserDto } from "@hobbies-dashboard/types";

function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("Profile");

  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingProfilePicture, setIsUploadingProfilePicture] =
    useState(false);
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);

  const [deleteStep, setDeleteStep] = useState<0 | 1 | 2>(0);
  const [deleteEmailInput, setDeleteEmailInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await userService.deleteCurrentUser();
      await logout();
    } catch {
      showToast.error("Failed to delete account");
      setIsDeleting(false);
    }
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingProfilePicture(true);
    try {
      const updated = await userService.uploadProfilePicture(file);
      updateUser(updated);
      showToast.success("Profile picture updated");
    } catch {
      showToast.error("Failed to upload profile picture");
    } finally {
      setIsUploadingProfilePicture(false);
      e.target.value = "";
    }
  };

  const handleRemoveProfilePicture = async () => {
    setIsUploadingProfilePicture(true);
    try {
      const updated = await userService.removeProfilePicture();
      updateUser(updated);
      showToast.success("Profile picture removed");
    } catch {
      showToast.error("Failed to remove profile picture");
    } finally {
      setIsUploadingProfilePicture(false);
    }
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingCoverImage(true);
    try {
      const updated = await userService.uploadCoverImage(file);
      updateUser(updated);
      showToast.success("Cover image updated");
    } catch {
      showToast.error("Failed to upload cover image");
    } finally {
      setIsUploadingCoverImage(false);
      e.target.value = "";
    }
  };

  const COVER_PRESETS = [
    "https://res.cloudinary.com/dheojbnvv/image/upload/v1779865135/hobbly/commonAsset/backgroundImages/photo-1715626350032-96dd588c72aa_ojxlzl.webp",
    "https://res.cloudinary.com/dheojbnvv/image/upload/v1779293921/hobbly/commonAsset/backgroundImages/photo-1586380951230-e6703d9f6833_ngkkrd.webp",
    "https://res.cloudinary.com/dheojbnvv/image/upload/v1779293900/hobbly/commonAsset/backgroundImages/photo-1522383225653-ed111181a951_b4o4or.webp",
    "https://res.cloudinary.com/dheojbnvv/image/upload/v1779293891/hobbly/commonAsset/backgroundImages/photo-1577016029703-cc22a7c0c28c_g4iszx.webp",
    "https://res.cloudinary.com/dheojbnvv/image/upload/v1779293850/hobbly/commonAsset/backgroundImages/photo-1431440869543-efaf3388c585_hp92gn.webp",
  ];

  const handleRemoveCoverImage = async () => {
    setIsUploadingCoverImage(true);
    try {
      const isPreset = COVER_PRESETS.includes(user?.coverImage ?? "");
      const updated = isPreset
        ? await userService.updateCurrentUser({ coverImage: null })
        : await userService.removeCoverImage();
      updateUser(updated);
      showToast.success("Cover image removed");
    } catch {
      showToast.error("Failed to remove cover image");
    } finally {
      setIsUploadingCoverImage(false);
    }
  };

  const handleSelectCoverPreset = async (url: string) => {
    setIsUploadingCoverImage(true);
    try {
      const updated = await userService.updateCurrentUser({ coverImage: url });
      updateUser(updated);
    } catch {
      showToast.error("Failed to set cover image");
    } finally {
      setIsUploadingCoverImage(false);
    }
  };

  const isProd = import.meta.env.VITE_NODE_ENV === "production";

  const tabItems = [
    { label: "Profile", icon: User },
    { label: "Appearance", icon: Palette, devOnly: true },
    { label: "Privacy", icon: Lock, devOnly: true },
    { label: "Notifications", icon: Bell, devOnly: true },
    { label: "Account", icon: Shield },
  ];

  const dashboardLayoutSettings = [
    {
      title: "Show entry images",
      subtitle: "Display cover images on your dashboard entries",
      onClick: () => {
        console.log("hello");
      },
    },
    {
      title: "Compact widget view",
      subtitle: "Smaller widget cards for more on screen",
      onClick: () => {
        console.log("hello");
      },
    },
    {
      title: "Animate transitions",
      subtitle: "Smooth animations throughout the app",
      onClick: () => {
        console.log("hello");
      },
    },
  ];

  const profileVisibilitySettings = [
    {
      title: "Show follower count",
      subtitle: "Others can see how many people follow you",
      onClick: () => {
        console.log("hello");
      },
    },
    {
      title: "Allow profile discovery",
      subtitle: "Appear in Explore search and suggestions",
      onClick: () => {
        console.log("hello");
      },
    },
    {
      title: "Show hobby stats publicly",
      subtitle: "Display your total entries and streak counts",
      onClick: () => {
        console.log("hello");
      },
    },
  ];

  const activitySettings = [
    {
      title: "Likes on entries",
      subtitle: "When someone likes your journal entry",
      onClick: () => {
        console.log("hello");
      },
    },
    {
      title: "Comments",
      subtitle: "When someone comments on your entry",
      onClick: () => {
        console.log("hello");
      },
    },
    {
      title: "New followers",
      subtitle: "When someone starts following you",
      onClick: () => {
        console.log("hello");
      },
    },
  ];

  const digestEmailSettings = [
    {
      title: "Weekly hobby recap",
      subtitle: "A soft summary of your week's activity",
      onClick: () => {
        console.log("hello");
      },
    },
    {
      title: "Streak reminders",
      subtitle: "Gentle nudge when your streak is at risk",
      onClick: () => {
        console.log("hello");
      },
    },
    {
      title: "Community highlights",
      subtitle: "Popular entries from people you follow",
      onClick: () => {
        console.log("hello");
      },
    },
  ];

  // const accentColor = [{ name: "Lavender", color: "--hobbly-lavender" }];

  type ProfileFormData = Pick<
    UpdateUserDto,
    "displayName" | "username" | "bio"
  >;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<ProfileFormData>({
    mode: "onBlur",
    defaultValues: {
      displayName: user?.displayName ?? "",
      username: user?.username ?? "",
      bio: user?.bio ?? "",
    },
  });

  const bio = useWatch({ control, name: "bio" }) ?? "";

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updated = await userService.updateCurrentUser(data);
      updateUser(updated);
      showToast.success("Profile updated");
    } catch {
      showToast.error("Failed to update profile");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl py-10 md:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2 max-md:px-6">
          <h1 className="text-4xl">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your Hobbly profile and preferences
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left Panel */}

          <div className="flex flex-2 gap-2 overflow-x-auto max-md:px-6 md:flex-col lg:flex-1">
            {tabItems.map(({ label, icon: Icon, devOnly }) => {
              if (isProd && devOnly) return;
              return (
                <Button
                  key={label}
                  variant="ghost"
                  contentPosition="between"
                  shape="pill"
                  size="lg"
                  onClick={() => setSelectedTab(label)}
                  active={selectedTab === label}
                  fullWidth
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon size={16} />
                    <span>{label}</span>
                  </div>
                  {selectedTab === label && (
                    <ChevronRight size={16} className="max-md:hidden" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Right Panel */}
          <div className="flex flex-5 flex-col lg:flex-4">
            {/* Profile Tab */}
            {selectedTab === tabItems[0].label && (
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Profile Picture */}
                <Card className="max-md:rounded-none">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Profile picture</h3>
                    <div className="flex flex-col items-center gap-8 md:flex-row">
                      <input
                        ref={profilePictureInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                      <button
                        type="button"
                        onClick={() => profilePictureInputRef.current?.click()}
                        disabled={isUploadingProfilePicture}
                        className="border-hobbly-sky-light hover:border-hobbly-sky group relative size-30 cursor-pointer overflow-hidden rounded-full border-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {user?.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            className="h-full w-full object-cover"
                            alt={user.username}
                          />
                        ) : (
                          <div className="from-hobbly-sky to-hobbly-lavender flex h-full w-full items-center justify-center bg-linear-to-br text-5xl font-bold text-white">
                            {user?.username?.[0].toUpperCase()}
                          </div>
                        )}
                        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 hidden items-center justify-center bg-black/50 text-white group-hover:flex">
                          <Camera />
                        </div>
                      </button>
                      <div className="flex flex-col items-center gap-2 md:items-start">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            shape="pill"
                            className="size-fit"
                            disabled={isUploadingProfilePicture}
                            onClick={() =>
                              profilePictureInputRef.current?.click()
                            }
                          >
                            {isUploadingProfilePicture
                              ? "Uploading..."
                              : "Upload photo"}
                          </Button>
                          {user?.profilePicture && (
                            <Button
                              type="button"
                              variant="destructive"
                              shape="pill"
                              className="size-fit"
                              disabled={isUploadingProfilePicture}
                              onClick={handleRemoveProfilePicture}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          JPG, PNG, or GIF · Max 4MB
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Cover Image */}
                <Card className="max-md:rounded-none">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Cover image</h3>

                    <input
                      ref={coverImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverImageChange}
                    />
                    <Button
                      type="button"
                      fullWidth
                      disabled={isUploadingCoverImage}
                      className="group relative h-40 overflow-clip rounded-b-none border-none p-0 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => coverImageInputRef.current?.click()}
                    >
                      {user?.coverImage ? (
                        <img
                          src={user?.coverImage}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <CameraOff size={40} />
                      )}
                      <div className="from-card absolute top-0 right-0 left-0 z-10 h-42 overflow-hidden rounded-t-3xl bg-linear-to-t to-transparent" />
                      <div className="absolute top-0 right-0 bottom-0 left-0 z-20 hidden items-center justify-center bg-black/30 group-hover:flex">
                        <div className="flex size-fit items-center justify-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white">
                          <Camera size={16} />
                          <span>
                            {isUploadingCoverImage
                              ? "Uploading..."
                              : "Upload custom photo"}
                          </span>
                        </div>
                      </div>
                    </Button>

                    <p className="text-muted-foreground text-xs">
                      Or pick a preset
                    </p>

                    <div className="grid grid-cols-3 grid-rows-2 gap-4">
                      {/* No cover / remove */}
                      <button
                        type="button"
                        disabled={isUploadingCoverImage}
                        onClick={handleRemoveCoverImage}
                        className="relative h-16 overflow-hidden rounded-xl border-2 transition-all hover:cursor-pointer hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
                        style={
                          !user?.coverImage
                            ? {
                                borderColor: "var(--ring)",
                                boxShadow: "0 0 0 3px var(--hobbly-sky-light)",
                              }
                            : { borderColor: "transparent" }
                        }
                      >
                        <div className="from-hobbly-sky to-hobbly-lavender flex h-full w-full items-center justify-center bg-linear-to-br">
                          <CameraOff size={24} className="text-black" />
                        </div>
                        {!user?.coverImage && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <span className="text-xs font-medium text-white">
                              None
                            </span>
                          </div>
                        )}
                      </button>

                      {/* Preset images */}
                      {COVER_PRESETS.map((url) => {
                        const isSelected = user?.coverImage === url;
                        return (
                          <button
                            key={url}
                            type="button"
                            disabled={isUploadingCoverImage}
                            onClick={() => handleSelectCoverPreset(url)}
                            className="relative h-16 overflow-hidden rounded-xl border-2 transition-all hover:cursor-pointer hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
                            style={
                              isSelected
                                ? {
                                    borderColor: "var(--ring)",
                                    boxShadow:
                                      "0 0 0 3px var(--hobbly-sky-light)",
                                  }
                                : { borderColor: "transparent" }
                            }
                          >
                            <img
                              src={url}
                              className="h-full w-full object-cover object-center"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <span className="flex size-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                                  ✓
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Basic Info */}
                <Card className="max-md:rounded-none">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Basic info</h3>
                    <div className="flex flex-col">
                      <label htmlFor="displayName" className="mb-2 ml-2">
                        Display Name
                      </label>
                      <Input
                        id="displayName"
                        variant="auth"
                        shape="pill"
                        fullWidth
                        placeholder="Your display name"
                        {...register("displayName", { maxLength: 25 })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="username" className="mb-2 ml-2">
                        Username
                      </label>
                      <Input
                        id="username"
                        variant="auth"
                        shape="pill"
                        fullWidth
                        placeholder="username"
                        textCase="lowercase"
                        {...register("username", {
                          maxLength: 25,
                          validate: async (value) => {
                            if (!value || value === user?.username) return true;
                            const existing =
                              await userService.findUserByUsernamePublic(value);
                            return existing
                              ? "Username is already taken"
                              : true;
                          },
                        })}
                      />
                      {errors.username && (
                        <p className="text-destructive mt-1 ml-2 text-xs">
                          {errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="bio" className="mb-2 ml-2">
                        Bio
                      </label>
                      <TextArea
                        id="bio"
                        variant="auth"
                        shape="pill"
                        placeholder="Tell your story"
                        {...register("bio", { maxLength: 160 })}
                      />
                      <span
                        className="text-muted-foreground text-right text-xs"
                        style={
                          bio.length === 160 ? { color: "red" } : undefined
                        }
                      >
                        {bio.length}/160
                      </span>
                    </div>
                  </div>
                </Card>

                <Button
                  type="submit"
                  variant="gradient"
                  className="self-end max-md:mr-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </form>
            )}

            {/* Appearance */}
            {selectedTab === tabItems[1].label && (
              <div className="flex flex-col gap-8">
                {/* Theme */}
                <Card>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Theme</h3>
                    <div className="flex h-32 gap-4">
                      <Button
                        variant="transparent"
                        className="flex flex-1 flex-col bg-[#fbf6ee]"
                        style={
                          !isDark
                            ? {
                                border: "2px solid var(--ring)",
                                boxShadow: "0 0 0 4px var(--hobbly-sky-light)",
                              }
                            : undefined
                        }
                        onClick={toggleTheme}
                      >
                        <span className="text-2xl">☀️</span>
                        <span>Light</span>
                      </Button>
                      <Button
                        variant="transparent"
                        className="flex flex-1 flex-col bg-[#2d3a4a]"
                        style={
                          isDark
                            ? {
                                border: "2px solid var(--ring)",
                                boxShadow: "0 0 0 4px var(--hobbly-sky-light)",
                              }
                            : undefined
                        }
                        onClick={toggleTheme}
                      >
                        <span className="text-2xl">🌙</span>
                        <span className="text-white">Dark</span>
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Accent Color */}
                <Card>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Accent color</h3>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-hobbly-lavender size-12 rounded-full" />
                        <p className="text-muted-foreground text-sm">
                          Lavender
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Dashboard Layout Color */}
                <Card>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Dashboard layout</h3>
                    <div className="flex flex-col gap-4">
                      {dashboardLayoutSettings.map(
                        ({ title, subtitle, onClick }) => (
                          <SettingToggleRow
                            key={title}
                            title={title}
                            subtitle={subtitle}
                            onClick={onClick}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Privacy */}
            {selectedTab === tabItems[2].label && (
              <div className="flex flex-col gap-8">
                {/* Entry Defaults */}
                <Card>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Entry defaults</h3>
                    <div className="flex flex-col gap-4">
                      <SettingToggleRow
                        title="Default entry visibility"
                        subtitle="New entries are private by default"
                      />
                    </div>
                  </div>
                </Card>

                {/* Profile Visibility */}
                <Card>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Entry defaults</h3>
                    <div className="flex flex-col gap-4">
                      {profileVisibilitySettings.map(
                        ({ title, subtitle, onClick }) => (
                          <SettingToggleRow
                            key={title}
                            title={title}
                            subtitle={subtitle}
                            onClick={onClick}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </Card>

                {/* Data and Blocking */}
                <Card>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Data & blocking</h3>
                    <div className="flex flex-col gap-4">
                      <Button
                        variant="secondary"
                        shape="pill"
                        contentPosition="between"
                        fullWidth
                        className=""
                      >
                        <p>Manage blocked users</p>{" "}
                        <ChevronRight className="text-muted-foreground" />
                      </Button>
                      <Button
                        variant="secondary"
                        shape="pill"
                        contentPosition="between"
                        fullWidth
                        className=""
                      >
                        <p>Download my data</p>{" "}
                        <ChevronRight className="text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Notifications */}
            {selectedTab === tabItems[3].label && (
              <div className="flex flex-col gap-8">
                {/* Activity */}
                <Card>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Activity</h3>
                    <div className="flex flex-col gap-4">
                      {activitySettings.map(({ title, subtitle, onClick }) => (
                        <SettingToggleRow
                          key={title}
                          title={title}
                          subtitle={subtitle}
                          onClick={onClick}
                        />
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Digest Emails */}
                <Card>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Digest emails</h3>
                    <div className="flex flex-col gap-4">
                      {digestEmailSettings.map(
                        ({ title, subtitle, onClick }) => (
                          <SettingToggleRow
                            key={title}
                            title={title}
                            subtitle={subtitle}
                            onClick={onClick}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Account */}
            {selectedTab === tabItems[4].label && (
              <div className="flex flex-col gap-8">
                {/* Account Details */}
                <Card className="max-md:rounded-none">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-muted-foreground">Account Details</h3>
                    <div>
                      <label htmlFor="displayName" className="mb-2 ml-2">
                        Email
                      </label>
                      <Input
                        id="displayName"
                        variant="auth"
                        shape="pill"
                        fullWidth
                        placeholder="Your email"
                        value={user?.email}
                        disabled
                      />
                    </div>
                  </div>
                </Card>

                <Card className="max-md:rounded-none">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-destructive">DANGER ZONE</h3>
                    <div className="bg-destructive/5 border-destructive/50 lex flex flex-col gap-4 rounded-xl border p-4">
                      {/* <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <p>Deactivate account</p>{" "}
                          <p className="text-muted-foreground text-sm">
                            Temporarily hide your profile and entries
                          </p>
                        </div>
                        <Button
                          shape="pill"
                          size="sm"
                          className="h-10 w-28 justify-center border border-amber-500/50 bg-amber-500/5 py-0.5 text-amber-500"
                        >
                          Deactivate
                        </Button>
                      </div> */}

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <p className="text-destructive">Delete account</p>{" "}
                          <p className="text-muted-foreground text-sm">
                            Permanently remove all your data. Cannot be undone.
                          </p>
                        </div>
                        <Button
                          shape="pill"
                          size="sm"
                          className="border-destructive/50 bg-destructive/10 text-destructive h-10 w-28 justify-center border"
                          onClick={() => setDeleteStep(1)}
                        >
                          <Trash size={12} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Step 1 — are you sure? */}
      <Modal
        open={deleteStep === 1}
        onClose={() => setDeleteStep(0)}
        title="Delete account"
        icon="🗑️"
      >
        <div className="flex flex-col gap-5">
          <p className="text-muted-foreground text-sm">
            This will permanently delete your account and all associated data —
            hobbies, journal entries, and profile info. This cannot be undone.
          </p>
          <p className="text-sm font-medium">
            Are you sure you want to continue?
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              shape="pill"
              size="lg"
              fullWidth
              onClick={() => setDeleteStep(0)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              shape="pill"
              size="lg"
              fullWidth
              onClick={() => {
                setDeleteEmailInput("");
                setDeleteStep(2);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>

      {/* Step 2 — confirm with email */}
      <Modal
        open={deleteStep === 2}
        onClose={() => setDeleteStep(0)}
        title="Confirm deletion"
        icon="⚠️"
      >
        <div className="flex flex-col gap-5">
          <p className="text-muted-foreground text-sm">
            Type your email address{" "}
            <span className="text-foreground font-medium">{user?.email}</span>{" "}
            to confirm account deletion.
          </p>
          <Input
            variant="auth"
            shape="pill"
            fullWidth
            placeholder="Your email address"
            value={deleteEmailInput}
            onChange={(e) => setDeleteEmailInput(e.target.value)}
            autoComplete="off"
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              shape="pill"
              size="lg"
              fullWidth
              onClick={() => setDeleteStep(0)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              shape="pill"
              size="lg"
              fullWidth
              disabled={deleteEmailInput !== user?.email || isDeleting}
              onClick={handleDeleteConfirm}
            >
              {isDeleting ? "Deleting..." : "Delete my account"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SettingsPage;
