import React, { FC, useState, ReactElement, useEffect, useRef, } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, Platform, Dimensions, TouchableOpacity, useWindowDimensions, StatusBar, Animated } from "react-native"
import { ListItem, Screen, Text, Button } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { color, useSharedValue, withTiming } from "react-native-reanimated"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import { openLinkInBrowser } from "../utils/openLinkInBrowser"
// import { SearchBar, Icon } from 'react-native-elements';
import { isRTL, translate } from "../i18n"
import { DrawerIconButton } from "./DemoShowroomScreen/DrawerIconButton"
import { DrawerLayout, DrawerState, FlatList } from "react-native-gesture-handler"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

import { Investments } from "./Portfolio/Investments"
import { Pending } from "./Portfolio/Pending"
const logo = require("../../assets/images/welcome_logo.png")
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const ThreeRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const renderScene = SceneMap({
  first: Investments,
  second: Pending,
  three: ThreeRoute,
});



export const PortfolioScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function PortfolioScreen(_props) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = React.useState(0);
    const drawerRef = useRef<DrawerLayout>()
    const progress = useSharedValue(0)
    const toggleDrawer = () => {
      progress.value = open ? 0 : 1;
      console.log(open);
      if (!open) {
        setOpen(true)
        drawerRef.current?.openDrawer({ speed: 2 })
      } else {
        setOpen(false)

        drawerRef.current?.closeDrawer({ speed: 2 })
      }

    }
    const $drawerInsets = useSafeAreaInsetsStyle(["top"])
    const width = Dimensions.get('window').width;

    const layout = useWindowDimensions();


    const [routes] = React.useState([
      { key: 'first', title: 'INVESTMENTS' },
      { key: 'second', title: 'PENDING TRANSACTIONS' },
      { key: 'three', title: 'TRANSACTION HISTORY' }
    ]);
    const _renderTabBar = (props) => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
      console.log(inputRange, 'input range props');
      return (
        <TabBar  {...props}
          renderLabel={({ route, focused }) => (
            <Text style={focused ? $tabLabelFocused : $tabLabel}>
              {route.title}
            </Text>
          )}
          // tabStyle={{  minHeight: 25 }} 
          style={$tabBar2}
          indicatorStyle={$indicator}
        />
      );
    };

    return (
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={Platform.select({ default: 286, web: Dimensions.get("window").width * 0.3 })}
        drawerType={"slide"}
        drawerPosition={isRTL ? "right" : "left"}
        overlayColor={open ? colors.palette.overlay20 : "transparent"}
        drawerBackgroundColor="green"
        // onDrawerSlide={(drawerProgress) => {
        //   console.log('drawerProgress',drawerProgress)
        //   progress.value = open ? 1 - drawerProgress : drawerProgress
        // }}
        // onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
        //   if (newState === "Settling") {
        //     progress.value = withTiming(drawerWillShow ? 1 : 0, {
        //       duration: 250,
        //     })
        //     setOpen(drawerWillShow)
        //   }
        // }}
        renderNavigationView={() => (
          <View style={[$drawer, $drawerInsets]}>
            <View style={$logoContainer}>
              <Image source={logo} style={$logoImage} resizeMode="stretch" />
            </View>
            <View style={[$divider]}></View>

            <ListItem style={[$itemS]} onPress={() => console.log('ddd')} leftIcon="components">
              {translate("demoNavigator.offering")}
            </ListItem>

            <ListItem style={[$itemS]} onPress={() => console.log('ddd')} leftIcon="view">
              {translate("demoNavigator.portfolio")}
            </ListItem>
            <ListItem style={[$itemS]} onPress={() => console.log('ddd')} leftIcon="community">
              {translate("demoNavigator.myaccount")}
            </ListItem>
            <View style={[$divider]}></View>
            <ListItem style={[$itemS]} onPress={() => console.log('ddd')} leftIcon="lock">
              {translate("demoNavigator.logout")}
            </ListItem>

          </View>
        )}
      >

        <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container} >
          <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />
          <TabView
            navigationState={{ index, routes }}
            // style={{backgroundColor:'red'}}

            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={_renderTabBar}

            initialLayout={{ width: layout.width }}
          />
        </Screen>
      </DrawerLayout>

    )
  }

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background
  // paddingTop: spacing.lg + spacing.xl,
  // paddingHorizontal: spacing.lg,
}
const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}
const $logoImage: ImageStyle = {
  height: 50,
  width: 160,
}
const $divider: ViewStyle = {
  borderBottomColor: colors.tint,
  opacity: 0.2,
  borderBottomWidth: 1,
  margin: 15,
}
const $divider2: ViewStyle = {
  borderBottomColor: colors.border,
  opacity: 0.2,
  borderBottomWidth: 1,
}
const $itemS: ViewStyle = {
  paddingLeft: spacing.lg
}


const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
}

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}




const $tabLabel: TextStyle = {
  color: 'gray', // Set the color of unselected tab labels.
  fontSize: 13,
  textAlign: "center",
  lineHeight: 15

}
const $tabLabelFocused: TextStyle = {
  color: colors.tint, // Set the color of the selected tab label.
  opacity: 0.9,
  fontSize: 13,
  lineHeight: 15,
  textAlign: 'center'
}
const $tabBar2: ViewStyle = {
  backgroundColor: colors.background, // Set the background color of the tab bar.
  height: 50
  // borderBottomWidth: 1,     // Set the bottom border width.
  // borderBottomColor: 'gray', 
}
const $indicator: ViewStyle = {
  backgroundColor: colors.tint,
  height: 3
}
// @demo remove-file
