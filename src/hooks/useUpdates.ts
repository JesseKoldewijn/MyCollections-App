import Constants, { AppOwnership } from "expo-constants"
import * as Updates from "expo-updates"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

const isRunningInExpoGo = Constants.appOwnership === AppOwnership.Expo

export const useUpdates = () => {
  const [updates, setHasUpdates] = useState(false)

  async function onFetchUpdateAsync() {
    if (isRunningInExpoGo) {
      return {
        success: true,
      }
    }
    try {
      let update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
        update = await Updates.checkForUpdateAsync()
      }

      return {
        success: true,
        update,
      }
    } catch (error) {
      const err = error as Error
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      return {
        success: false,
        err: `Error fetching latest Expo update: ${err.message}`,
      }
    }
  }

  useEffect(() => {
    async function checkForUpdates() {
      const update = await onFetchUpdateAsync()

      if (update.err) {
        Alert.alert("Error", update.err)
        return
      }

      if (update.update && update.success) {
        setHasUpdates(update.update.isAvailable)
      }
    }
    void checkForUpdates()
  }, [])

  return updates
}
