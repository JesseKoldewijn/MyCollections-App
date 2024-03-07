import { Card, Text, View, styled } from "tamagui"

const StyledTopView = styled(View, {
  paddingTop: 20,
  paddingHorizontal: 10,
})

const StyledCardContent = styled(View, {
  display: "flex",
  gap: 5,
  paddingBottom: 15,
  paddingHorizontal: 10,
})

const StyledTitle = styled(Text, {
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
})

const StyledSubTitle = styled(Text, {
  textAlign: "center",
})

const Home = () => {
  return (
    <StyledTopView>
      <Card>
        <Card.Header>
          <StyledTitle>RN Core</StyledTitle>
        </Card.Header>
        <StyledCardContent>
          <StyledSubTitle>Welcome to the App!</StyledSubTitle>
        </StyledCardContent>
        <Card.Background />
      </Card>
    </StyledTopView>
  )
}

export default Home
