import React from 'react';
import Page from '../components/page';
import { SITE_NAME, META_DESCRIPTION } from '../common/const';

export default function Index() {
  const meta = {
    title: `Home - ${SITE_NAME}`,
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <div className="h-96 text-gray-600">Home</div>
    </Page>
  );
}
