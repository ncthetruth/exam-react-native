import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function FirstStackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
    screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
    }}>
        <Stack.Screen 
            name="crudMenuScreen"
            options={{
                headerShown: false,
            }} 
        />
        <Stack.Screen 
            name="createScreen"
            options={{
                headerShown: true,
                title: 'Create',
                headerStyle: { backgroundColor: '#fff'},
                headerTitleAlign: 'center',
                headerTitleStyle: { color: '#000' },
                headerTintColor: '#000'
            }} 
        />
        <Stack.Screen 
            name="updateScreen"
            options={{
                headerShown: true,
                title: 'Update',
                headerStyle: { backgroundColor: '#fff'},
                headerTitleAlign: 'center',
                headerTitleStyle: { color: '#000' },
                headerTintColor: '#000'
            }} 
        />
        <Stack.Screen 
            name="deleteScreen"
            options={{
                headerShown: true,
                title: 'Delete',
                headerStyle: { backgroundColor: '#fff'},
                headerTitleAlign: 'center',
                headerTitleStyle: { color: '#000' },
                headerTintColor: '#000'
            }} 
        />
    </Stack>
  );
}
