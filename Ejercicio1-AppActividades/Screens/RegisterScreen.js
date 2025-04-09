import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const registrar = async () => {
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

    if (usuarios.find(u => u.email === correo)) {
      Alert.alert('Este correo ya está registrado');
      return;
    }

    const nuevoUsuario = { email: correo, password: contrasena };
    usuarios.push(nuevoUsuario);
    await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    Alert.alert('¡Registro exitoso!', 'Ahora puedes iniciar sesión.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      <TextInput placeholder="Correo" style={styles.input} onChangeText={setCorreo} autoCapitalize="none" />
      <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={setContrasena} />
      <Button title="Registrarse" onPress={registrar} color="#a47551" />
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
});
