'use client';
import { icons } from '@/app/components/assets';
import React, { FC } from 'react';
import styles from './urlCard.module.css';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import { timeAgo } from '@/app/components/utils';
import { IurlDetail } from '@/app/types';

const { createdAt, short, long, icons_ } = styles;

const { ExternalLinkIcon, ClipboardCopyIcon, ShearIcon } = icons;
type Props = {
  urlDetail: Partial<IurlDetail>;
};
const URLCard: FC<Props> = ({ urlDetail }) => {
  const { shortURL, longUrl, created, clicks } = urlDetail;

  return (
    <div>
      <h3 className={short}>{shortURL}</h3>
      <p className={long}>
        <span> {longUrl}</span>
      </p>
      <div className={createdAt}>
        <p data-testid="clicks">{clicks} visits</p> |{' '}
        <p data-testid="created">Created: {timeAgo(created as number)}</p>
      </div>
      <div className={icons_}>
        <Link
          target="blank"
          data-tooltip-content="Visit URL"
          href={longUrl as string}
          data-testid="tolongUrl"
          data-tooltip-id="my-tooltip"
        >
          <Tooltip id="my-tooltip" place="bottom" content="Hello world!" />

          <ExternalLinkIcon size={'1rem'} />
        </Link>
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
