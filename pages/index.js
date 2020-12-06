import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter();

  useEffect(() => {

    router.push('/batch/view')

  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
