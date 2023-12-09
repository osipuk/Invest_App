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
interface BuyInvestScreenProps extends AppStackScreenProps<"BuyInvest"> { }

export const BuyInvestScreen: FC<BuyInvestScreenProps> = function BuyInvestScreen(
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
  function goOrder() {
    navigation.navigate("Order");
  }
  useHeader(
    {
      // rightTx: "common.logOut",
      leftIconColor: colors.tint,
      leftIcon: "back",
      title: "Back to Offers",
      titleMode: "flex",
      titleStyle: { color: colors.tint, textAlign: 'left' },
      onLeftPress: goNext,
    },
    [goNext],
  )
  // @demo remove-block-end

  function goDetail(){
    navigation.navigate("Detail");
    console.log('sdfsdfd');
  }

  function goDocument(){
    navigation.navigate("Document");
  }
  function goPhoto(){
    navigation.navigate("Photos");
  }
  function goVideo(){
    navigation.navigate("Videos");
  }
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView style={$container} keyboardShouldPersistTaps="handled">

        <View style={$topContainer}>
          <ImageBackground source={backimg} style={{ flex: 1, height: Dimensions.get('window').height, alignItems: 'center' }} resizeMode="cover">
            <Text text="Homis4u-MainTitle" size="xl" style={{ textAlign: 'center', color: 'white', marginTop: 50, fontWeight: 'bold' }} />
            <Text text="Income and Growth Funds  $1000 per share-subdescription" size="xs" style={{ textAlign: 'center', color: 'white' }} />
            <Text text="Offering  Size $50M" size="sm" style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', backgroundColor: 'blue', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 1, marginTop: 15 }} />
            <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="stretch" />
            <Text text="$1000" size="xxl" style={{ color:'white', fontWeight: 'bold',marginTop:20 }} />
            <Text text="+20% - incoming per a year" size="xs" style={{ color: 'white' }} />
            <View style={{flexDirection:'row',marginHorizontal:spacing.xl,marginTop:20}}>
              <View style={{flex:0.2}}>             
                <TouchableOpacity onPress={goDetail}><Icon name='align-left' type="feather" color={'white'} size={25} style={{ opacity: 0.9 }}></Icon></TouchableOpacity>
              </View>            
              <View style={{flex:0.2}}>
              <TouchableOpacity onPress={goDocument}><Icon name='file-text' type='feather' color={'white'} size={25} style={{ opacity: 0.9 }}></Icon></TouchableOpacity>
              </View>
              <View style={{flex:0.2}}>
              <TouchableOpacity onPress={goPhoto}><Icon name='image' type='feather' color={'white'} size={25} style={{ opacity: 0.9 }}></Icon></TouchableOpacity>
              </View>
              <View style={{flex:0.2}}>
              <TouchableOpacity onPress={goVideo}><Icon name='video' type='feather' color={'white'} size={25} style={{ opacity: 0.9 }}></Icon></TouchableOpacity>
              </View>
            </View>           
          </ImageBackground>
        </View>
        {/* <View style={{ height: 130, borderWidth: 1 }}>
        </View> */}
      </ScrollView>
      <View style={[$bottomContainer, $bottomContainerInsets]}>

        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="BuyInvest.buyBtn"
          textStyle={{ fontSize: 15 }}
          style={{ borderRadius: 30, marginHorizontal: 40, backgroundColor: colors.green }}
          onPress={goOrder}
        />

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
