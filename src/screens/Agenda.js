import React, { Component } from 'react'
import { StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonstyles from '../commomStyles'

import Task from '../components/Task'

export default class Agenda extends Component {

    state = {
        tasks: [
            { id: Math.random(), desc: 'Aprender react-native', estimatedAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Terminar o curso react-native', estimatedAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Aprender react-native', estimatedAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Terminar o curso react-native', estimatedAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Aprender react-native', estimatedAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Terminar o curso react-native', estimatedAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Aprender react-native', estimatedAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Terminar o curso react-native', estimatedAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Aprender react-native', estimatedAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Terminar o curso react-native', estimatedAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Aprender react-native', estimatedAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Terminar o curso react-native', estimatedAt: new Date(), doneAt: null },
        ]
    }

    toggleTask = id => {
        // const tasks = [...this.state.tasks]
        const tasks = this.state.tasks.map(task => {
            if (task.id === id) {
                task = {...task}
                task.doneAt = task.doneAt ? null : new Date()
            }
            return task
        })
        // tasks.forEach(task => {
        //     if (task.id === id) {
        //         task.doneAt = task.doneAt ? null : new Date()
        //     }
        // })
        this.setState({ tasks })
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.tasks} 
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  background: {
      flex: 3
  },
  titleBar: {
      flex: 1,
      justifyContent: 'flex-end'
  },
  title: {
      fontFamily: commonstyles.fontFamily,
      color: commonstyles.colors.secondary,
      fontSize: 50,
      marginLeft: 20,
      marginBottom: 10
  },
  subtitle: {
    fontFamily: commonstyles.fontFamily,
    color: commonstyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  taskContainer: {
      flex: 7
  }
})
