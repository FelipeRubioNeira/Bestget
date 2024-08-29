import { useState } from "react";

const useLoadingViewModel = () => {


    // ------------------- states ------------------- //
    const [isLoading, setIsLoading] = useState(false);


    // ------------------- methods ------------------- //
    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return {
        isLoading,
        showLoading,
        hideLoading
    }

}

export default useLoadingViewModel