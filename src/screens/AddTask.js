import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    DatePickerIOS,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    DatePickerAndroid,
    Platform
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonstyles from '../commomStyles'

export default class AddTask extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            desc: '',
            date: new Date()
        }
    }

    save = () => {
        if (!this.state.desc.trim()) {
            Alert.alert('Dados inválidos', 'Informe uma descrição para a tarefa')
            return
        }
        const data = { ...this.state }
        this.props.onSave(data)
    }

    handleDateAndroidChanged = () => {
        DatePickerAndroid.open({
            date: this.state.date
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment(this.state.date)
                momentDate.date(e.day)
                momentDate.month(e.month)
                momentDate.year(e.year)
                this.setState({ date: momentDate.toDate() })
            }
        })
    }

    render() {

        let datePicker = null
        if (Platform.OS === 'ios') {
            datePicker = <DatePickerIOS mode='date' date={this.state.date}
                onDateChange={date => this.setState({ date })} />
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format('ddd, D [de] MMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}
                onShow={() => this.setState({ ...this.getInitialState() })}>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa!</Text>
                    <TextInput placeholder="Descrição" style={styles.input}
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} />
                        {datePicker}
                        <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      justifyContent: 'space-between'
  },
  offset: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  button: {
      margin: 20,
      marginRight: 30,
      color: commonstyles.colors.default
  },
  header: {
      fontFamily: commonstyles.fontFamily,
      backgroundColor: commonstyles.colors.default,
      color: commonstyles.colors.secondary,
      textAlign: 'center',
      padding: 15,
      fontSize: 15
  },
  input: {
    fontFamily: commonstyles.fontFamily,
    width: '90%',
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6
  },
  date: {
    fontFamily: commonstyles.fontFamily,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'center'
  }
})
