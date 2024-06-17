import { useEffect, useState } from "react"



const useProfilePictureViewModel = ({ name = "" }: { name: string }) => {


    // ------------------ state ------------------ //
    const [username, setUsername] = useState(name)


    // ------------------ effects ------------------ //
    useEffect(() => {
        const initials = getInitials(name)
        setUsername(initials)
    }, [name])



    // ------------------ methods ------------------ //
    const getInitials = (username: string) => {
        const [name, lastname] = username.split(" ");
        return name.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();
    }

    return {
        username
    }
}

export default useProfilePictureViewModel