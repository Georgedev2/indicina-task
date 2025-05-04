import { IurlDetail} from '../types';
import { encodeBase62 } from './serverUtils';


type TStore = {
  count: number;
  urlList: IurlDetail[];
  createUrl: (arg: { longUrl: string; origin: string }) => IurlDetail;
  getOriginalUrlGivenLongUrl: (arg: { shortUrlId: string }) => IurlDetail |undefined
  getAllURL: (query: string) => IurlDetail[];
};

export const urlStore: TStore = {
  count: 200,
  urlList: [
    {
      id: 1,
      shortUrlId: '3ad32p9',
      longUrl: 'https://example.com/very-long-url',
      shortURL: 'https://example.com/3ad32p9',
      created: Date.now() - 11 * 60 * 1000,
      clicks: 1023,
    },
    {
      id: 2,
      shortUrlId: '3ad32p9',
      shortURL: 'https://example.com/3ad32p9',
      longUrl:
        'https://moviebox.ng/movies/merlin-sMxCiIO6fZ9?id=8382755684005333552&scene=&page_from=search_detail&type=/movie/detail&utm_source=h5seo_www.google.com',
      created: Date.now() - 30 * 60 * 1000,
      clicks: 1026,
    },
    {
      id: 3,
      shortUrlId: '3ad32p9',
      shortURL: 'https://example.com/3ad32p9',
      longUrl: 'https://example.com/very-long-url',
      created: Date.now() - 45 * 60 * 1000,
      clicks: 1026,
    },
    {
      id: 4,
      shortUrlId: '3ad32p9',
      shortURL: 'https://example.com/3ad32p9',
      longUrl: 'https://example.com/very-long-url',
      created: 1746222651510,
      clicks: 1026,
    },
  ] ,
  getAllURL(query: string = '') {
    if (!query.trim()) {
      return this.urlList;
    }
    return this.urlList.filter((item) =>
      item?.longUrl?.toLowerCase().includes(query.toLowerCase())
    );
  },
  createUrl(arg: { longUrl: string; origin: string }) {
    this.count = this.count + 1;
    const coded = encodeBase62(this.count);
    const { longUrl, origin } = arg;
    const newURL = {
      id: this.count,
      shortUrlId: coded,
      shortURL: `${origin}/${coded}`,
      longUrl,
      created: Date.now(),
      clicks: 0,
    };
    this.urlList = [...this.urlList, newURL];
    // console.log('bbb',this.urlList)
    return newURL;
  },
  getOriginalUrlGivenLongUrl(arg: { shortUrlId: string }) {
    return this.urlList.find(
      (el) => el.shortUrlId == arg?.shortUrlId?.replaceAll('/', '')
    );
  },
};



