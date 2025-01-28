import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRegisterContext } from '../../context/userRegisterContext'; // Importa el hook
import { checkRut, prettifyRut } from 'react-rut-formatter'; // Importa las funciones de react-rut-formatter

const RegisterScreen = () => {
  const router = useRouter();
  const { setRegisterData } = useRegisterContext(); // Usar el hook directamente
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleContinue = () => {
    if (!nombre || !apellido || !rut || !fechaNacimiento || !telefono) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (!checkRut(rut)) {
      Alert.alert('Error', 'RUT inválido. Por favor, ingresa un RUT válido.');
      return;
    }

    // Almacenar datos en el contexto
    setRegisterData({
      nombre,
      apellido,
      rut: prettifyRut(rut),
      fechaNacimiento,
      telefono,
    });

    // Pasar a la pantalla de selección de servicios
    router.push('/register/profiletype');
  };

  return (
    <View style={styles.container}>
      {/* Botón para volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subtitle}>
        Crea una cuenta para empezar a promocionar tus servicios con el mundo!
      </Text>

      {/* Campo Nombre */}
      <Text style={styles.inputLabel}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Juan"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Campo Apellido */}
      <Text style={styles.inputLabel}>Apellido</Text>
      <TextInput
        style={styles.input}
        placeholder="Perez"
        value={apellido}
        onChangeText={setApellido}
      />

      {/* Campo RUT */}
      <Text style={styles.inputLabel}>RUT</Text>
      <TextInput
        style={styles.input}
        placeholder="12.345.678-9"
        value={rut}
        onChangeText={setRut}
        onBlur={() => setRut(prettifyRut(rut))}
        keyboardType="default"
      />

      {/* Campo Fecha de nacimiento */}
      <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="12/12/2000"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
        keyboardType="number-pad"
      />

      {/* Campo Teléfono */}
      <Text style={styles.inputLabel}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="912345678"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      {/* Botón Continuar */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1E293B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#1E293B',
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;