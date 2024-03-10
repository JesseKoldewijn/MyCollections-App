import { ScrollView, XStack, styled, Text } from "tamagui"

import { type ConfigStore } from "@/stores/config/types"

import ConfigListerItem from "./list-item"

type ConfigListerProps = {
  configStore: ConfigStore["config"]
}

const ConfigLister = ({ configStore }: ConfigListerProps) => {
  if (!configStore) return <StyledText>No Config Found</StyledText>

  return (
    <StyledScrollView height="100%" width="100%">
      <XStack $sm={{ flexDirection: "column" }} gap={10}>
        {configStore.map((config) => (
          <ConfigListerItem key={config.id} config={config} />
        ))}
      </XStack>
    </StyledScrollView>
  )
}

export default ConfigLister

const StyledScrollView = styled(ScrollView, {
  paddingTop: 20,
})

const StyledText = styled(Text, {
  fontSize: 20,
  fontWeight: "bold",
})
