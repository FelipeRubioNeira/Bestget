import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Styles } from '../../styles/Styles'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Spacer from '../spacer/Spacer'
import Label from '../label/Label'
import EditionIcons from '../editionIcons/EditionIcons'
import { Colors } from '../../constants/Colors'


// ------------------- component ------------------- //
interface GroupItemProps {
    name: string
    groupId: string,
    editMode?: boolean,
    onEdit?: () => void,
    onDelete?: () => void,
    navigateToFinancesOfGroup: (groupId: string) => void
}


const GroupItem = ({
    groupId,
    name,
    editMode,
    navigateToFinancesOfGroup,
    onEdit,
    onDelete,
}: GroupItemProps) => {

    return (
        <TouchableOpacity
            onPress={() => navigateToFinancesOfGroup(groupId)}
            style={GroupItemStyles.contaier}>


            <View style={GroupItemStyles.icon}>

                <Label
                    value='GF'
                    color={Colors.WHITE}
                    fontFamily={FontFamily.BOLD}
                />

            </View>

            <Spacer marginHorizontal='2%' />

            <Label
                value={name}
                style={GroupItemStyles.groupName}
            />

            <Spacer marginHorizontal='2%' />

            <View >

                {
                    editMode ?
                        <EditionIcons
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                        :
                        <Label
                            value={""}
                            fontSize={FontSize.SMALL}
                            fontFamily={FontFamily.REGULAR}
                        />
                }

            </View>

        </TouchableOpacity>
    )
}

export default GroupItem

const GroupItemStyles = StyleSheet.create({

    contaier: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: Styles.BORDER_RADIUS,
        padding: 8,
        alignItems: "center"
    },
    icon: {
        height: "100%",
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: Colors.BLACK,
        justifyContent: "center",
        alignItems: "center"
    },
    groupName: {
        flex: 1,
        fontSize: FontSize.XSMALL
    }

})