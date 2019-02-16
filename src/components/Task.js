import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
 import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonstyles from '../commomStyles'

export default props => {
    let check = null

    if (props.doneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon name="check" size={20} 
                    color={commonstyles.colors.secondary} />
            </View>
        )
    } else {
        check = <View style={styles.pendding} />
    }

    const descStyle = props.doneAt !== null ?
        { textDecorationLine: 'line-through' } : { }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>{check}</View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.description, descStyle]}>
                    {props.desc}
                </Text>
                <Text style={styles.date}>
                    {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMM')}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      paddingVertical: 10,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#AAA'
  },
  checkContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%'
  },
  pendding: {
      borderWidth: 1,
      height: 25,
      width: 25,
      borderRadius: 15,
      borderColor: '#555'
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
      fontFamily: commonstyles.fontFamily,
      color: commonstyles.colors.mainText,
      fontSize: 15
  },
  date: {
    fontFamily: commonstyles.fontFamily,
    color: commonstyles.colors.subText,
    fontSize: 12
  }
})
