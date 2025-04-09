import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, setUsuario }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const iniciarSesion = async () => {
    if (!validarEmail(correo)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo válido.');
      return;
    }

    if (contrasena.length < 7) {
      Alert.alert('Contraseña muy corta', 'Debe tener al menos 7 caracteres.');
      return;
    }

    const data = await AsyncStorage.getItem('usuarios');
    const usuarios = data ? JSON.parse(data) : [];
    const usuarioExistente = usuarios.find(u => u.email === correo && u.password === contrasena);

    if (usuarioExistente) {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuarioExistente));
      setUsuario(usuarioExistente);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar sesión</Text>
      <TextInput placeholder="Correo" style={styles.input} onChangeText={setCorreo} autoCapitalize="none" />
      <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={setContrasena} />
      <Button title="Ingresar" onPress={iniciarSesion} color="#a47551" />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4ede4',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#a47551',
    marginBottom: 15,
    paddingVertical: 8,
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    color: '#5e4634',
  },
  link: {
    color: '#8a5c3e',
    marginTop: 10,
    textAlign: 'center',
  },
});
