'use client';
import { icons } from '@/app/components/assets';
import React, { FC } from 'react';
import styles from './urlCard.module.css';
import { Tooltip } from 'react-tooltip';
import { timeAgo } from '@/app/components/utils';
import { IurlDetail } from '@/app/types';
import { BASE_PATH } from '@/app/urlPath';

const { created, short, long, icons_ } = styles;

const { ExternalLinkIcon, ClipboardCopyIcon, ShearIcon } = icons;
type Props = {
  urlDetail: Partial<IurlDetail>;
};

const URLCard: FC<Props> = ({ urlDetail }) => {
  const { shortUrl, longUrl, createdAt, visits, shortUrlId } = urlDetail;

  return (
    <div>
      <h3 className={short}>{shortUrl}</h3>
      <p className={long}>
        <span> {longUrl}</span>
      </p>
      <div className={created}>
        <p data-testid="clicks">
          <span> {visits} </span> <span> visits</span>
        </p>
        |
        <p data-testid="created">
          <span> Created: </span>
          <span> {timeAgo(new Date(createdAt as Date).getTime())}</span>
        </p>
      </div>
      <div className={icons_}>
        <form action={`${BASE_PATH}/${shortUrlId}`}>
          <button
            data-tooltip-content="Visit URL"
            data-testid="tolongUrl"
            data-tooltip-id="my-tooltip"
          >
            <Tooltip id="my-tooltip" place="bottom" />

            <ExternalLinkIcon size={'1rem'} />
          </button>
        </form>

        <div role="button">
          <Tooltip id="copy" place="bottom" content="Copy to clickboard" />
          <ClipboardCopyIcon data-tooltip-id="copy" />
        </div>
        <div role="button">
          <ShearIcon />
        </div>
      </div>
    </div>
  );
};

export default URLCard;
