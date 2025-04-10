'use client'
import React from 'react'
import ClientDefaultLayout from '../components/default-layout'
import withAuthClient from '@/middleware/withAuthClient'
import AppointmentsTable from '../components/appointments-table'
import AccountDashboard from '../components/account-dashboard'

const Page = () => {
  return (
    <ClientDefaultLayout noPadding >
      <AccountDashboard />
      <AppointmentsTable dashboard />
    </ClientDefaultLayout>
  )
}

export default withAuthClient(Page)