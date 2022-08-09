import React from 'react';
import Page from '@/components/page';
import { SITE_NAME, META_DESCRIPTION, SITE_URL } from '@/common/const';
import CreateQuest from '@/components/quest/create-quest';
import Header from '@/components/common/header';
import Footer from '@/components/footer';

function Create() {
  const meta = {
    title: `Quest - ${SITE_NAME}`,
    description: META_DESCRIPTION,
    url: `${process.env.NEXT_PUBLIC_HOST}/quest` || SITE_URL,
  };
  return (
    <Page meta={meta}>
      <Header></Header>
      <div className="px-32 pt-4">
        <CreateQuest />
      </div>
      <Footer />

    </Page>
  );
}

export default Create;
