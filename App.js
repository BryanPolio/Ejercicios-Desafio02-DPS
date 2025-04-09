
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './Screens/HomeScreen';
import FormScreen from './Screens/FormScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    const verificarSesion = async () => {
      const user = await AsyncStorage.getItem('usuario');
      if (user) setUsuarioLogueado(JSON.parse(user));
    };
    verificarSesion();
  }, []);

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('usuario');
    setUsuarioLogueado(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuarioLogueado ? (
          <>
            <Stack.Screen name="Inicio" options={{ headerShown: false }}>
              {props => <HomeScreen {...props} cerrarSesion={cerrarSesion} />}
            </Stack.Screen>
            <Stack.Screen name="AgregarActividad" component={FormScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setUsuario={setUsuarioLogueado} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}