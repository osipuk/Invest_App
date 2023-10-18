import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { 
  Image,
  TextInput, 
  TextStyle,
  View, 
  ViewStyle,
  StyleSheet 
} from "react-native"
import { 
  Button, 
  Icon,
  ListItem, 
  Screen, 
  Text,
  TextField,
  TextFieldAccessoryProps
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const refPasswordInput = useRef<TextInput>()
  // Here is the part of registering password
  const [regPassword, setRegPassword] = useState("")

  const [isRegPasswordHidden, setIsRegPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    // setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      // setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function signup() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setRegPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isRegPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsRegPasswordHidden(!isRegPasswordHidden)}
          />
        )
      },
    [isRegPasswordHidden],
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
      <View style={$content}>
        <Text testID="signup-heading" tx="signupScreen.signUp" preset="heading" style={$signUp} />

        <TextField
          ref={refPasswordInput}
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
          onSubmitEditing={() => refPasswordInput.current?.focus()}
        />

        <TextField
          ref={refPasswordInput}
          value={regPassword}
          onChangeText={setRegPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isRegPasswordHidden}
          placeholderTx="signupScreen.passwordFieldPlaceholder"
          onSubmitEditing={signup}
          RightAccessory={PasswordRightAccessory}
        />

        <Button
          testID="signup-button"
          tx="signupScreen.tapToSignUp"
          style={$tapButton}
          preset="reversed"
          onPress={signup}
        />
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  backgroundColor: colors.appColor,
  height: '100%',
}

const $signUp: TextStyle = {
  marginBottom: spacing.sm,
  marginTop: spacing.xl,
  color: '#1D1E1D',
  textAlign: 'center'
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
  marginTop: spacing.xs,
  backgroundColor: '#1D1E1D',
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

// @demo remove-file
