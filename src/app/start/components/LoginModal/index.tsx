import GoogleSignInButton from "@/components/buttons/GoogleButton";
import GenericModal from "@/components/modals/GenericModal";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticate?: () => void;
}

export default function LoginModal({
  open,
  onClose,
  onAuthenticate,
}: LoginModalProps) {
  const handleAuthenticated = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAuthenticate) {
      onAuthenticate();
    }
  };

  return (
    <GenericModal
      title="Login"
      description="Faça login para acessar sua conta e aproveitar todos os recursos do Pic Loja."
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleAuthenticated}>
        <GoogleSignInButton />
      </form>
    </GenericModal>
  );
}
