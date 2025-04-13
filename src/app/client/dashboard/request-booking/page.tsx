'use client';

import React, { useEffect, useState } from 'react';
import AppointmentsTable from '../../components/appointments-table';
import ClientDefaultLayout from '../../components/default-layout';
import withAuthClient from '@/middleware/withAuthClient';

const Page = () => {
  const [openBookingForm, setOpenBookingForm] = useState(false);

  useEffect(() => {
    // Automatski otvara formu odmah pri učitavanju
    setOpenBookingForm(true);
  }, []);

  return (
    <ClientDefaultLayout>
      <AppointmentsTable dashboard={false} forceOpenForm={openBookingForm} />
    </ClientDefaultLayout>
  );
};

export default withAuthClient(Page);
