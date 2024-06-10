import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Styles } from '../../styles/Styles';

type ChartData = {
    amount: number;
    color: string;
}

type PieChartProps = {
    data: ChartData[];
    size: number;
    style?: ViewStyle;
    onPress?: (chartData: ChartData) => void;
};

type PieSliceProps = {
    amount: number;
    color: string;
    total: number;
    cumulativeAngle: number;
    size: number;
    onPress: (chartData: ChartData) => void;
}

const PieSlice: React.FC<PieSliceProps> = ({ amount, color, total, cumulativeAngle, size, onPress }) => {
    
    const angle = (amount / total) * 360;
    const largeArcFlag = angle > 180 ? 1 : 0;

    const x1 = size / 2 + (size / 2) * Math.cos((Math.PI * cumulativeAngle) / 180);
    const y1 = size / 2 + (size / 2) * Math.sin((Math.PI * cumulativeAngle) / 180);

    const x2 = size / 2 + (size / 2) * Math.cos((Math.PI * (cumulativeAngle + angle)) / 180);
    const y2 = size / 2 + (size / 2) * Math.sin((Math.PI * (cumulativeAngle + angle)) / 180);

    const pathData = [
        `M ${size / 2} ${size / 2}`, // Move to center
        `L ${x1} ${y1}`, // Line to (x1, y1)
        `A ${size / 2} ${size / 2} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc to (x2, y2)
        'Z', // Close path back to center
    ].join(' ');

    return (
        <Path
            key={`${color}-${cumulativeAngle}`} // Use a unique key for each slice
            d={pathData}
            fill={color}
            onPress={() => onPress({ amount, color })}
        />
    );
};

const CustomPieChart: React.FC<PieChartProps> = ({
    data = [],
    size = 100,
    style = {},
    onPress = () => { },
}) => {
    
    const total = useMemo(() => data.reduce((sum, { amount }) => sum + amount, 0), [data]);
    let cumulativeAngle = 0;

    return (
        <View style={{
            ...PieChartStyles.chartContainer,
            ...style
        }}>
            <Svg width={size} height={size}>
                {data.map(({ amount, color }) => {
                    const slice = (
                        <PieSlice
                            key={`${color}-${cumulativeAngle}`} // Ensure each slice has a unique key
                            amount={amount}
                            color={color}
                            total={total}
                            cumulativeAngle={cumulativeAngle}
                            size={size}
                            onPress={onPress}
                        />
                    );

                    cumulativeAngle += (amount / total) * 360;
                    return slice;
                })}
            </Svg>
        </View>
    );
}

const PieChartStyles = StyleSheet.create({
    chartContainer: {
        margin: Styles.MARGIN,
        alignSelf: 'center',
    },
})

export default CustomPieChart;