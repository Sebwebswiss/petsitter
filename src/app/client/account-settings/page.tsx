'use client'
import React from 'react'
import ClientDefaultLayout from '../components/default-layout'
import withAuthClient from '@/middleware/withAuthClient'
import EditClientPage from "../components/edit-client"
import { useGetClientQuery, useGetUserQuery } from '@/features/clientApi'

const Page = () => {
  const {data, isLoading} = useGetClientQuery("");
  return (
    <ClientDefaultLayout>
        <EditClientPage clientId={data?._id} />
    </ClientDefaultLayout>
  )
}

export default withAuthClient(Page)