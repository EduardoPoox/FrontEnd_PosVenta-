import { User } from "../interfaces/User"
import { useUserServices } from "../services/useUserServices"
import { onMounted, ref } from "vue"

export const useUser = () => {

    const users = ref<User[]>([])
    const isLoadingUsers = ref<boolean>(false)
    const isOpen = ref(false);
    const isLoadingSaveUser = ref(false)


    const { getAllUsers, postUser, deleteUser } = useUserServices()

    onMounted(() => {
        getUsers()
    })

    const getUsers = async () => {
        isLoadingUsers.value = true
        const data = await getAllUsers()
        users.value = data.map((item: any) => ({
            ...item,
            isLoadingDeleteUser: false
        }))

        isLoadingUsers.value = false
    }

    const saveUser = async (user: User) => {
        isLoadingSaveUser.value = true
        const { status } = await postUser(user)
        if (status === 200) {
            isOpen.value = false
            getUsers()
        }
        isLoadingSaveUser.value = false

    }

    const delUser = async (id: number) => {

        users.value = users.value.map((item) => {
            if (item.userId === id) {
                item.isLoadingDeleteUser = true
            }
            return item
        });

        const { status } = await deleteUser(id)

        if (status === 200) {
            users.value = users.value.filter(user => user.userId !== id)
        }

        users.value = users.value.map((item) => {
            if (item.userId === id) {
                item.isLoadingDeleteUser = false
            }
            return item
        });
    }


    return {
        users,
        isOpen,
        isLoadingUsers,
        isLoadingSaveUser,

        saveUser,
        delUser
    }
}