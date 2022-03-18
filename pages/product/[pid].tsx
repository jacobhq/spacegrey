import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/layout'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/getProduct/${pid}`, fetcher)
  console.log(data, pid)

  return <Layout>
    <p>Pid: {pid}, data: {data && data.name}</p>
  </Layout>
}

export default Post