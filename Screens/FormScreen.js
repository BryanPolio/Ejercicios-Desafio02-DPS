import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function FormScreen({ navigation, route }) {
  const actividadEdit = route.params?.actividad || null;

  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState('');
  const [grupo, setGrupo] = useState('');
  const [equipo, setEquipo] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    if (actividadEdit) {
      setTitulo(actividadEdit.titulo);
      setMateria(actividadEdit.materia);
      setGrupo(actividadEdit.grupo || '');
      setEquipo(actividadEdit.equipo || '');
      setFecha(moment(actividadEdit.fechaEntrega).format('DD-MM-YYYY'));
    }
  }, []);

  const guardarActividad = async () => {
    if (!titulo || !materia || !fecha) {
      Alert.alert('Campos sin completar', 'Por favor completa los campos obligatorios.');
      return;
    }

    if (!moment(fecha, 'DD-MM-YYYY', true).isValid()) {
      Alert.alert('Fecha inválida', 'La fecha debe tener el formato DD-MM-YYYY (Dia-Mes-Año).');
      return;
    }

    const nueva = {
      id: actividadEdit ? actividadEdit.id : Date.now(),
      titulo,
      materia,
      grupo,
      equipo,
      fechaEntrega: moment(fecha, 'DD-MM-YYYY').format('YYYY-MM-DD')
    };

    const data = await AsyncStorage.getItem('actividades');
    let actividades = data ? JSON.parse(data) : [];

    if (actividadEdit) {
      actividades = actividades.map(a => a.id === nueva.id ? nueva : a);
    } else {
      actividades.push(nueva);
    }

    await AsyncStorage.setItem('actividades', JSON.stringify(actividades));
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput placeholder="Nombre de la actividad" style={styles.input} value={titulo} onChangeText={setTitulo} />
      <TextInput placeholder="Materia o categoría" style={styles.input} value={materia} onChangeText={setMateria} />
      <TextInput placeholder="Grupo (opcional)" style={styles.input} value={grupo} onChangeText={setGrupo} />
      <TextInput placeholder="Nombre del equipo (opcional)" style={styles.input} value={equipo} onChangeText={setEquipo} />
      <TextInput placeholder="Fecha de entrega (Dia-Mes-Año)" style={styles.input} value={fecha} onChangeText={setFecha} />
      <Button title={actividadEdit ? "Actualizar actividad" : "Guardar Actividad en el Tablon"} onPress={guardarActividad} color="#a47551" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4ede4',
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#a47551',
    marginBottom: 15,
    paddingVertical: 8,
  },
});
