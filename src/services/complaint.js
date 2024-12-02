
import { axiosInstance } from "../api/axios";


// export const completedGet = async() =>{
//     try{
//         const response =axiosInstance.get('/completed/completed/')
//         console.log(response.data)
//         return response
//     }catch(error){
//         console.error(error)
//     }
// }


// export const complaintGet =async() =>{
//     try{
//         const response =axiosInstance.get('/complaints/')
//         console.log(response)
//         return response
//     }catch(error){
//         console.error(error)
//     }
// }

export const complaintPost =async(data) =>{
    try{
        const response =axiosInstance.post('/complaints/',data)
        console.log(response)
        return response
    }catch(error){
        console.error(error)
    }
}

export const complainActiveGet =async() =>{
    try{
        const response = await axiosInstance.get('/profile/')
        console.log(response.data)
        return response
    }catch(error){
        // console.error(error)
        
            console.error('Error response:', error.response?error.response.data.error:error.message); 
            
}
}