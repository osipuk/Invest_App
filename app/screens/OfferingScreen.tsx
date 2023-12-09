import React, { FC, useState, ReactElement, useEffect, useRef, } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, Platform, Dimensions ,TouchableOpacity} from "react-native"
import { ListItem, Screen, Text, Button } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { SearchBar, Icon } from 'react-native-elements';
import { isRTL, translate } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { DrawerIconButton } from "./DemoShowroomScreen/DrawerIconButton"
import { DrawerLayout, DrawerState, FlatList } from "react-native-gesture-handler"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Carousel from 'react-native-reanimated-carousel';

const logo = require("../../assets/images/welcome_logo.png")
// const chainReactLogo = require("../../assets/images/cr-logo.png")
// const reactNativeLiveLogo = require("../../assets/images/rnl-logo.png")
// const reactNativeRadioLogo = require("../../assets/images/rnr-logo.png")
// const reactNativeNewsletterLogo = require("../../assets/images/rnn-logo.png")
const $iconStyle: ImageStyle = { width: 30, height: 30 }
const flatListData  =[{text:'Tempor Id Ea Aliqua Pariatur Aliquip',img:require("../../assets/images/background3.png"),offering:'$5M'},
{text:'Irure Minim Voluptate Consectetur Consequat Sint Esse Proident Irure',img:require("../../assets/images/construction-2.png"),offering:'$10M'}];
  // `Tempor Id Ea Aliqua Pariatur Aliquip. Irure Minim Voluptate Consectetur Consequat Sint Esse Proident Irure`
  //   .split(".")
  //   .map((item) => item.trim())

