import React, { Component } from 'react'
import { StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform
 } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import axios from 'axios'
import { server, showError } from '../commom'

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
        this.loadTasks()
    }

    addTask = async task => {
        try {
            await axios.post(`${server}/tasks`, {
                desc: task.desc,
                estimatedAt: moment(task.date).format('YYYY-MM-DD HH:mm:ss')
            })
            this.setState({ showAddTask: false }, this.loadTasks)
        } catch(err) {
            showError(err)
        }
    }

    deleteTask = async id => {
        try {
            await axios.delete(`${server}/tasks/${id}`)
            await this.loadTasks()
        } catch(err) {
            showError(err)
        }
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
    }

    toggleFilter = () => {
        // depois que o estado for alterado será chamado a função filterTasks
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    toggleTask = async id => {
        try {
            await axios.put(`${server}/tasks/${id}/toggle`)
            await this.loadTasks()
        } catch (err) {
            showError(err)
        }
    }

    loadTasks = async () => {
        try {
            // set maxdate setting current day with hour 23:59 to get only tasks of the day
            const maxDate = moment().format('YYYY-MM-DD 23:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch(err) {
            showError(err)
        }
    }

    openMenu() {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => this.setState({ showAddTask: false })} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='align-justify'
                                size={20} color={commonstyles.colors.secondary} />
                        </TouchableOpacity>
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
