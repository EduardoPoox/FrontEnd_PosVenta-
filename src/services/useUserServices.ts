import axios from "axios"
import { User } from "../interfaces/User"



export const useUserServices = () => {

    const getAllUsers = async () => {
        const { data } = await axios.get(`https://imsoftware.azurewebsites.net/api/User`)
        return data
    }

    const postUser = async (user: User) => {
        const data = await axios.post(`https://imsoftware.azurewebsites.net/api/User`, user)
        return data
    }

    const deleteUser = async (id: number) => {
        const data = await axios.delete(`https://imsoftware.azurewebsites.net/api/User/${id}`)
        return data
    }


    return {
        getAllUsers,
        postUser,
        deleteUser
    }
}