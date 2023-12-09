import { observer, } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, ScrollView, Dimensions, ImageBackground ,TouchableOpacity} from "react-native"
import {
  Button, // @demo remove-current-line
  Text,
  Screen
} from "../components"
import { Icon } from 'react-native-elements';
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { color } from "react-native-reanimated"

const welcomeLogo = require("../../assets/images/background3.png")
const backimg = require("../../assets/images/backgound1.png")
// const welcomeFace = require("../../assets/images/welcome-face.png")

// const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
interface DocumentScreenProps extends AppStackScreenProps<"Document"> { }

export const DocumentScreen: FC<DocumentScreenProps> = function DocumentScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.goBack();
  }  
  useHeader(
    {
      // rightTx: "common.logOut",
      leftIconColor: colors.tint,
      leftIcon: "back",
      title: "Document",
      titleMode: "flex",
      titleStyle: { color: colors.tint, textAlign: 'left' },
      onLeftPress: goNext,
    },
    [goNext],
  )
  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
   <Screen preset="scroll"     
   contentContainerStyle={$container}
   safeAreaEdges={["top", "bottom"]}>
   </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  // flexShrink: 1,
  // flexGrow: 1,
  flex: 1,
  // flexBasis: "57%",
  justifyContent: "center",
  // paddingHorizontal: spacing.xs,
}

const $bottomContainer: ViewStyle = {
  // flexShrink: 1,
  // flexGrow: 0,
  // flexBasis: "43%",

  backgroundColor: '#555555',
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  paddingHorizontal: spacing.lg,
  position: 'absolute',
  bottom: 0,
  justifyContent: "center", //"space-around",
  width: Dimensions.get('window').width,
  height: 100
}
const $welcomeLogo: ImageStyle = {
  height: 200,
  width: "65%",
  borderRadius: 10,
  marginTop: 20,
  // opacity: 0.9,
  // marginBottom: spacing.xxs,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
