import { Copy } from "lucide-react";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { useProfileShare } from "../../hooks/useProfileShare";
import { profileShareService } from "../../services/profile-share";
import { showToast } from "../../utils/toast";

interface ProfileShareModalProps {
  open: boolean;
  onClose: () => void;
}

function ProfileShareModal({ open, onClose }: ProfileShareModalProps) {
  const { sharedProfile, isLoading, createOrRemake, revoke } =
    useProfileShare();

  const handleCopy = async () => {
    const { referenceId } = await profileShareService.findOwnRef();
    const shareUrl = `${window.location.origin}/share/${referenceId}`;
    await navigator.clipboard.writeText(shareUrl);
    showToast.success("Share link copied! 🔗");
  };

  return (
    <Modal
      icon="🔗"
      title="Share your profile"
      description="Make your profile be seen"
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        {sharedProfile ? (
          <div>
            <p className="text-muted-foreground mb-4 text-center text-sm">
              Anyone with the link can view your profile even if your account is
              set the private. Please be careful when sharing this to someone
            </p>
            <div
              className="bg-accent group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 transition-opacity hover:opacity-70"
              onClick={handleCopy}
            >
              <p className="text-muted-foreground min-w-0 flex-1 truncate text-sm">
                {`${window.location.origin}/share/${sharedProfile.referenceId}`}
              </p>
              <Copy className="text-muted-foreground h-4 w-4 shrink-0" />
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground mb-1 text-center text-sm">
            Generate a link to share your profile with someone. Anyone with the
            link can view your profile even if your account is set the private.
            Please be careful when sharing this to someone
          </p>
        )}

        <Button
          variant="gradient"
          shape="pill"
          fullWidth
          onClick={() => createOrRemake()}
          disabled={isLoading}
        >
          {sharedProfile ? "Create new link" : "Generate link"}
        </Button>

        {sharedProfile && (
          <Button
            variant="destructive"
            shape="pill"
            fullWidth
            onClick={() => revoke()}
            disabled={isLoading}
          >
            Revoke share link
          </Button>
        )}
      </div>
    </Modal>
  );
}

export default ProfileShareModal;
