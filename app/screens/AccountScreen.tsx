import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle,Pressable } from "react-native"
import DatePicker from 'react-native-date-picker';
// import RNPickerSelect from 'react-native-picker-select';
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line

interface AccountScreenProps extends AppStackScreenProps<"Account"> { }

export const AccountScreen: FC<AccountScreenProps> = observer(function AccountScreen(_props) {
  const authPasswordInput = useRef<TextInput>()
  const { navigation } = _props
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [date, setDate] = useState(new Date());
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [open, setOpen] = useState(false);
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
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

  function login() {

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
      preset="scroll"
     
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      {/* <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} /> */}
      {/* {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />} */}

      <TextField
        // value={authEmail}
        // onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        inputWrapperStyle={{marginTop:-5,borderRadius:15}}      
        // autoComplete="email"
        autoCorrect={false}
        LabelTextProps={{ style: { fontSize: 14 } }}
        keyboardType="default"
        labelTx="Account.firstname"
        placeholderTx="Account.holder_firstname"
        // helper={error}
        // status={error ? "error" : undefined}
      // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        // value={authEmail}
        // style={{marginTop:5}}
        // onChangeText={setAuthEmail}
        inputWrapperStyle={{marginTop:-5,borderRadius:15}}      
        containerStyle={$textField}
        autoCapitalize="none"
        // autoComplete="email"
        autoCorrect={false}
        LabelTextProps={{ style: {fontSize: 14 } }}
        keyboardType="default"
        labelTx="Account.lastname"
        placeholderTx="Account.holder_lastname"
      // helper={error}
      // status={error ? "error" : undefined}
      // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        // value={'DD/MM/YYYY'}
        // onChangeText={setAuthEmail}
        // onPressIn={()=>setOpen(true)}
        inputWrapperStyle={{marginTop:-5,borderRadius:15}}      
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="birthdate-full"
        autoCorrect={false}
        LabelTextProps={{ style: { fontSize: 14 } }}
        keyboardType="default"
        labelTx="Account.birthDay"
        placeholder="DD/MM/YYYY"
        // placeholderTx="Account.holder_birthday"
        helper={error}
        status={error ? "error" : undefined}
      // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        // value={authEmail}
        // onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        // autoComplete="cc-number"
        inputWrapperStyle={{marginTop:-5,borderRadius:15}}   
        autoCorrect={false}
        LabelTextProps={{ style: {fontSize: 14 } }}
        keyboardType="default"
        labelTx="Account.phoneNumber"
        placeholderTx="Account.holder_phone"
        helper={error}
        status={error ? "error" : undefined}
      // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />
      <TextField
        // value={authEmail}
        // onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        inputWrapperStyle={{marginTop:-5,borderRadius:15}}   
        // autoComplete="cc-number"
        autoCorrect={false}
        LabelTextProps={{ style: {  fontSize: 14 } }}
        keyboardType="default"
        labelTx="Account.address"
        placeholderTx="Account.holder_address"
        helper={error}
        status={error ? "error" : undefined}
      // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        // value={authEmail}
        // onChangeText={setAuthEmail}
        containerStyle={$textField}
        inputWrapperStyle={{marginTop:-5,borderRadius:15}}   
        autoCapitalize="none"
        
        // autoComplete="cc-number"
        autoCorrect={false}
        LabelTextProps={{ style: {  fontSize: 14 } }}
        keyboardType="default"
        labelTx="Account.city"
        placeholderTx="Account.holder_city"
        helper={error}
        status={error ? "error" : undefined}
      // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      
<TextField
        // value={authEmail}
        // onChangeText={setAuthEmail}
        inputWrapperStyle={{marginTop:-5,borderRadius:15}}   
        containerStyle={$textField}
        autoCapitalize="none"
        // autoComplete="cc-number"
        autoCorrect={false}
        LabelTextProps={{ style: { fontSize: 14 } }}
        keyboardType="default"
        labelTx="Account.state"
        placeholderTx="Account.holder_state"
        helper={error}
        status={error ? "error" : undefined}
      // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />


<TextField
        // value={authEmail}
        // onChangeText={setAuthEmail}
        inputWrapperStyle={{marginTop:-5,borderRadius:15}}   
        containerStyle={$textField}
        autoCapitalize="none"
        // autoComplete="cc-number"
        autoCorrect={false}
        LabelTextProps={{ style: { fontSize: 14 } }}
        keyboardType="default"
        labelTx="Account.country"
        placeholderTx="Account.holder_country"
        helper={error}
        status={error ? "error" : undefined}
      // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />
      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
    {/* <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={d => {
          setOpen(false);
          setDate(d);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  paddingBottom:spacing.xl,
  paddingHorizontal: spacing.lg,
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
  marginBottom: spacing.xxs,
 
 
}

const $tapButton: ViewStyle = {
  marginTop: spacing.lg
}

// @demo remove-file
