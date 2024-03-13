import { View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import Spacer from '../../components/spacer/Spacer'
import { InputType } from '../../components/textInput/TextInputViewModel'
import ChipItem from '../../components/chipItem/ChipItem'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import { Colors } from '../../constants/Colors'
import { BudgetsScreenProps } from '../../navigation/NavigationParamList'
import useBudgetViewModel from './BudgetViewModel'



const Budgets = ({ navigation, route }: BudgetsScreenProps) => {

    const BudgetViewModel = useBudgetViewModel({ navigation, route })



    return (

        <View style={DefaultStyles.SCREEN}>

            <TextInputWithLabel
                value={BudgetViewModel.budgetName}
                title="Nombre presupuesto:"
                placeholder="Salidas de fin de semana"
                editable={false}
            />

            <Spacer marginVertical={"4%"} />

            <TextInputWithLabel
                value={BudgetViewModel.budgetAmount}
                title="Presupuesto:"
                placeholder="$120.000"
                inputMode={InputType.NUMERIC}
                editable={false}
            />


            <ChipItem
                category={undefined}
                disabled={true}
            />

            <ButtonAdd
                visible={true}
                backgroundColor={Colors.YELLOW}
                onPress={() => { }}
            />

        </View>
    )
}

export default Budgets
