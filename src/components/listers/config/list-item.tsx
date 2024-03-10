import * as network from "expo-network"
import { useState } from "react"
import { Alert } from "react-native"
import { Card, View, styled, Text, Button } from "tamagui"

import { appTheme } from "@/config/constants"
import useConfigStore from "@/stores/config/root"
import { type ConfigStore } from "@/stores/config/types"

type ConfigListerItemProps = {
  config: ConfigStore["config"][number]
}

const ConfigListerItem = ({ config }: ConfigListerItemProps) => {
  const [buttonGroupShow, setButtonGroupShow] = useState(false)

  const updateConfigStoreValue = useConfigStore((store) => store.setConfigEntry)

  const handleConfigUpdate = async () => {
    try {
      const configKey = config.key
      const configNewValue = await network.getIpAddressAsync()
      await updateConfigStoreValue(configKey, configNewValue)
      Alert.alert("Success", "Config value updated")
    } catch (error) {
      Alert.alert("Error", "Failed to update config value")
    }
  }

  return (
    <StyledCard
      key={config.id + new Date().getTime()}
      animation="bouncy"
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      onLongPress={() => {
        setButtonGroupShow((prev) => !prev)
      }}
    >
      <CardContent config={config} />
      <CardButtonActions show={buttonGroupShow} refreshClickHandler={handleConfigUpdate} />
    </StyledCard>
  )
}

export default ConfigListerItem

const CardContent = ({ config }: ConfigListerItemProps) => {
  return (
    <StyledConfigItemInner>
      <Card.Header>
        <Text>{config.key}</Text>
      </Card.Header>
      <Card.Background />
      <StyledConfigItem>
        <Text>{config.value}</Text>
      </StyledConfigItem>
    </StyledConfigItemInner>
  )
}

const CardButtonActions = ({
  show,
  refreshClickHandler,
}: {
  show?: boolean
  refreshClickHandler?: () => void | Promise<void>
}) => {
  if (!show) return <></>

  return (
    <StyledConfigItemActionGroup>
      <StyledConfigItemRefreshBtn onPress={() => refreshClickHandler && refreshClickHandler()}>
        Refresh
      </StyledConfigItemRefreshBtn>
    </StyledConfigItemActionGroup>
  )
}

const StyledCard = styled(Card, {
  display: "flex",
  flexDirection: "row",
})

const StyledConfigItemInner = styled(View, {
  flex: 1,
  display: "flex",
  justifyContent: "flex-start",
})

const StyledConfigItem = styled(View, {
  display: "flex",
  gap: 5,
  paddingBottom: 15,
  paddingHorizontal: 20,
})

const StyledConfigItemActionGroup = styled(View, {
  flex: 1,
  display: "flex",
  gap: 5,
  paddingRight: 20,
  alignItems: "flex-end",
  justifyContent: "center",
})

const StyledConfigItemRefreshBtn = styled(Button, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: appTheme.colors.brand,
  borderRadius: 20,
})
