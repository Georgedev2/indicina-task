/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { ENCODE_PATH, MY_URLS_PAGE } from './urlPath';
import { ServerError } from './types';
import { appLicationError } from './components/errorAndCause';
const {
  formBox,
  submit,
  inputEl,
  myUrls,
  yourShortenUrl,
  yourLongenUrl,
  label,
  urlList,
} = styles;

type TServerFeedBack = {
  shortUrl: string;
  message: string;
  success: boolean;
  processing: boolean;
  hasShortenUrl: boolean;
  longUrl: string;
};
const formDefault = {
  message: '',
  success: false,
  processing: false,
  hasShortenUrl: false,
  shortUrl: '',
  longUrl: '',
};

const urlformDefault = {
  longUrl: '',
};

const ShortUrlForm = () => {
  const [serverFeedback, setServerFeedback] =
    useState<Partial<TServerFeedBack>>(formDefault);
  const [url, setUrl] = useState(urlformDefault);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUrl((oldSate) => ({ ...oldSate, [name]: value }));
  };

  const shortenUrl = async () => {
    if (!url.longUrl.trim()) return;
    try {
      setServerFeedback((oldState) => ({
        ...oldState,
        processing: true,
      }));

      const res = await fetch(ENCODE_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(url),
      });

      const isJsonResponse =
        res.headers.get('Content-Type') !== 'application/json';

      if (isJsonResponse) {
        const { message } = appLicationError.SERVER_SIDE_ERROR;
        setServerFeedback({
          message,
          success: false,
        });
      }
      const data = await res.json();
      switch (res.status) {
        case 201:
          setServerFeedback((oldState) => ({
            ...oldState,
            ...data.urlDetail,
            hasShortenUrl: true,
            success: true as boolean,
          }));
          break;

        default:
          setServerFeedback((oldState) => ({
            ...oldState,
            success: false,
          }));
      }
    } catch (error) {
      setServerFeedback({
        message: (error as ServerError)?.message,
        success: false,
      });
    } finally {
      setServerFeedback((oldState) => ({
        ...oldState,
        processing: false,
      }));
    }
  };
  const shortenAnother = () => {
    setServerFeedback((oldState) => ({ ...oldState, hasShortenUrl: false }));
    setUrl(urlformDefault);
  };
  const { hasShortenUrl, longUrl, shortUrl, processing } = serverFeedback;
  return (
    <>
      {hasShortenUrl ? (
        <>
          <div className={formBox}>
            <div className={yourLongenUrl}>
              <span className={label}> Your Long URL</span>
              <p>
                <span>{longUrl}</span>
              </p>
            </div>
            <div className={yourShortenUrl}>
              <span className={label}> TinyURL</span>
              <p>{shortUrl}</p>
            </div>
            <div className={myUrls}>
              <Link className={`link-button ${urlList}`} href={MY_URLS_PAGE}>
                <span> My Urls</span>
              </Link>
              <button onClick={shortenAnother}>Shorten Another</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <form  className={formBox}>
            <h3>Shorten a long URL</h3>
            <input
              required
              className={inputEl}
              onChange={handleChange}
              name="longUrl"
              value={url.longUrl}
              type="text"
              placeholder="Enter long link here"
            />
            <button type="button" className={submit} onClick={shortenUrl}>
              {processing ? 'Processing...' : 'Shorten URL'}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default ShortUrlForm;
