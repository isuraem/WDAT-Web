import React from 'react'
import { toast } from 'react-toastify';

const errorHandler = (error) => {
    if (error.status === 401){
        
        toast.error(<div>{"Unauthorized Action"}</div>, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return error.data
    } else{
        toast.error(<div>{error.data.msg}</div>, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return error.data
    }
    
}

const successHandler = (response) => {
    console.log("new",response)
    if (response.data.showMessage === true){
        toast.success(<div>{response.data.msg}</div>, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return response
}

export {
    errorHandler,
    successHandler,
}