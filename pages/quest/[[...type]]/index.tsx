import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/common/header';
import QuestTab, { QuestTypes } from '@/components/quest/quest-tab';
import { SITE_NAME, META_DESCRIPTION, SITE_URL } from '@/common/const';
import Footer from '@/components/footer';
import Page from '../../../components/page';

function Quest({ quest }: { quest: any }) {
  const router = useRouter();
  const { type = [QuestTypes.All] } = router.query;
console.log('router.query', router.query)
  const questData = {
    ...quest,
    activityInfo: JSON.parse(quest?.activityInfo || '{}'),
  };

  const meta = {
    title: `Quest - ${SITE_NAME}`,
    description: questData?.activityInfo.desc || META_DESCRIPTION,
    url: `${process.env.NEXT_PUBLIC_HOST}/quest/${questData?.slug}` || SITE_URL,
  };

  return (
    <Page meta={meta}>
      <Header></Header>
      <div
        style={{ maxWidth: '1440px' }}
        className="relative mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="py-10">
          <QuestTab type={type[0] as QuestTypes} />
        </div>
      </div>
      <Footer />
    </Page>
  );
}

export default Quest;
