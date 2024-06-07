import { useState } from "react"

const PIE_CHART_MODE = Object.freeze({
    money: 'money',
    percentage: 'percentage',
})


const usePieChartViewModel = () => {

    const [currentMode, setCurrentMode] = useState<string>(PIE_CHART_MODE.percentage)

    const changeMode = () => {
        setCurrentMode(currentMode === PIE_CHART_MODE.percentage ? PIE_CHART_MODE.money : PIE_CHART_MODE.percentage)
    }

    return {
        currentMode,
        changeMode,
    }

}

export default usePieChartViewModel
export {
    PIE_CHART_MODE
}