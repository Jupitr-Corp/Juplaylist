import { toast, Bounce } from "react-toastify";

export default class CustomToast {
  static default(message, params) {
    toast(message, params);
  }

  static error(message, params) {
    toast.error(message, {
      theme: "colored",
      transition: Bounce,
      autoClose: false,
      ...params,
    });
  }

  static success(message, params) {
    toast.success(message, params);
  }

  static info(message, params) {
    toast.info(message, params);
  }

  static warning(message, params) {
    toast.warning(message, params);
  }
}
