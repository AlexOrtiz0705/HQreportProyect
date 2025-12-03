// LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    if (email === 'admin@hqreport.com' && password === '123456') {
      navigation.replace('main');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }

  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar 
        backgroundColor="transparent" 
        translucent={true} 
        barStyle="light-content"
      />
      
      {/* Fondo de imagen SIN overlay blanco */}
      <ImageBackground
        source={{uri: 'https://media.istockphoto.com/id/1285812374/es/foto/black-sand-playa-macro-fotograf%C3%ADa-textura-de-arena-volc%C3%A1nica-negra-para-fondo-vista-macro-de.jpg?s=612x612&w=0&k=20&c=RAv7M8TtC5kiD_afrLuAtWTqSUUTgemg5SemquwcJSs='}}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Overlay oscuro para mejorar legibilidad del texto */}
        <View style={styles.darkOverlay} />
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Contenido principal SIN fondo blanco completo */}
          <View style={styles.content}>
            {/* Logo/Header */}
            <View style={styles.header}>
               {/*  <Image source={require('../assets/IconT.png')} />*/}
              <Text style={styles.logo}>HQREPORT</Text>
            </View>

            {/* Formulario con fondo blanco SOLO en la tarjeta */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Usuario</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu usuario"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Botón de Iniciar Sesión */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              {/* Registro */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                  ¿Aún no tienes una cuenta?{' '}
                   
                </Text>
                // En tu LoginScreen.js
                <TouchableOpacity 
                  style={styles.forgotPasswordText} 
                  onPress={() => navigation.navigate('RegistroScreen')} // ← Aquí está el cambio
                >
                  <Text style={styles.forgotPasswordText}>Regístrate</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer con texto blanco para contrastar con fondo oscuro */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                © 2025 HQR. Todos los derechos reservados.
              </Text>
              <Text style={styles.footerText}>
                Contactos: hqr@contracto.com
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Overlay oscuro para mejorar legibilidad
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // Espacio para status bar
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Blanco con ligera transparencia
    borderRadius: 25,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputContainerr: {
    marginBottom: 25,
     backgroundColor: '#002147ff',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
    shadowColor: '#022146ff'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 25,
  },
  registerText: {
    color: '#666',
    fontSize: 15,
  },
  registerLink: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default LoginScreen;