import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import DefaultStyles from '../../styles/DefaultStyles'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Spacer from '../spacer/Spacer'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import Icons from '../../../assets/icons'


interface SearchProps {
    title: string,
    placeholder: string,
    searchValue?: string,
    onSearch?: (text: string) => void,
    deleteSearch?: () => void
}

const Search = ({
    title,
    placeholder,
    searchValue,
    onSearch,
    deleteSearch
}: SearchProps) => {

    return (

        <View>

            <TitleSearch title={title} />

            <View style={SearchStyles.container}>

                <TextInput
                    value={searchValue}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.GRAY}
                    maxLength={50}
                    style={SearchStyles.input}
                    onChangeText={onSearch}
                />

                <TouchableIcon
                    image={Icons.deleteCircle}
                    onPress={deleteSearch}
                    color={Colors.DARK_GRAY}
                />

            </View>


        </View>
    )
}

const TitleSearch = ({ title }: { title?: string }) => {

    if (!title) return null

    return (
        <>
            <Label
                value={title}
                fontFamily={FontFamily.REGULAR}
                fontSize={FontSize.SMALL}
            />

            <Spacer marginVertical={"1%"} />

        </>
    )

}

export default Search

const SearchStyles = StyleSheet.create({

    container: {
        ...DefaultStyles.input,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: FontSize.SMALL,
        fontFamily: FontFamily.REGULAR,
        color: Colors.BLACK
    }
})