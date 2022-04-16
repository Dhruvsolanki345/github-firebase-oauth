import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import GradientBtn from '../components/GradientBtn'

import {signIn} from "../utils/auth"

export default function Login() {
  return (
    <View>
      <Text>Login</Text>
      <GradientBtn onPress={signIn} title="Login with github" />
    </View>
  )
}

const styles = StyleSheet.create({})