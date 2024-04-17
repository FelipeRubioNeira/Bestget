import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Label from '../label/Label'
import Spacer from '../spacer/Spacer'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Icons from '../../../assets/icons'
import { Styles } from '../../styles/Styles'
import { Colors } from '../../constants/Colors'

type typePress = "left" | "right"

export type DataItem = {
    id: number,
    value: string
}

type HorizontalSelectorProps = {
    title: string,
    data: DataItem[],
    indexValue: number,
    onChangeValue: (value: number) => void,
}

const HorizontalSelector = ({ title, data, onChangeValue, indexValue }: HorizontalSelectorProps) => {

    const ref = useRef<FlatList>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0)


    useEffect(() => {
        scrollToIndex(indexValue)
    }, [indexValue])


    const scrollToIndex = (index: number) => {
        setCurrentIndex(index);
        ref.current?.scrollToIndex({ index, animated: true });

        return onChangeValue(index)
    }

    const updateMovement = (type: typePress) => {
        const movement = type === "left" ? -1 : 1;
        const minimumIndex = Math.min(currentIndex + movement, data.length - 1)
        const newIndex = Math.max(0, minimumIndex);

        scrollToIndex(newIndex)

    }



    return (
        <View>
            <Label value={title} fontSize={FontSize.SMALL} />

            <Spacer marginVertical={"2%"} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                <TouchableIcon
                    onPress={() => updateMovement("left")}
                    image={Icons.leftArrow}
                    color={Colors.BLACK}
                />

                <Spacer marginHorizontal={"1%"} />

                <FlatList
                    ref={ref}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={selectorStyle.itemContainer}>
                                <Label
                                    value={item.value}
                                    style={selectorStyle.label}
                                />
                            </View>
                        )
                    }}
                    style={selectorStyle.flatList}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={(data, index) => ({ length: 60, offset: 60 * index, index })}
                />

                <Spacer marginHorizontal={"1%"} />

                <TouchableIcon
                    onPress={() => updateMovement("right")}
                    image={Icons.rightArrow}
                    color={Colors.BLACK}
                />

            </View>

        </View>
    )
}

export default HorizontalSelector

const selectorStyle = StyleSheet.create({

    flatList: {
        width: "100%",
        borderWidth: 1,
        height: 60,
        borderRadius: Styles.BORDER_RADIUS,
        borderColor: Colors.GRAY,
    },
    itemContainer: {
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        width: "100%",
        textAlign: "center",
        fontFamily: FontFamily.BOLD
    }
})