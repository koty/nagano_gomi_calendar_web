'use client'
import { Button, Checkbox, Flex, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
// import { registerServiceWorker } from '../serviceWorkerRegistration'

export default function Preference() {
  const router = useRouter()
  const [notify, setNotify] = useState<boolean>(false)
  const [notifyTime, setNotifyTime] = useState<string>('06:00')
  const onCheckChanged = (e: any) => {
    console.log(e.target.checked)
    setNotify(e.target.checked)
  }
  const onBackClicked = () => {
    router.replace('/')
  }
  return (<>
    <Flex>
      <FormControl flex='1'>
        <Checkbox isChecked={notify} onChange={onCheckChanged}>通知する（実装中でまだ動きません）</Checkbox>
        <FormLabel>通知時刻</FormLabel>
        <Input type='time' disabled={!notify} value={notifyTime} />
        <FormHelperText>指定した時刻に通知します。</FormHelperText>
      </FormControl>
      <Button onClick={onBackClicked}>戻る</Button>
    </Flex>
  </>)
}
