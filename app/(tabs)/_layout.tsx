import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name'];
  color: string;
}) {
  return <FontAwesome6 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="at" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="productListScreen"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <TabBarIcon name="bag-shopping" color={color} />,
          headerStyle: { backgroundColor: Colors.dark.secondary },
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="(crudStack)"
        options={{
          title: 'CRUD',
          tabBarIcon: ({ color }) => <TabBarIcon name="gears" color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
