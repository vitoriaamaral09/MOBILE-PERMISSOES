import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import openDB from './db';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = openDB();

  useEffect(() => {
    loadTheme();
    loadLocations();
  }, []);

  const saveTheme = async (value) => {
    try {
      await AsyncStorage.setItem('@theme', value);
      setTheme(value);
    } catch (e) {
      console.log('Erro ao salvar tema', e);
    }
  };

  const loadTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('@theme');
      if (value !== null) setTheme(value);
    } catch (e) {
      console.log('Erro ao carregar tema', e);
    }
  };

  const loadLocations = () => {
    try {
      const rows = db.getAllSync('SELECT * FROM locations ORDER BY id DESC', []);
      setLocations(rows);
    } catch (e) {
      console.log('Erro ao carregar localizações', e);
    }
  };

  const addLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de localização negada');
      setLoading(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = loc.coords;
    const timestamp = new Date().toLocaleString();

    try {
      db.runSync('INSERT INTO locations (latitude, longitude, timestamp) VALUES (?, ?, ?)', [latitude, longitude, timestamp]);
      loadLocations();
    } catch (e) {
      console.log('Erro ao inserir localização', e);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    saveTheme(newTheme);
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.dark]}>
      <Text style={[styles.title, theme === 'dark' && styles.darkText]}>MyLocationApp</Text>
      <Button title="Capturar localização" onPress={addLocation} disabled={loading} />
      <View style={{ marginVertical: 8 }} />
      <Button title={`Mudar tema (${theme})`} onPress={toggleTheme} />
      <View style={{ marginVertical: 12 }} />
      <FlatList
        data={locations}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={[styles.item, theme === 'dark' && styles.itemDark]}>
            <Text style={[styles.text, theme === 'dark' && styles.darkText]}>
              Lat: {item.latitude.toFixed(5)} | Lng: {item.longitude.toFixed(5)}
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.darkText]}>{item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  dark: { backgroundColor: '#121212' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  darkText: { color: '#fff' },
  text: { color: '#333' },
  item: { padding: 10, backgroundColor: '#fff', marginBottom: 8, borderRadius: 6 },
  itemDark: { backgroundColor: '#1e1e1e' }
});
