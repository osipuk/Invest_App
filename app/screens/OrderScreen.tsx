import { observer, } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, TextInput, Dimensions, ImageBackground, TouchableOpacity } from "react-native"
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
import { ceil, color } from "react-native-reanimated"
import { Colors } from "react-native/Libraries/NewAppScreen";

const welcomeLogo = require("../../assets/images/background3.png")
const backimg = require("../../assets/images/backgound1.png")
// const welcomeFace = require("../../assets/images/welcome-face.png")

// const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
interface OrderScreenProps extends AppStackScreenProps<"Order"> { }

export const OrderScreen: FC<OrderScreenProps> = function OrderScreen(
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
      title: "Back",
      titleMode: "flex",
      titleStyle: { color: colors.tint, textAlign: 'left' },
      onLeftPress: goNext,
    },
    [goNext],
  )
  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ backgroundColor: '#555555', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
        <Text style={{ color: 'white', fontSize: 12 }}>ACCOUNT CASH</Text>
        <Text style={{ color: '#44d39c', fontSize: 20, fontWeight: 'bold' }}>$0.00</Text>
      </View>
      <View style={{ flex: 1, }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, opacity: 0.8, paddingVertical: 40 }}>
          <Text numberOfLines={1} style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: 28, lineHeight: 35,marginBottom:5 }}>Homi4u Fund Multiple family</Text>
          <Text size="md">Income 20% Fund per  a year</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.3, paddingLeft: 30, justifyContent: 'center', paddingBottom: 10 }}>
            <View style={{ borderBottomWidth: 1, flex: 1, borderBottomColor: '#7f7a7a' }}></View>
          </View>
          <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#44d39c' }}>BUY QUOTES</Text>
          </View>
          <View style={{ flex: 0.3, paddingRight: 30, justifyContent: 'center', paddingBottom: 10 }}>
            <View style={{ borderBottomWidth: 1, flex: 1, borderBottomColor: '#7f7a7a' }}></View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', paddingTop: 30, paddingHorizontal: 30 }}>
          <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center',opacity:0.8 }}>
            <Text size="xs">HOW MANY BUY?</Text>
          </View>
          <View style={{ flex: 0.2 }}>

          </View>
          <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center',opacity:0.8 }}>
            <Text size="xs">AMOUNT</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 15, paddingHorizontal: 30 }}>
          <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={{ borderWidth: 1, width: 80, textAlign: 'center', fontSize: 16, padding: 3, fontWeight: 'bold',borderColor:'grey' }}
              // placehlder="Type here to translate!"
              keyboardType="number-pad"
              // onChangeText={newText => setText(newText)}
              defaultValue={'2'}
            />
          </View>
          <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
            <Text>×</Text>
          </View>
          <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={{ borderWidth: 1, width: 80, textAlign: 'center', fontSize: 16, padding: 3, fontWeight: 'bold', color: '#44d39c',borderColor:'grey' }}
              placeholder="Type here to translate!"
              editable={false}
              // onChangeText={newText => setText(newText)}
              defaultValue={'$1000'}
            />
          </View>
        </View>
        <View style={{alignItems:'center',marginTop:20}}>
           <Text size="xs">ESTIMATED COST</Text>
           <Text style={{color:colors.orange,fontWeight:'bold',fontSize:16,marginTop:5}}>-1000$</Text>
        </View>

      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>

        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="BuyInvest.buyBtn"
          textStyle={{ fontSize: 15 }}
          style={{ borderRadius: 30, marginHorizontal: 40, backgroundColor: colors.green }}
          onPress={goNext}
        />
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }} onPress={goNext}>
          <Text style={{ color: 'white', opacity: 0.8 }}>CANCEL</Text>
        </TouchableOpacity>

      </View>
    </View>
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
  height: 150
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
