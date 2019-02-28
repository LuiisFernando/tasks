import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native'
import axios from 'axios'
import { server, showError } from '../commom'
import commonStyle from '../commomStyles'
import backgroundImage from '../../assets/imgs/login.jpg'

import AuthInput from '../components/AuthInput'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    signin = async () => {
 
        try {
            axios.create(axios.defaults);
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })
            
            // set Authorization for any request 
            axios.defaults.headers.common = {'Authorization': `bearer ${res.data.token}`}

            //navigate to home
            this.props.navigation.navigate('Home')
        } catch(err) {
            Alert.alert('Erro', 'Falha no Login! ' + err)
        }
    }

    signup = async () => {

        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            Alert.alert('Nice!', 'Usuário cadastrado com sucesso =D')
            this.setState({ stageNew: false })
        } catch(err) {
            showError(err)
        }
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
           this.signin()
        }
    }

    render() {
        const validations = []
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        validations.push(this.state.email && regex.exec(this.state.email))
        validations.push(this.state.password && this.state.password.length >= 3)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim())
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
        }
        
        //all is all validations and v is single validation if any validation is false, then valid form receive false
        const validForm = validations.reduce((all, v) => all && v)

        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>

                    <Text style={styles.subtitle}>
                        { this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados' }
                    </Text>

                    {this.state.stageNew && 
                        <AuthInput icon='user' placeholder='Nome' style={styles.input}
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })} />}

                    <AuthInput icon='at' placeholder='E-mail' style={styles.input}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} />
                        
                    <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' 
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })} />

                    {this.state.stageNew && 
                        <AuthInput icon='asterisk' secureTextEntry={true} placeholder='Confirmação' 
                            style={styles.input}
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />}

                    <TouchableOpacity disabled={!validForm}
                        onPress={this.signinOrSignup}>
                        <View style={[styles.button, !validForm ? { backgroundColor: '#AAA'} : {}]}>
                            <Text style={styles.buttonText}>
                                { this.state.stageNew ? 'Registrar' : 'Entrar' }
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: 10 }} 
                        onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonText}>
                            { this.state.stageNew ? 'Já possui conta ?' : 'Ainda não possui conta ?'}
                        </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyle.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyle.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 20,
        color: '#FFF'
    }
})
