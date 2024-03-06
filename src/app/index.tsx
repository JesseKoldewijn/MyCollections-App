import { Card, Text, View } from "tamagui"

const Home = () => {
  return (
    <View
      style={{
        paddingTop: 20,
        paddingHorizontal: 20,
      }}
    >
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
    </View>
  )
}

export default Home
