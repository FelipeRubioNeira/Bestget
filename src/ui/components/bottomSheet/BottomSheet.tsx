import { SafeAreaView, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Spacer from '../spacer/Spacer'
import Actions from '../actions/Actions'
import ButtonApp from '../buttonApp/ButtonApp'
import HorizontalSelector from '../horizontalSelector/HorizontalSelector'
import useBottomSheetViewModel from './ButtomSheetViewModel'
import BottomStyles from './BottomStyles'
import { Colors } from '../../constants/Colors'



type BottomSheetProps = {
    visible: boolean,
    date: string,
    onChange: (date: string) => void,
    onConfirm: (date: string) => void,
    onHide: () => void,
    onCopy?: () => void,
    onPaste?: () => void,
    onDelete?: () => void,
}


const BottomSheet = ({
    visible,
    onHide,
    date,
    onCopy,
    onPaste,
    onDelete,
    onChange,
    onConfirm
}: BottomSheetProps) => {


    const {
        currentDate,
        months,
        years,
        onConfirmViewModel,
        updateDate,
    } = useBottomSheetViewModel({ date, onChange })


    if (!visible) return null
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={BottomStyles.screen}>

                <OutScreen onHide={onHide} />

                <View style={BottomStyles.container}>

                    <ButtonApp
                        title="Aceptar"
                        onPress={() => onConfirmViewModel(onConfirm)}
                        buttonStyle={{ backgroundColor: Colors.LIGHT_GRAY }}
                    />

                    <Spacer marginVertical={"2%"} />

                    <HorizontalSelector
                        title="Seleccione mes:"
                        data={months}
                        indexValue={currentDate.monthIndex}
                        onChangeValue={month => updateDate(undefined, month)}
                    />

                    <Spacer marginVertical={"2%"} />

                    <HorizontalSelector
                        title="Seleccione Año:"
                        data={years}
                        indexValue={currentDate.yearIndex}
                        onChangeValue={year => updateDate(year)}
                    />

                    <Spacer marginVertical={"2%"} />

                    <Actions
                        onCopy={onCopy}
                        onPaste={onPaste}
                        onDelete={onDelete}
                    />

                </View>

            </View>
        </SafeAreaView>
    )
}


const OutScreen = ({ onHide }: { onHide: () => void }) => {
    return (
        <TouchableWithoutFeedback onPress={onHide}>
            <View style={BottomStyles.outCountainer} />
        </TouchableWithoutFeedback>
    )
}

export default BottomSheet
