import { View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import Spacer from '../../components/spacer/Spacer'
import { InputType } from '../../components/textInput/TextInputViewModel'
import ChipItem from '../../components/chipItem/ChipItem'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import { Colors } from '../../constants/Colors'
import { BudgetsScreenProps } from '../../../navigation/NavigationParamList'
import useBudgetViewModel from './BudgetViewModel'
import Label from '../../components/label/Label'
import { FontFamily } from '../../constants/Fonts'



const Budgets = ({ navigation, route }: BudgetsScreenProps) => {


    const budgetViewModel = useBudgetViewModel({ navigation, route })


    return (

        <View style={DefaultStyles.SCREEN}>

            <Label
                value={budgetViewModel.title}
                fontFamily={FontFamily.BLACK}
            />

            <Label value={budgetViewModel.used} />
            <Label value={budgetViewModel.available} />


            <ChipItem
                category={budgetViewModel.category}
                disabled={true}
                style={{ marginTop: 20, backgroundColor: budgetViewModel.category?.color }}
            />

            <ButtonAdd
                visible={true}
                backgroundColor={Colors.YELLOW}
                onPress={budgetViewModel.onPress}
            />

        </View>
    )
}

export default Budgets
