import { View, styled } from "tamagui"

import ConfigLister from "@/components/listers/config/list"
import useConfigStore from "@/stores/config/root"

const StyledView = styled(View, {
  paddingHorizontal: 10,
})

const DBView = () => {
  const configStore = useConfigStore((store) => store.config)

  return (
    <StyledView>
      <ConfigLister configStore={configStore} />
    </StyledView>
  )
}

export default DBView
