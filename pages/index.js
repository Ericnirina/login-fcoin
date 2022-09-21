import styles from '../styles/Home.module.css'
import Login from'./login'
import {useSession} from "next-auth/react"


export default function Home() {
  return (
    <div className={styles.container}>
      <Login/>
    </div>
  )
}

