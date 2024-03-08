import { eq } from "drizzle-orm"
import * as network from "expo-network"

import { db } from "@/db/client"
import { appConfigTable } from "@/db/schema"

import { type ConfigStoreSet } from "./types"

/**
 * Get the config - used to sync all config entries between store and db.
 * @param set - typeof ConfigStoreSet
 */
export const getConfig = async (set: ConfigStoreSet) => {
  const config = await db.select().from(appConfigTable).execute()
  set({ config })
}

/**
 * Reset the config - used to remove all config entries.
 * The input is stored both in the database and the store.
 * ---
 * @param set - typeof ConfigStoreSet
 */
export const resetConfig = async (set: ConfigStoreSet) => {
  set({
    config: [],
  })
  await db.delete(appConfigTable).execute()
}

/**
 * Set a config entry - used to add or update a config entries.
 * The input is stored both in the database and the store.
 * ---
 * @param set - typeof ConfigStoreSet
 * @param key - string
 * @param value - string
 */
export const setConfigEntry = async (set: ConfigStoreSet, key: string, value: string) => {
  const keyExist = await db
    .selectDistinct()
    .from(appConfigTable)
    .where(eq(appConfigTable.key, key))
    .execute()

  if (keyExist.length === 0) {
    await db
      .insert(appConfigTable)
      .values({ key, value, createdAt: new Date().toUTCString() })
      .execute()
  } else {
    await db
      .update(appConfigTable)
      .set({ value, lastUpdatedAt: new Date().toUTCString() })
      .where(eq(appConfigTable.key, key))
      .execute()
  }

  const config = await db.select().from(appConfigTable).execute()
  set({ config })
}

export const setNetworkConfig = async (set: ConfigStoreSet) => {
  const netIp = await network.getIpAddressAsync()

  await setConfigEntry(set, "networkIP", netIp)
}
