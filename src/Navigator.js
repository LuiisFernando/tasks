// import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Agenda from './screens/Agenda'
import Auth from './screens/Auth'

const MainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: Agenda
    }
}

// definig mainNavigator and initialRoute Auth
const MainNavigator = createSwitchNavigator(MainRoutes, { initialRouteName: 'Auth' })

const MainNav = createAppContainer(MainNavigator)

export default MainNav