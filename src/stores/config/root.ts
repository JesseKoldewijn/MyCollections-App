import { create } from "zustand"

import { getConfig, resetConfig, setConfigEntry, setNetworkConfig } from "./handlers"
import { type ConfigStore } from "./types"

const useConfigStore = create<ConfigStore>((set) => ({
  config: [],
  resetConfig: () => resetConfig(set),
  getConfig: () => getConfig(set),
  setConfigEntry: (key: string, value: string) => setConfigEntry(set, key, value),
  setNetworkConfig: () => setNetworkConfig(set),
}))

export default useConfigStore