export const OfferingScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function OfferingScreen(_props) {
    const { navigation } = _props
    const {
      authenticationStore: { logout },
    } = useStores()
    const [open, setOpen] = useState(false);
    const [slideShow, setSlideShow] = useState(true);
    const [searchTxt, setSearchTxt] = useState("");
    const drawerRef = useRef<DrawerLayout>()
    const progress = useSharedValue(0);
  
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
    const goInvestPage=()=>{
      navigation.navigate("BuyInvest");
      console.log('goinvestpage');
    }
    const $drawerInsets = useSafeAreaInsetsStyle(["top"])
    const width = Dimensions.get('window').width;
    const baseOptions=({
      vertical: true,
      loop:false,
    width: width,
       height: Dimensions.get('window').height,
    } as const);
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
            <ListItem style={[$itemS]} onPress={() => logout()} leftIcon="lock">
              {translate("demoNavigator.logout")}
            </ListItem>

          </View>
        )}
      >

        <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container} >
          <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />
          <View style={{ flexDirection: "column", flex: 1, borderTopColor: colors.separator, borderTopWidth: 1 }}>
            <View style={{ flexDirection: "row", flex: 0.1, paddingTop: 20 }}>
              <View style={{ flex: 0.7, paddingLeft: spacing.lg }}>
                {/* <SearchBar containerStyle={$searchS} inputContainerStyle={{ height: 30 }} inputStyle={{ paddingTop: 5, marginLeft: 5 }} platform={Platform.select({ ios: "ios", default: 'android' })} placeholder="Search..." value={searchTxt} onChangeText={(e)=>setSearchTxt(e)}></SearchBar> */}
              </View>
              <View style={{ flex: 0.3, alignItems: 'flex-end', paddingRight: spacing.lg }}>

                <Button
                  preset="default"
                  onPress={() => { setSlideShow(!slideShow); console.log(!slideShow) }}
                  style={{ width: 60, borderRadius: 25, backgroundColor: colors.background, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 9, paddingTop: 4 }}
                >
                  {slideShow ? <Icon name='sliders' type='feather' size={15} /> : <Icon name='columns' type='feather' size={15} />}
                </Button>

              </View>
            </View>
            <View style={{ flex: 0.9 }}>
              {
                slideShow ?

                  <Carousel
                    width={width}
                    autoPlay={false}
                    modeConfig={{ parallaxScrollingOffset: 20, parallaxScrollingScale: 0.2, parallaxAdjacentItemScale: 0.2 }}
                // {...baseOptions}
                    data={flatListData}
                    pagingEnabled={true}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item,index }) => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          // backgroundColor: 'white',
                          flexDirection: 'column'
                        }}
                      >
                        <View style={{ flex: 0.2, justifyContent: 'center', }}>
                          <Text size="xxl" style={{ textAlign: 'center', fontWeight: "900", color: colors.orange }}>{item.offering}</Text>
                          {/* <Text style={{ textAlign: 'center', fontSize: 20 }}>                       
                        {index} Title
                      </Text> */}
                        </View>
                        <View style={{ flex: 0.4, alignItems: 'center' }}>
                          <Image source={item.img} style={{ flex: 1, resizeMode: "contain" }} ></Image>
                        </View>
                        <View style={{ flex: 0.4, paddingTop: 20 }}>
                          <View style={{ justifyContent: 'center', paddingVertical: 10, }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                              -$51.5K (-20.60%) subTitle
                            </Text>
                            <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 18 }}>
                              offering size
                            </Text>
                          </View>
                          <View style={{ paddingHorizontal: 30 }}>
                            <Button preset="reversed" onPress={goInvestPage} style={[$investButton]} textStyle={{ color: 'white' }} >LEARN MORE & INVEST</Button>
                          </View>
                          <View>
                            <Text style={{ textAlign: 'center', paddingTop: 5 }}>COMING SOON!</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  /> : <View style={{ flex: 1 }}>
                    <FlatList
                      data={flatListData}
                      style={$flatListStyle}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          // text={item}
                          // LeftComponent={
                          //   <View style={[$customLeft, { marginEnd: spacing.md }]}>
                          //     <Image source={require("../../assets/images/building.png")} style={{ height: 65, width: 65, resizeMode: "stretch" }}></Image>
                          //   </View>
                          // }
                          // rightIcon="caretRight"
                          // TextProps={{ numberOfLines: 4 }}
                          // bottomSeparator
                        >
                          <View style={{ flexDirection: 'row' ,flex:1,paddingVertical:15}}>
                            <View style={{ flex: 0.2 }}>
                              <View style={[$customLeft,]}>
                                <Image source={item.img} style={{ height: 65, width: 65, resizeMode: "stretch" }}></Image>
                              </View>
                            </View>
                            <View style={{ flex: 0.6,flexDirection:'column', justifyContent: 'center', paddingHorizontal:15}}>                            
                                <Text style={{fontWeight:'bold',opacity:0.8}}  numberOfLines={1}>Main Title</Text> 
                                <Text style={{opacity:0.7,fontSize:15}}  numberOfLines={1}>{item.text}</Text>                               
                            </View>
                            <View style={{ flex: 0.2,flexDirection:'column',justifyContent: 'center',alignItems:'flex-end',paddingRight:15 }}>                          
                                <Text style={{fontWeight:'bold',opacity:0.8,fontSize:15}}>Price</Text>  
                                <Text style={{opacity:0.7}}>$</Text>                               
                            </View>
                          </View>
                          <View style={[$divider2]}></View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>}
            </View>
          </View>
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
const $customLeft: ViewStyle = {
  // backgroundColor: colors.error,
  // flexGrow: 0,
  // flexBasis: 60,
  // height: "100%",
  padding: 5,

  // flexDirection: "row",
  // flexWrap: "wrap",
  overflow: "hidden",
}
const $searchS :ViewStyle={
   height: 45, 
   borderRadius: 20, 
   borderColor: colors.border, 
   borderWidth: 1, 
   backgroundColor: colors.background 
  }
// const $title: TextStyle = {
//   marginBottom: spacing.sm,
// }

// const $tagline: TextStyle = {
//   marginBottom: spacing.xxl,
// }

// const $description: TextStyle = {
//   marginBottom: spacing.lg,
// }

// const $sectionTitle: TextStyle = {
//   marginTop: spacing.xxl,
// }

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
const $investButton: ViewStyle = {
  borderRadius: 25,
  borderColor: colors.orange,
  backgroundColor: colors.orange,
  shadowColor: 'black',
  shadowOffset: { width: 1, height: 32 },
  shadowOpacity: 0.3,
  shadowRadius: 25,
  borderWidth: 2
}
const $flatListStyle: ViewStyle = {
  paddingHorizontal: spacing.xs,
  backgroundColor: colors.palette.neutral200,
  flex: 1,
  overflow: "scroll",
}
// @demo remove-file
