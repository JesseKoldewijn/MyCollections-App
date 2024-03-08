import netInfo from "@react-native-community/netinfo"
import { useEffect } from "react"

import useConfigStore from "@/stores/config/root"

type ConfigProviderProps = {
  children: React.ReactNode
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const setNetState = useConfigStore((store) => store.setNetworkConfig)
  const setConfigStore = useConfigStore((store) => store.getConfig)

  const setNetworkConfig = async () => {
    await setNetState().then(async () => {
      await setConfigStore()
    })
  }

  useEffect(() => {
    void setNetworkConfig()

    netInfo.addEventListener(() => {
      void setNetworkConfig()
    })
  }, [])

  return children
}
