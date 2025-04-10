'use client'
import React from 'react'
import ClientDefaultLayout from '../../components/default-layout'
import withAuthClient from '@/middleware/withAuthClient'
import PetsTable from '../../components/pets-table'

const Page = () => {
  return (
    <ClientDefaultLayout>
        <PetsTable dashboard={false}/>
    </ClientDefaultLayout>
  )
}

export default withAuthClient(Page)