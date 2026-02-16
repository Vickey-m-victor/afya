import { ex } from '@fullcalendar/core/internal-common';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default {
    success: (message) => {
        iziToast.success({ 
            title: 'Success',
            message: message,
            position: 'topRight',
        });
    }   ,
    error: (message) => {
        iziToast.error({ 
            title: 'Error',
            message: message,
            position: 'topRight',
        });
    },
    warning: (message) => {
        iziToast.warning({ 
            title: 'Warning',
            message: message,
            position: 'topRight',
        });
    },
    info: (message) => {
        iziToast.info({ 
            title: 'Info',
            message: message,
            position: 'topRight',
        });
    }
}   
