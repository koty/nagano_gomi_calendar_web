'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Select, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from "react"

interface Item {
  date: string
  kind: string
  not_available?: boolean
}

export default function Home() {
  const [selectedAreaNo, setSelectedAreaNo] = useState<string>("1")
  useEffect(() => {
    const defaultAreaNo = localStorage.getItem('defaultAreaNo') ?? "1"
    setSelectedAreaNo(defaultAreaNo)
  }, [])

  // Queries
  const calendarResult = useQuery<{[key: string]: Array<Item>}>({
    initialData: {},
    queryKey: ["gomi_calendar"],
    queryFn: () => axios.get("https://b-sw.co/nagano_gomi_calendar/gomi_calendar.json").then(res => res.data)
  })
  const areaResult = useQuery<{[key: string]: string}>({
    initialData: {},
    queryKey: ["area"],
    queryFn: () => axios.get("https://b-sw.co/nagano_gomi_calendar/calendar_no_list.json").then(res => res.data)
  })
  const calendar = calendarResult.data[selectedAreaNo] ? calendarResult.data[selectedAreaNo].sort((a: Item, b: Item) => {
    if (a.date == b.date) {
      return 0;
    } else if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  }) : []
  const today = Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'}).format(new Date()).replaceAll('/', '-')
  
  const calendarGroupByDate = Object.groupBy(calendar.filter(c => c.date >= today), x => x.date)
  const onSelectedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAreaNo(e.target.value)
    localStorage.setItem("defaultAreaNo", e.target.value)
  }
  const formatDate = (s: string) => {
    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    const d = new Date(s)
    const formatedDate = Intl.DateTimeFormat('ja-JP', {
      month: '2-digit',
      day: '2-digit'
    }).format(d)
    return `${formatedDate}(${weeks[d.getDay()]})`
  }
  const tag = (kind: string) => {
    let colorScheme = 'gray'
    if (kind.includes('可燃')) {
      colorScheme = 'green'
    } else if (kind.includes('プラ')) {
      colorScheme = 'yellow'
    } else if (kind.includes('不燃')) {
      colorScheme = 'red'
    }
    return (<Tag size='md' variant='outline' colorScheme={colorScheme} sx={{'marginRight': '1em'}}>{kind}</Tag>)
  }
  return (
    <main>
      <Select onChange={onSelectedChange} value={selectedAreaNo} placeholder='タップして地区を選択してください'>
        {Object.keys(areaResult.data).map((key) => {
          return (<option value={key} key={key}>{areaResult.data[key]}</option>)
        })}
      </Select>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>種類</Th>
            </Tr>
          </Thead>
          <Tbody>
            
            {Object.keys(calendarGroupByDate).map((d) => {
              return (<Tr key={d}>
                <Td>
                  {calendarGroupByDate[d]?.some(c => c.not_available) ? `❌ ${formatDate(d)}` : formatDate(d)}
                </Td>
                <Td>
                  {calendarGroupByDate[d]?.map(c => tag(c.kind))}
                </Td>
                </Tr>
              )
            })}
            
          </Tbody>
        </Table>
      </TableContainer>
    </main>
  );
}
