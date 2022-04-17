import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../store/user'
import GradientBtn from '../components/GradientBtn';
import { signOutAsync } from '../utils/auth';

export default function Profile() {
  const user = useRecoilValue(userState);

  console.log({user})

  return (
    <View>
      <Text>Profile</Text>
      <GradientBtn title="Sign Out" onPress={signOutAsync} />
    </View>
  )
}

const styles = StyleSheet.create({})