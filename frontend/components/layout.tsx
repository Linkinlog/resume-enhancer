import { ReactNode } from 'react'
import Navbar from './navbar'
import SEOHead from './head'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <SEOHead />
      <Navbar />
      <main>{children}</main>
    </>
  )
}
