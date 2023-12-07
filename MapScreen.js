import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import logo from './assets/logo.jpg';
import NavigationHeader from './NavigationHeader';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // radio de la Tierra en kilómetros
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
};

const MapScreen = () => {
  const navigation = useNavigation();
  const [mapRegion, setMapRegion] = useState({
    latitude: 19.289,
    longitude: -99.7009,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState({
    veterinaria: {
      latitude: 19.289781722099555,
      longitude: -99.70096412185161,
      title: 'Veterinaria',
      description: 'Veterinaria Ojuelos',
      image: logo,
    },
    repartidor1: {
      latitude: 19.30109101593665,
      longitude: -99.72627166526158,
      title: 'Repartidor #1',
      description: 'Ubicación del Repartidor #1',
    },
    repartidor2: {
      latitude: 19.29958652222124,
      longitude: -99.69030477900111,
      title: 'Repartidor #2',
      description: 'Ubicación del Repartidor #2',
    },
  });

  const [repartidorDistances, setRepartidorDistances] = useState({});
  const [userPhoto, setUserPhoto] = useState(require('./assets/user.png'));
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const toggleLogoutModal = useCallback(() => {
    setLogoutModalVisible(!isLogoutModalVisible);
  }, [isLogoutModalVisible]);

  const handleLogout = () => {
    toggleLogoutModal();
    navigation.navigate('Login');
  };

  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

      if (location && location.coords) {
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.092,
          longitudeDelta: 0.0421,
        });

        console.log('Ubicación actual:', location.coords.latitude, location.coords.longitude);

        // Calcular distancias y actualizar el estado
        let distances = {};
        Object.keys(markers).forEach(markerKey => {
          const marker = markers[markerKey];
          const distance = calculateDistance(
            location.coords.latitude,
            location.coords.longitude,
            marker.latitude,
            marker.longitude
          );
          distances[markerKey] = distance.toFixed(2); // Redondear la distancia a dos decimales
        });
        setRepartidorDistances(distances);
      } else {
        console.error('Error al obtener la ubicación actual.');
      }
    } catch (error) {
      console.error('Error en la obtención de la ubicación:', error);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Barra de navegación personalizada */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30, backgroundColor: '#79D8BA' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Repartidores</Text>

        <TouchableOpacity onPress={toggleLogoutModal}>
          <Image source={userPhoto} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </TouchableOpacity>
      </View>

      {/* Mapa */}
      <View style={{ flex: 1, marginBottom: 40 }}>
        <MapView style={{ flex: 1 }} region={mapRegion}>
          {/* Marcadores */}
          {Object.keys(markers).map(markerKey => {
            const marker = markers[markerKey];
            return (
              <Marker
                key={markerKey}
                coordinate={marker}
                title={marker.title}
                description={marker.description}
                image={marker.image}
              />
            );
          })}
        </MapView>
      </View>

      {/* Modal de cierre de sesión */}
      {isLogoutModalVisible && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
            <Text>¿Desea cerrar sesión?</Text>
            <Button title="Cerrar sesión" onPress={handleLogout} />
            <Button title="Cancelar" onPress={toggleLogoutModal} />
          </View>
        </View>
      )}

      {/* Título de la sección de distancias */}
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Distancia</Text>


      {/* Mostrar distancias en kilómetros */}
      {Object.keys(repartidorDistances).map(key => (
        <Text key={key} style={{ textAlign: 'center', marginVertical: 5}}>
          {`${markers[key].title}: ${repartidorDistances[key]} km`}
        </Text>
      ))}

      {/* Botón para obtener ubicación actual */}
      <Button title="Ubicación Actual" onPress={userLocation} />
    </View>
  );
};

MapScreen.navigationOptions = {
  headerShown: false,
};

export default MapScreen;
