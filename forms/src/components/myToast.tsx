import { toast } from "sonner";

export const successfulToast = (message: string) =>
  toast.success(message, {
    style: {
      color: "rgb(34 197 94)", // This is the Tailwind green-500 color
    },
  });
