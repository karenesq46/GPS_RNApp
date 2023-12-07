import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import loginImage from './assets/loginImage.jpg';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticación
    if (username === 'ojuelos' && password === '123qwe') {
      navigation.navigate('MapScreen');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={loginImage} style={styles.image} />

      {/* Campo de usuario */}
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      {/* Campo de contraseña */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        {/* Botón para mostrar/ocultar contraseña */}
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Botón de inicio de sesión */}
      <Button title="Iniciar Sesión" color="#79D8BA" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 200, // Ajusta el ancho de la imagen
    height: 200, // Ajusta la altura de la imagen
    marginBottom: 20,
  },
  input: {
    height: 50, // Ajusta la altura del campo de texto de usuario
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: 200,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    height: 50, // Ajusta la altura del campo de texto de contraseña
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: 200,
  },
});

export default LoginScreen;
