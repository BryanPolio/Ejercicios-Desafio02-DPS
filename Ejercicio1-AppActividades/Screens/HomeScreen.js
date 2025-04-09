import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ActivityItem from '../components/ActivityItem';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation, cerrarSesion }) {
  const [actividades, setActividades] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    cargarActividades();
  }, [isFocused]);

  const cargarActividades = async () => {
    const data = await AsyncStorage.getItem('actividades');
    setActividades(data ? JSON.parse(data) : []);
  };

  const eliminarActividad = async (id) => {
    const nuevas = actividades.filter(act => act.id !== id);
    setActividades(nuevas);
    await AsyncStorage.setItem('actividades', JSON.stringify(nuevas));
  };

  const editarActividad = (actividad) => {
    navigation.navigate('AgregarActividad', { actividad });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botonCerrarSesion} onPress={cerrarSesion}>
        <Text style={styles.textoCerrarSesion}>Cerrar sesión</Text>
      </TouchableOpacity>

      {actividades.length === 0 ? (
        <Text style={styles.mensaje}>No ha guardado ninguna actividad por el momento.</Text>
      ) : (
        <FlatList
          data={actividades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ActivityItem actividad={item} eliminar={eliminarActividad} editar={editarActividad} />
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      <TouchableOpacity style={styles.botonAgregar} onPress={() => navigation.navigate('AgregarActividad')}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4ede4',
  },
  mensaje: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#5e4634',
  },
  botonAgregar: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: '#d39873',
    padding: 25,
    borderRadius: 30,
    elevation: 5,
  },
  botonCerrarSesion: {
    marginTop: 45,
    alignSelf: 'flex-end',
    backgroundColor: '#a47551',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  textoCerrarSesion: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
