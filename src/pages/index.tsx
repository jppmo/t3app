import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from '../components/LoginForm'
import { useUserContext } from '../context/user.context'
import styles from '../styles/Home.module.css'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {

  // change this page to be the home page 
  // add link to navbar to create post if user is not null


  return (
    <div className='text-center'>
      Page Index
    </div>
  )
}

export default Home
