// LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginInScreen({ navigation }) {
  const { colors }         = useTheme();
  const [email, setEmail]  = useState('');
  const [password, setPwd] = useState('');
  const [secure, setSecure]        = useState(true);
  const [loading, setLoading]      = useState(false);

const API_BASE =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:9000'  
    : 'http://localhost:9000'; 

// inside your component
const handleLogin = async () => {
console.log("in handle login");
  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ email, password }),
    });
    /* ---------- safe response parsing ---------- */
       navigation.navigate('Home');
    const raw = await res.text();              // always succeeds
    let data  = {};
    try {                                      // try to decode JSON
      data = raw ? JSON.parse(raw) : {};
      console.log("data",data)
    } catch {
      data = { msg: raw };                     // fall back to plain text
    }
    /* ------------------------------------------ */
    if (res.ok) {
      console.log('Logged in!');
       navigation.navigate('Home');
    } else if (res.status === 401 || res.status === 400) {
      console.log(data.msg || 'Email or password is incorrect');
    } else {
      console.log(data.msg || `Server error: ${res.status}`);
    }
  } catch (err) {
    console.error(err);
    console.log('Network error — check Wi-Fi / server status');
  } finally {
    setLoading(false);
  }
};
  return (
    <LinearGradient
      colors={['#77A1D3', '#79CBCA', '#E684AE']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.center}
      >
        <View style={styles.card}>
          <Text variant="headlineMedium" style={styles.title}>
            Log In
          </Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"

            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPwd}
            mode="outlined"
            secureTextEntry={secure}
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={secure ? 'eye' : 'eye-off'}
                onPress={() => setSecure(!secure)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            disabled={loading || !email || !password}
            style={{ marginTop: 8 }}
            contentStyle={{ paddingVertical: 4 }}
          >
            {loading ? (
              <ActivityIndicator animating color={colors.onPrimary} />
            ) : (
              'Log In'
            )}
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 24,
    borderRadius: 12,
    elevation: 6,
  },
  title: { textAlign: 'center', marginBottom: 16 },
  input: { marginBottom: 12, paddingLeft:30 },
  link:  { textAlign: 'center', marginTop: 12, color: '#0057D9' },
});

