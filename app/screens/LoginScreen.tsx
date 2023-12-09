import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, View,Image,BackHandler } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()
  const { navigation } = _props
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  function goSignUp() {
    navigation.navigate("Register");

  }
  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={'white'}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      KeyboardAvoidingViewProps={{enabled:true,keyboardVerticalOffset:-80}}
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["bottom"]}
    >
      {/* <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} /> */}

      <View style={{ flex: 0.3,alignItems:'center',justifyContent:'center'}} >
        <Image source={require("../../assets/images/welcome_logo.png")} style={{width:300,height:100}} resizeMethod="resize"></Image>
      </View>
      <View style={{ flex: 0.7 ,paddingHorizontal: spacing.lg,borderRadius:10,backgroundColor:'#081f3f',justifyContent:'center'}}>
        {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}
        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          placeholderTextColor={'#a2afbd'}
          keyboardType="email-address"
          labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          helper={error}
          style={{color:'white'}}
          LabelTextProps={{style:{opacity:0.8,paddingLeft:10,marginBottom:5,color:'white',}}}
          inputWrapperStyle={{borderRadius:25,backgroundColor:'#081f3f',borderColor:'white',}}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField2}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          placeholderTextColor={'#a2afbd'}
          style={{color:'white'}}
          LabelTextProps={{style:{opacity:0.8,paddingLeft:10,marginBottom:5,color:'white',}}}
          inputWrapperStyle={{borderRadius:25,backgroundColor:'#081f3f',borderColor:'white',}}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />
<View style={{alignItems:'flex-end'}}>
  <Text tx="loginScreen.forgotPassword" style={{fontSize:14, color:'red'}} onPress={()=>BackHandler.exitApp()}></Text>
</View>
        <Button
          testID="login-button"
          tx="loginScreen.signIn"
          textStyle={{color:'#081f3f'}}
          style={$tapButton}
          preset="reversed"
          onPress={login}
        />
        <Button
          testID="login-button"
          tx="loginScreen.signUp"
          textStyle={{color:'#081f3f'}}
          style={$tapButton}
          preset="reversed"
          onPress={goSignUp}
        />
      </View>


    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xl,
  // paddingHorizontal: spacing.lg,
  flexDirection: 'column',
  flex:1
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.background,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg, 
}

const $textField2: ViewStyle = {
  marginBottom: spacing.xxs,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.md,
  backgroundColor:'white',
  borderRadius:20,

  
}

// @demo remove-file
