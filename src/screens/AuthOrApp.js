import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, AsyncStorage, Alert } from 'react-native'

import axios from 'axios'

export default class AuthOrApp extends Component {
    componentWillMount = async () => {
        const json = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(json) || null // if is null on json set empty object to userData

        if (userData) {
            axios.defaults.headers.common = {'Authorization': `bearer ${userData.token}`}

            this.props.navigation.navigate('Home', userData)
        } else {
            this.props.navigation.navigate('Auth')            
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black'
  }
})
