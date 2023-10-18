import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { Image, View, TextInput, TextStyle, ViewStyle } from "react-native"
import {
  Toggle,
  Button, 
  Icon, 
  Screen, 
  Text, 
  TextField, 
  TextFieldAccessoryProps 
} from "../components"

import FontIcon from 'react-native-vector-icons/FontAwesome'
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props

  const refAuthPasswordInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMemoPassword, setIsMemoPassword] = useState(0)

  const [attemptsCount, setAttemptsCount] = useState(0)

  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  const login = () => {
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

  const goSignUp = () => {
    navigation.navigate("Register");
 
  }

  const removeSignInWindow = () => {

  }

  const onChangeSetMemoPassword = (value) => {

  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
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
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      backgroundColor={colors.palette.appColor}
      safeAreaEdges={["top", "bottom"]}
    >
      <Image
        source={require('../../assets/images/logo_white.png')}
        style={$logo}
      />
      <FontIcon 
        name="remove"
        size={26}
        color="white"
        style={$removeIcon}
        onPress={removeSignInWindow}
      />

      <View style={$content}>
        <Text testID="signup-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />

        <TextField
          ref={refAuthPasswordInput}
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          placeholderTx="signupScreen.emailFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => refAuthPasswordInput.current?.focus()}
        />

        <TextField
          ref={refAuthPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          placeholderTx="signupScreen.passwordFieldPlaceholder"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />

        <Toggle
          variant="checkbox"
          value={isMemoPassword}
          onValueChange={onChangeSetMemoPassword}
          labelTx="loginScreen.rememberMe"
          labelStyle={{ color: "#1D1E1D" }}
          containerStyle={{ backgroundColor: "#fff" }}
        />

        <Button
          testID="signup-button"
          tx="loginScreen.tapToSignIn"
          style={$tapButton}
          preset="reversed"
          onPress={login}
        />

        <Text style={$addionText}>
          Forgot your password? <Text style={$spanInAddText} onPress={goSignUp}>Reset Password</Text>
        </Text>
        <Text style={$addionText}>
          Not on Hamas4u? <Text style={$spanInAddText} onPress={goSignUp}>Create Account</Text>
        </Text>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  backgroundColor: colors.appColor,
  height: '100%',
}

const $signIn: TextStyle = {
  marginBottom: spacing.xl,
  marginTop: spacing.xl,
  color: '#1D1E1D',
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold',
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.lg,
  marginBottom: spacing.xl,
  backgroundColor: '#1D1E1D',
  borderRadius: 30,
  minHeight: 30
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.lg,
  position: 'absolute',
  height: '75%',
  width: '100%',
  backgroundColor: 'white',
  bottom: 0,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

const $logo: ViewStyle = {
  resizeMode: 'contain',
  width: '100%',
  marginTop: -15,
}

const $removeIcon: ViewStyle = {
  position: 'absolute',
  top: 28,
  right: 20,
}

const $addionText: ViewStyle = {
  paddingBottom: spacing.sm,
}

const $spanInAddText: ViewStyle = {
  color: '#85D094',
  fontWeight: 'bold',
}
// @demo remove-file
