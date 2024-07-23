import { Tabs } from "expo-router";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Listen",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="music"
              size={30}
              color={color}
              style={{ paddingTop: 5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logo"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="pencil"
              size={30}
              color={color}
              style={{ paddingTop: 5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
