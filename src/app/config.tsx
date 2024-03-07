import { useEffect, useState } from "react"
import { Card, ScrollView, Text, View, XStack, styled } from "tamagui"

import { db } from "@/db/client"
import { type AppConfig, appConfigTable } from "@/db/schema"

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

const DBView = () => {
  const [database, setDatabase] = useState<AppConfig[]>()

  const fetchConfig = async () => {
    const config = await db.select().from(appConfigTable).execute()
    setDatabase(config)
  }

  useEffect(() => {
    void fetchConfig()
  }, [])

  return (
    <StyledView>
      <StyledScrollView height="100%" width="100%">
        <XStack $sm={{ flexDirection: "column" }} gap={10}>
          {database?.map((config) => (
            <Card
              key={config.id}
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
          ))}
        </XStack>
      </StyledScrollView>
    </StyledView>
  )
}

export default DBView
