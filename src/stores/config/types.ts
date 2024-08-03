import type { AppConfig } from "@/db/schema"

export type ConfigStore = {
  config: AppConfig[]
  getConfig: () => Promise<void>
  resetConfig: () => Promise<void>
  setConfigEntry: (key: string, value: string) => Promise<void>
  setNetworkConfig: () => Promise<void>
}

export type ConfigStoreSet = (
  partial:
    | ConfigStore
    | Partial<ConfigStore>
    | ((state: ConfigStore) => ConfigStore | Partial<ConfigStore>),
  replace?: boolean | undefined
) => void
