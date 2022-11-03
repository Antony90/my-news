import { AppShell } from '@mantine/core'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import NavBar from '../NavBar'

const RootDashboard = () => {
  return (
    <AppShell padding="md" navbar={<NavBar />} header={<Header />}>
      <Outlet />
    </AppShell>
  )
}

export default RootDashboard