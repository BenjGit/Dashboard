import Header from '../Header'
import VleftMenu from '../VleftMenu'
import { Outlet } from 'react-router-dom'

export function Layout() {
    return (
      <>
        <Header />
        <VleftMenu />
        <main>
          <Outlet />
        </main>
      </>
    )
  }