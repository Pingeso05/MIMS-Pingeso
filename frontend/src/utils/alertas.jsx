
import Swal from 'sweetalert2';


export const alertaSuccess= (titulo) => {

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: titulo,
        showConfirmButton: false,
        timer: 2000
      })
}

export const alertaError= (titulo) => {    
    Swal.fire({
        icon: 'error',
        title: titulo,
        showConfirmButton: false,
        timer: 2000
      })
}

export const alertaWarning= (titulo) => {    
    Swal.fire({
        icon: 'warning',
        title: titulo,
        showConfirmButton: false,
        timer: 2000
      })
}


