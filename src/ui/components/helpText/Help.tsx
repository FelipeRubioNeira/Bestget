import { StyleSheet, View } from "react-native"
import { Colors, Styles } from "../../constants/Index"
import Label, { ILabel } from "../label/Label"


const HelpText = (props: ILabel) => {

  return (
    <View style={helpTextStyles.helpText}>
      <Label {...props} />
    </View>
  )

}

export default HelpText

const helpTextStyles = StyleSheet.create({

  helpText: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: Styles.BORDER_RADIUS,
    padding: 10,
  }

})

