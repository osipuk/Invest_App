import React, { ReactNode } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { colors, spacing, typography } from "../../theme"



export function Investments() {
  

  return (
    <View>
      <Text >no investments</Text>

      
    </View>
  )
}

const $description: TextStyle = {
  marginTop: spacing.md,
}

const $item: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing.lg,
  marginVertical: spacing.md,
}

const $name: TextStyle = {
  fontFamily: typography.primary.bold,
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}

// @demo remove-file
