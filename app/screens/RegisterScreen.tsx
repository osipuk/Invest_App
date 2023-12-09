import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, View, Image } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps,Toggle, ToggleProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing, typography } from "../theme"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> { }

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
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
    setAuthEmail("")
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
  function goCancel() {
    navigation.navigate("Login")
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
      KeyboardAvoidingViewProps={{ enabled: true, keyboardVerticalOffset: -80 }}
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }} >
        <Image source={require("../../assets/images/welcome_logo.png")} style={{ width: 300, height: 100 }} resizeMethod="resize"></Image>
      </View>
      <View style={{ flex: 0.8, paddingHorizontal: spacing.lg, borderRadius: 10, backgroundColor: '#081f3f', justifyContent: 'center' }}>
        {/* <View style={{justifyContent:'center',alignItems:'center',paddingVertical:20}}>
        <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>SignUp</Text>
      </View> */}
        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          placeholderTextColor={'#a2afbd'}
          helper={error}
          style={{ color: 'white' }}
          LabelTextProps={{ style: { opacity: 0.8, paddingLeft: 10, marginBottom: 5, color: 'white', } }}
          inputWrapperStyle={{ borderRadius: 25, backgroundColor: '#081f3f', borderColor: 'white', }}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />
        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          helper={error}
          style={{ color: 'white' }}
          LabelTextProps={{ style: { opacity: 0.8, paddingLeft: 10, marginBottom: 5, color: 'white', } }}
          inputWrapperStyle={{ borderRadius: 25, backgroundColor: '#081f3f', borderColor: 'white', }}
          secureTextEntry={isAuthPasswordHidden}
          placeholderTextColor={'#a2afbd'}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          onSubmitEditing={login}
          status={error ? "error" : undefined}
          RightAccessory={PasswordRightAccessory}
        />
        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          placeholderTextColor={'#a2afbd'}
          autoComplete="password"
          autoCorrect={false}
          helper={error}
          style={{ color: 'white' }}
          LabelTextProps={{ style: { opacity: 0.8, paddingLeft: 10, marginBottom: 5, color: 'white', } }}
          inputWrapperStyle={{ borderRadius: 25, backgroundColor: '#081f3f', borderColor: 'white', }}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.confirmpasswordLabel"
          placeholderTx="loginScreen.confirmpasswordFieldPlaceholder"
          onSubmitEditing={login}
          status={error ? "error" : undefined}
          RightAccessory={PasswordRightAccessory}
        />
           <ControlledToggle
        variant="checkbox"
        label="I agree to the Terms of Use & Privacy Policy"
        helper=""
        inputOuterStyle={{  backgroundColor: '#081f3f',
          borderColor: 'white'}}
        labelStyle={{color:'white',fontWeight:'normal'}}
        inputInnerStyle={{
          backgroundColor: '#081f3f',          
        }}
        
     
      />
        <View style={{ flexDirection: 'row',marginTop:30 }}>
          <View style={{ flex: 0.4 }}>
            <Button
              testID="login-button"
              tx="loginScreen.signUp1"
              textStyle={{color:'#081f3f',fontSize:14,fontWeight:'normal'}}
              style={$tapButton}
              preset="reversed"
              onPress={login}
            />
          </View>
          <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>OR</Text>
          </View>
          <View style={{ flex: 0.4 }}>
          <Button
              testID="login-button"
              tx="loginScreen.cancel"
              textStyle={{color:'white',fontSize:14,fontWeight:'normal'}}
              style={$cancelButton}
              preset="reversed"
              onPress={goCancel}
            />
          </View>

        </View>

      </View>


    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xl,
  // paddingHorizontal: spacing.lg,
  flexDirection: 'column',
  flex: 1
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.md
}
const $textField2: ViewStyle = {
  marginBottom: spacing.xxs,
}
const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  borderRadius: 10,
  backgroundColor:'white'
}
const $cancelButton: ViewStyle = {
  marginTop: spacing.xs,
  borderRadius: 10,
  backgroundColor:'#081f3f',
  borderColor:'white',
  borderWidth:2
}
// @demo remove-file
