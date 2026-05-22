import { Search, TrendingUp, Users } from "lucide-react";
import Input from "../components/ui/Input";
import ProfileCard from "../components/explore/ProfileCard";
import Button from "../components/ui/Button";

const mockProfiles = [
  {
    isFeatured: false,
    profileImage:
      "https://images.unsplash.com/photo-1621036189456-895776ffe69f",
    displayName: "Hana K.",
    handle: "starweaver",
    followerAmount: 234,
    bio: "Anime & watercolors 🌸",
    hobbies: [
      { emoji: "🎌", name: "anime" },
      { emoji: "🎨", name: "painting" },
    ],
  },
  {
    isFeatured: false,
    profileImage:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    displayName: "Liam S.",
    handle: "pixelnomad",
    followerAmount: 512,
    bio: "Gaming nights & pixel art 🎮",
    hobbies: [
      { emoji: "🎮", name: "gaming" },
      { emoji: "🧩", name: "pixel art" },
    ],
  },
  {
    isFeatured: false,
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    displayName: "Mia R.",
    handle: "cozyreads",
    followerAmount: 189,
    bio: "Books, tea, and rainy days ☕",
    hobbies: [
      { emoji: "📖", name: "reading" },
      { emoji: "🫖", name: "tea tasting" },
    ],
  },
  {
    isFeatured: false,
    profileImage:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    displayName: "Noah T.",
    handle: "shutterdrift",
    followerAmount: 421,
    bio: "Capturing quiet moments 📷",
    hobbies: [
      { emoji: "📷", name: "photography" },
      { emoji: "🌄", name: "travel" },
    ],
  },
  {
    isFeatured: false,
    profileImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    displayName: "Ava L.",
    handle: "softsketch",
    followerAmount: 305,
    bio: "Sketching little worlds ✏️",
    hobbies: [
      { emoji: "✏️", name: "sketching" },
      { emoji: "🧵", name: "crafting" },
    ],
  },
  {
    isFeatured: false,
    profileImage:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    displayName: "Ethan W.",
    handle: "circuitdreams",
    followerAmount: 278,
    bio: "Electronics + late night builds ⚡",
    hobbies: [
      { emoji: "🔌", name: "electronics" },
      { emoji: "🛠️", name: "DIY projects" },
    ],
  },
];

function ExplorePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl">Explore 🌸</h1>
        <p className="text-muted-foreground text-sm">
          Discover hobby boards from the Hobbly community
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <div className="absolute top-0 bottom-0 left-0 flex items-center pl-4">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <Input
          fullWidth
          className="pl-12 text-sm"
          placeholder="Search people or hobbies"
        />
      </div>

      <ProfileCard
        isFeatured
        profileImage="https://images.unsplash.com/photo-1621036189456-895776ffe69f"
        displayName="Hana K."
        handle="starweaver"
        followerAmount={234}
        bio="Anime & watercolors 🌸"
        hobbies={[
          { emoji: "🎌", name: "anime" },
          { emoji: "📖", name: "journaling" },
        ]}
        className="mb-8"
      ></ProfileCard>

      {/* Content switch */}
      <div className="mb-8 flex gap-2">
        <Button shape="pill" className="flex items-center" active>
          <Users size={14} />
          People
        </Button>
        <Button shape="pill" className="flex items-center">
          <TrendingUp size={14} />
          Hobbies
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mockProfiles.map((profile) => (
          <ProfileCard key={profile.handle} {...profile} />
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
