import { Card, Text, View, styled } from "tamagui"

const StyledTopView = styled(View, {
  paddingTop: 20,
  paddingHorizontal: 20,
})

const Home = () => {
  return (
    <StyledTopView>
      <Card>
        <Card.Header>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            RN Core
          </Text>
        </Card.Header>
        <View
          style={{
            display: "flex",
            gap: 5,
            paddingBottom: 15,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Welcome to the App!
          </Text>
        </View>
        <Card.Background />
      </Card>
    </StyledTopView>
  )
}

export default Home
