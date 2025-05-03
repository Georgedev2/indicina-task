'use client';
import styles from './searchInput.module.css';
import { FC, useState } from 'react';
import { icons } from '../../assets';
import { useRouter } from 'next/navigation';

const { SearchIcon, SendIcon } = icons;

type Props = {
  placeholder?: string;
};
const SearchInput: FC<Props> = (props) => {
  const { placeholder = 'Search ...', ...rest } = props;
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleSerach = () => {
    const param = new URLSearchParams();
    param.set('search', inputValue);
    router.push(`?${param.toString()}`);
  };
  
  return (
    <form
      method="get"
      className={`${styles.searchForm} ${
        isInputFocused ? 'active-border' : ''
      }`}
    >
      <SearchIcon size="1.4rem" />
      <input
        type="text"
        data-testid="search"
        placeholder={placeholder}
        onFocus={handleInputFocus}
        name="search"
        onBlur={handleInputBlur}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        {...rest}
      />

      {inputValue && (
        <button data-testid='send-btn' onClick={handleSerach} type='button'>
          <SendIcon className={styles.sendIcon} data-testid='send-icon'/>
        </button>
      )}
    </form>
  );
};

export default SearchInput;
