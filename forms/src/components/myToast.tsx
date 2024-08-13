import { toast } from "sonner";

export const successfulToast = (message: string) => {
  toast.dismiss();
  toast.success(message, {
    style: {
      color: "rgb(34 197 94)", // This is the Tailwind green-500 color
    },
  });
};

export const errorToast = (message: string) => {
  toast.dismiss();
  toast.error(message, {
    style: {
      color: "rgb(239 68 68)", // This is the Tailwind red-500 color
    },
  });
};
