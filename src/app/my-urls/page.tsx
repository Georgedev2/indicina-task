import SearchInput from '../components/ui/SearchInput';
import styles from './url-listing.module.css';
import URLCard from './URLCard/URLCard';
import { APP_NAME, SEARCH_KEY } from '../globalConstant';
import { DOMAIN, MY_URL_LIST_PATH } from '../urlPath';
import { appLicationError } from '../components/errorAndCause';
import { IurlDetail, ServerError } from '../types';
import { FC } from 'react';

const { wrapper, title, list, emptyState } = styles;

const getAllAvailableURls = async (query: string = '') => {
  try {
    const res = await fetch(
      `${DOMAIN}/${MY_URL_LIST_PATH}?${SEARCH_KEY}=${query}`
    );
    const map = new Map();
    [200, 400, 500, 404].map((el) => map.set(el, el));

    if (map.get(res.status)) {
      const resBody = await res.json();
      return {
        ...resBody,
        status: res.status,
      };
    }
  } catch (error) {
    const { code, message } = appLicationError.CLIENT_SIDE_ERROR;
    return {
      cause: (error as ServerError)?.stack,
      status: code,
      message,
    };
  }
};

type Props = {
  searchParams: Promise<{
    search: string;
  }>;
};
const page: FC<Props> = async (props) => {
  const query = await props.searchParams;
  const { data } = await getAllAvailableURls(query.search);

  const hasURLHistory = data && data.length > 0;
  return (
    <div className="page-width">
      <div className={wrapper}>
        <h3 className={title}>Your recent {APP_NAME}</h3>
        <SearchInput placeholder="Search for long URLs by entering at least three characters." />
        <div className={list}>
          {hasURLHistory ? (
            data.map((item: IurlDetail) => (
              <URLCard key={item.id} urlDetail={item} />
            ))
          ) : (
            <div className={emptyState}>No recent URLs in your history</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

// {
//   id: 1,
//   shortUrlId: '3ad32p9',
//   longUrl: 'https://example.com/very-long-url',
//   shortURL: 'https://example.com/3ad32p9',
//   created: Date.now() - 11 * 60 * 1000,
//   clicks: 1023,
// }