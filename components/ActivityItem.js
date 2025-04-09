import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default function ActivityItem({ actividad, eliminar, editar }) {
  const hoy = moment().format('YYYY-MM-DD');
  const fecha = actividad.fechaEntrega;

  let color = '#007BFF';
  if (fecha === hoy) color = 'green';
  else if (fecha < hoy) color = 'red';

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.titulo}>{actividad.titulo}</Text>
      <Text>Materia: {actividad.materia}</Text>
      {actividad.grupo ? <Text>Grupo: {actividad.grupo}</Text> : null}
      {actividad.equipo ? <Text>Equipo: {actividad.equipo}</Text> : null}
      <Text>Entrega: {moment(fecha).format('DD-MM-YYYY')}</Text>
      <View style={styles.botones}>
        <TouchableOpacity onPress={() => editar(actividad)}>
          <Text style={{ color: 'blue' }}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminar(actividad.id)}>
          <Text style={{ color: 'red' }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#fffaf4',
    borderLeftWidth: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    marginTop: 10,
  },
});
