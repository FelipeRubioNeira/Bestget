import { View } from "react-native"
import Label from "../Label"
import { FontSize } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"
import Spacer from "../Spacer"
import TextInputApp from "../textInput/TextInputApp"
import { ITextInputWithLabel } from "../IProps"

const TextInputWithLabel = ({
    title = "",
    placeholder = ""
  }: ITextInputWithLabel) => {
  
    return (

      <View>

        <Label
          value={title}
          fontSize={FontSize.SMALL}
          color={Colors.BLACK}
        />
  
        <Spacer marginVertical={"1%"} />
  
        <TextInputApp
          placeholder={placeholder}
          fontSize={FontSize.SMALL}
        />
        
      </View>
    )
  }

  export default TextInputWithLabel