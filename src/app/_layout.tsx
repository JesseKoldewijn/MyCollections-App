/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { SplashScreen, Tabs } from "expo-router"
import { useCallback } from "react"
import { useColorScheme } from "react-native"
import { View as RnView, Text as RnText } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TamaguiProvider } from "tamagui"

import useSqliteDb from "@/hooks/useSqliteDb"
import { ConfigProvider } from "@/providers/ConfigProvider"

import "../../tamagui-web.css"
import { tamaguiConfig } from "../../tamagui.config"

const Layout = () => {
  // Load tamagui fonts
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  // Set color scheme based on the device's theme
  const colorScheme = useColorScheme() == "light" ? "light" : "dark"
  const colorTheme = colorScheme === "light" ? DefaultTheme : DarkTheme
  // Safe inset which takes in account the native status bar's height
  const insets = useSafeAreaInsets()

  // Custom hook which loads the SQLite database and runs migrations
  const { isLoaded: hasRunMigrations, error: runningMigrationError } = useSqliteDb()

  // Hide the splash screen when the assets are loaded
  const onLayoutRootView = useCallback(() => {
    if (loaded) {
      void SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return (
      <RnView
        style={{
          top: insets.top,
          bottom: insets.bottom,
          left: insets.left,
          right: insets.right,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RnText>Failed to load resources</RnText>
      </RnView>
    )
  }

  if (!hasRunMigrations || !!runningMigrationError) {
    return (
      <RnView
        style={{
          top: insets.top,
          bottom: insets.bottom,
          left: insets.left,
          right: insets.right,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RnText>...loading</RnText>
      </RnView>
    )
  }

  // Main app view
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <ThemeProvider value={colorTheme}>
        <ConfigProvider>
          <Tabs
            safeAreaInsets={{
              bottom: insets.bottom,
              left: insets.left,
              right: insets.right,
            }}
            backBehavior="history"
            screenOptions={{
              tabBarActiveTintColor: "red",
              tabBarInactiveTintColor: colorTheme.colors.text,
            }}
          >
            <Tabs.Screen
              // Name of the route to hide.
              name="index"
              options={{
                title: "Home",
                // This tab will no longer show up in the tab bar.
                href: "/",
                headerShown: false,
              }}
            />
            <Tabs.Screen
              // Name of the route to hide.
              name="config"
              options={{
                title: "Config",
                // This tab will no longer show up in the tab bar.
                href: "/config",
                headerShown: false,
              }}
            />
          </Tabs>
        </ConfigProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}

export default Layout
