import { Card, ScrollView, Text, View, XStack, styled } from "tamagui"

import useConfigStore from "@/stores/config/root"

const StyledView = styled(View, {
  paddingHorizontal: 10,
})

const StyledScrollView = styled(ScrollView, {
  paddingTop: 20,
})

const StyledConfigItem = styled(View, {
  display: "flex",
  gap: 5,
  paddingBottom: 15,
  paddingHorizontal: 20,
})

const StyledText = styled(Text, {
  fontSize: 20,
  fontWeight: "bold",
})

const DBView = () => {
  const configStore = useConfigStore((store) => store.config)

  return (
    <StyledView>
      <StyledScrollView height="100%" width="100%">
        <XStack $sm={{ flexDirection: "column" }} gap={10}>
          {configStore ? (
            configStore.map((config) => (
              <Card
                key={config.id + new Date().getTime()}
                animation="bouncy"
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
              >
                <Card.Header>
                  <Text>{config.key}</Text>
                </Card.Header>
                <Card.Background />
                <StyledConfigItem>
                  <Text>{config.value}</Text>
                </StyledConfigItem>
              </Card>
            ))
          ) : (
            <StyledText>No Config Found</StyledText>
          )}
        </XStack>
      </StyledScrollView>
    </StyledView>
  )
}

export default DBView
