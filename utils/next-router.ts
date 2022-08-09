import qs from 'qs';
import Event from '@/utils/event';

function getSearch(str: string) {
  const [other, search] = str.split('?');
  return search;
}

function publish() {
  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  Event.emit('router-change', { query });
}

function seralizeState(
  url:
    | string
    | {
        pathname: string;
        query?: { [key: string]: string };
      },
  as?:
    | string
    | {
        pathname: string;
        query?: { [key: string]: string };
      },
) {
  const { as: oldAs, url: oldUrl } = window.history.state;
  let newAs = oldAs;
  let newUrl = oldUrl;

  if (typeof url === 'string') {
    newUrl = url;
  } else {
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    newUrl = url.pathname;
    if (url.query) {
      newUrl += `${qs.stringify({ ...query, ...url.query }, { addQueryPrefix: true })}`;
    }
  }

  if (as !== undefined) {
    if (typeof as === 'string') {
      newAs = as;
    } else {
      newAs = as.pathname;
      const query = qs.parse(getSearch(oldAs), { ignoreQueryPrefix: true });
      if (as.query) {
        newAs += `${qs.stringify({ ...query, ...as.query }, { addQueryPrefix: true })}`;
      }
    }
  } else {
    newAs = newUrl;
  }

  return { as: newAs, url: newUrl };
}

export function push(
  url:
    | string
    | {
        pathname: string;
        query?: { [key: string]: string };
      },
  as?:
    | string
    | {
        pathname: string;
        query?: { [key: string]: string };
      },
) {
  const { as: newAs, url: newUrl } = seralizeState(url, as);

  window.history.pushState({ ...window.history.state, as: newAs, url: newUrl }, '', newAs);
  publish();
}

export function replace(
  url:
    | string
    | {
        pathname: string;
        query?: { [key: string]: string };
      },
  as?:
    | string
    | {
        pathname: string;
        query?: { [key: string]: string };
      },
) {
  const { as: newAs, url: newUrl } = seralizeState(url, as);

  window.history.replaceState({ ...window.history.state, as: newAs, url: newUrl }, '', newAs);

  publish();
}
