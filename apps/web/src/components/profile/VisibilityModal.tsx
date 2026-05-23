import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { useAuth } from "../../context/auth/useAuth";
import { userService } from "../../services/user";
import { showToast } from "../../utils/toast";

interface VisibilityModalProps {
  open: boolean;
  onClose: () => void;
}

function VisibilityModal({ open, onClose }: VisibilityModalProps) {
  const { user, updateUser } = useAuth();

  const toggleVisibility = async () => {
    const newVisibility = user?.visibility === "PRIVATE" ? "PUBLIC" : "PRIVATE";
    const updated = await userService.updateCurrentUser({
      visibility: newVisibility,
    });
    updateUser(updated);
    onClose();
    showToast.success(
      `Profile visibility changed to ${newVisibility.toLowerCase()}`,
    );
  };

  return (
    <Modal
      title="Profile Visibility"
      description="Set who can see your profile"
      icon={user?.visibility === "PUBLIC" ? "🌏" : "🔒"}
      open={open}
      onClose={onClose}
    >
      <div className="mb-4 flex flex-col gap-1">
        <p className="text-center">
          {user?.visibility === "PUBLIC"
            ? "Making your profile private will hide it from search and other users."
            : "People will be able to visit your profile and you'll appear in search."}
        </p>
        <p className="text-muted-foreground text-center text-sm">
          You can change it back any time.
        </p>
      </div>
      <Button
        onClick={toggleVisibility}
        fullWidth
        variant="gradient"
        shape="pill"
      >
        {user?.visibility === "PUBLIC"
          ? "Make profile private"
          : "Set profile to public"}
      </Button>
    </Modal>
  );
}

export default VisibilityModal;
