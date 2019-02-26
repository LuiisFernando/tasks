import React, { Component } from 'react'
import { StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform,
    AsyncStorage
 } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import todayImage from '../../assets/imgs/today.jpg'
import commonstyles from '../commomStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'

import Task from '../components/Task'
import AddTask from './AddTask'

export default class Agenda extends Component {

    state = {
        tasks: [],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false
    }

    componentDidMount = async () => {
        const data = await AsyncStorage.getItem('tasks')
        const tasks = JSON.parse(data) || []
        this.setState({ tasks }, this.filterTasks)
    }

    addTask = task => {
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimatedAt: task.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending);
        }
        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }

    toggleFilter = () => {
        // depois que o estado for alterado será chamado a função filterTasks
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    toggleTask = id => {
        const tasks = [...this.state.tasks]

        tasks.forEach(task => {
            if (task.id === id) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks }, this.filterTasks())
    }

    render() {
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => this.setState({ showAddTask: false })} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commonstyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks} 
                        keyExtractor={item => `${item.id}`}
                        renderItem={ ({ item }) => <Task {...item} onToggleTask={this.toggleTask} 
                                                        onDelete ={this.deleteTask} /> }
                    />
                </View>
                <ActionButton buttonColor={commonstyles.colors.today}
                    onPress={() => this.setState({ showAddTask: true })} />
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
  },
  iconBar: {
      marginTop: Platform.OS === 'ios' ? 30 : 10,
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end'
  }
})
