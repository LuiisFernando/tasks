import React from 'react'
import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'

import commomStyles from './commomStyles'

import Menu from './screens/Menu'
import Agenda from './screens/Agenda'
import Auth from './screens/Auth'

const MenuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <Agenda title='Hoje' daysAhead={0} {...props} />,
        navigationOptions: {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <Agenda title='Amanhã' daysAhead={1} {...props} />,
        navigationOptions: {
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <Agenda title='Semana' daysAhead={7} {...props} />,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <Agenda title='Mês' daysAhead={30} {...props} />,
        navigationOptions: {
            title: 'Mês'
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,
    tabBarOptions: {
        style: {
            labelStyle: commomStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 80
        }
        
    },
    activeLableStyle: {
        color: 'red'
    }
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, MenuConfig)


const MainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: MenuNavigator
    }
}

// definig mainNavigator and initialRoute Auth
const MainNavigator = createSwitchNavigator(MainRoutes, { initialRouteName: 'Auth' })

const MainNav = createAppContainer(MainNavigator)

export default MainNav