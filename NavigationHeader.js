import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavigationHeader = ({ photo, onLogout }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Realiza cualquier lógica de cierre de sesión aquí
    // Por ejemplo, redirige a la pantalla de inicio de sesión
    onLogout();
    navigation.navigate('Login');
  };

  return (
    <HeaderButtons>
      <Item
        title="Profile"
        iconName="ios-person"
        onPress={() => {} /* Puedes agregar lógica adicional aquí */}
      />
      <Item
        title="Logout"
        iconName="ios-log-out"
        onPress={handleLogout}
      />
    </HeaderButtons>
  );
};

export default NavigationHeader;
