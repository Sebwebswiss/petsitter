'use client';
import React from 'react';
import ClientDefaultLayout from '../../components/default-layout';
import withAuthClient from '@/middleware/withAuthClient';
import AppointmentsTable from '../../components/appointments-table';

const Page = () => {
  return (
    <ClientDefaultLayout>
      {/* Prikazuje formu odmah bez klika na dugme */}
      <AppointmentsTable dashboard={false} />
    </ClientDefaultLayout>
  );
};

export default withAuthClient(Page);
