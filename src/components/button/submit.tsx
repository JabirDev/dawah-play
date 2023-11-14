import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const ButtonSubmit: React.FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  children,
}) => {
  return (
    <Button type="submit" disabled={loading || disabled} className="mt-4">
      {loading && <Loader2 className="mr-2 h-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default ButtonSubmit;
