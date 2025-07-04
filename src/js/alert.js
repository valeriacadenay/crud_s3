import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export function alertSuccess(message){
    Toast.fire({
  icon: "success",
  title: message
});
}

export function alertError(message){
    Toast.fire({
    icon: "error",
    title: message
    });
}

Toast.fire({
  icon: "success",
  title: "Signed in successfully"
});


export async function confirmarEliminacion() {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  return result.isConfirmed;
}