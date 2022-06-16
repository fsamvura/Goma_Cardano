import Swal from "sweetalert2";

export const openModal = (modalId: string | null) => {
  // document.querySelector(`#${modalId}`)?.modal('show')
}

export const showSwalMessage = (
  title: string = "Confirmation",
  text: string = '',
  icon: string = "success"
) => {
  if (text !== '') {
    // @ts-ignore
    Swal.fire({
      title,
      text,
      icon,
      // showCancelButton: false,
      // confirmButtonText: "OK!",
    });
  }
};
