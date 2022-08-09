import React from 'react';
import qs from 'qs';

import Event from '@/utils/event';
import { push, replace } from '@/utils/next-router';

export default function useNextRouterHook() {
  const [router, setRouter] = React.useState<{
    query: { [key: string]: string };
    push: typeof push;
    replace: typeof replace;
  }>({
    query: {},
    push,
    replace,
  });

  const listen = React.useCallback(
    (data = {}) => {
      setRouter({ ...router, ...data });
    },
    [null],
  );

  React.useEffect(() => {
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    setRouter({ ...router, query: query as { [key: string]: string } });
    Event.on('router-change', listen);

    return () => {
      Event.off('router-change', listen);
    };
  }, [null]);

  return router;
}
