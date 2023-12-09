import React, { FC } from "react"
import * as Application from "expo-application"
import { Linking, Platform, TextStyle, View, ViewStyle, Image,TouchableOpacity } from "react-native"
import { Icon } from 'react-native-elements';
// import { ListItem } from 'react-native-elements'
import { Button, Screen, Text, ListItem } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line

import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
// import { TouchableOpacity } from "react-native-gesture-handler";
import { DemoUseCase } from "./DemoShowroomScreen/DemoUseCase"

// function openLinkInBrowser(url: string) {
//   Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
// }
// interface OrderScreenProps extends AppStackScreenProps<"Order"> { }
export const MyAccountScreen: FC<DemoTabScreenProps<"DemoCommunity">> = function MyAccountScreen(
  _props,
) {
  const {
    authenticationStore: { logout },
  } = useStores()

  // const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null
  const { navigation } = _props

  const goAccount = () => {
    navigation.navigate("Account");
    console.log('goinvestpage');
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <View style={[$card]} >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
            {/* <TouchableOpacity> */}
            <TouchableOpacity style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 35, alignItems: 'center', justifyContent: 'center', borderColor: 'grey' }}>
              <Icon name='camera' type='feather' size={30} style={{ opacity: 0.7 }}></Icon>
              <Text style={{ fontSize: 12, opacity: 0.8, textAlign: "center" }}>Upload</Text>
            </TouchableOpacity>
            {/* </TouchableOpacity> */}
            {/* <Image source={require("../../assets/images/ic_avatar_default3.png")} style={{width:75,height:75, flex: 1, resizeMode: "contain" }} ></Image> */}
          </View>
          <View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', paddingLeft: spacing.lg }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", opacity: 0.8 }}>Iliya Machenko</Text>
          </View>
        </View>
        <View style={[$divider]}></View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ opacity: 0.8 }}>Total Funds Contributed </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold', opacity: 0.8, paddingTop: 10 }}>$0.00 </Text>
        </View>
        <View style={[$divider]}></View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ opacity: 0.8 }}>Total Funds Committed </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold', opacity: 0.8, paddingTop: 10 }}>$0.00 </Text>
        </View>

      </View>

      <View style={[$card, { marginTop: 10 }]}>

        <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 10 }} onPress={goAccount} >
          <View style={{ flex: 0.1, justifyContent: "center", opacity: 0.8 }}>
            <Icon name="person" type="octicon" size={25} ></Icon>
          </View>
          <View style={{ flex: 0.8, opacity: 0.8, justifyContent: "center", paddingLeft: 10 }}>
            <Text>Account</Text>
          </View>
          <View style={{ flex: 0.1, opacity: 0.8, justifyContent: "center", }}>
            <Icon name="chevron-right" type="feather"></Icon>
          </View>
        </TouchableOpacity>
        <View style={[$divider]}></View>
        <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 10 }}>
          <View style={{ flex: 0.1, justifyContent: "center", opacity: 0.8 }}>
            <Icon name="profile" type="antdesign" size={25} ></Icon>
          </View>
          <View style={{ flex: 0.8, opacity: 0.8, justifyContent: "center", paddingLeft: 10 }}>
            <Text>Investment Profile</Text>
          </View>
          <View style={{ flex: 0.1, opacity: 0.8, justifyContent: "center", }}>
            <Icon name="chevron-right" type="feather"></Icon>
          </View>
        </TouchableOpacity>
        <View style={[$divider]}></View>
        <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 10 }}>
          <View style={{ flex: 0.1, justifyContent: "center", opacity: 0.8 }}>
            <Icon name="cash-outline" type="ionicon" size={25} ></Icon>
          </View>
          <View style={{ flex: 0.8, opacity: 0.8, justifyContent: "center", paddingLeft: 10 }}>
            <Text>Reinvest Destributions</Text>
          </View>
          <View style={{ flex: 0.1, opacity: 0.8, justifyContent: "center", }}>
            <Icon name="chevron-right" type="feather"></Icon>
          </View>
        </TouchableOpacity>
        <View style={[$divider]}></View>
        <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 10 }}>
          <View style={{ flex: 0.1, justifyContent: "center", opacity: 0.8 }}>
            <Icon name="wallet-outline" type="ionicon" size={25} ></Icon>
          </View>
          <View style={{ flex: 0.8, opacity: 0.8, justifyContent: "center", paddingLeft: 10 }}>
            <Text>Payment Method</Text>
          </View>
          <View style={{ flex: 0.1, opacity: 0.8, justifyContent: "center", }}>
            <Icon name="chevron-right" type="feather"></Icon>
          </View>
        </TouchableOpacity>
        <View style={[$divider]}></View>
      </View>


    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.sm
}

const $card: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing.lg,
}

const $divider: ViewStyle = {
  borderBottomColor: colors.border,
  opacity: 0.4,
  borderBottomWidth: 1,
  marginVertical: 5,
}
// @demo remove-file
