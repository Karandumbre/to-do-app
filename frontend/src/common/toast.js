import { toast } from "react-toastify";

export const POSITION = {
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_LEFT: "bottom-left",
};

export const notifySuccess = (msg) => {
  toast.success(msg, {
    position: POSITION.TOP_RIGHT,
    autoClose: 1500,
  });
};

export const notifyInfo = (msg) => {
  toast.info(msg, {
    position: POSITION.TOP_RIGHT,
    autoClose: 1500,
  });
};

export const notifyWarn = (msg) => {
  toast.warn(msg, {
    position: POSITION.TOP_RIGHT,
    autoClose: 1500,
  });
};

export const notifyError = (msg) => {
  toast.error(msg, {
    position: POSITION.TOP_RIGHT,
    autoClose: 1500,
  });
};
