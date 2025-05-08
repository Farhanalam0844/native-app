// SignUpScreen.js
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

export default function SignUpScreen({ navigation }) {
  const { colors }            = useTheme();
  const [name,     setName]   = useState('');
  const [age,      setAge]    = useState('');
  const [email,    setEmail]  = useState('');
  const [password, setPwd]    = useState('');
  const [secure,   setSecure] = useState(true);
  const [loading,  setLoading]= useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:9000/api/auth/register', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ name, age: Number(age), email, password }),
      });
      const data = await res.json();
        navigation.navigate('Login');
      if (res.ok) {
        alert('Account created! Please log in.');
        navigation.navigate('Login');
      } else {
        alert(data.msg || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Network error — try again.');
    } finally {
      setLoading(false);
    }
  };

  const formIncomplete = !name || !age || !email || !password;

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
            Sign Up
          </Text>

          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            left={<TextInput.Icon icon="calendar" />}
          />

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
            onPress={handleSignUp}
            disabled={loading || formIncomplete}
            style={{ marginTop: 8 }}
            contentStyle={{ paddingVertical: 4 }}

          >
            {loading ? (
              <ActivityIndicator animating color={colors.onPrimary} />
            ) : (
              'Create account'
            )}
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account? Log In</Text>
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
  input: { marginBottom: 12, paddingLeft: 30 },
  link:  { textAlign: 'center', marginTop: 12, color: '#0057D9' },
});

