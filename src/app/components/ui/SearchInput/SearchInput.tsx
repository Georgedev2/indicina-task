'use client';
import styles from './searchInput.module.css'
import { FC, useState } from 'react';
import { icons } from '../../assets';

const { SearchIcon, CloseIconWithBG } = icons;

type Props={
  placeholder?:string
}
const SearchInput:FC<Props> = (props) => {
  const {  placeholder="Search ...", ...rest}=props
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <form
      className={`${styles.searchForm} ${
        isInputFocused ? 'active-border' : ''
      }`}
    >
      <SearchIcon size="1.4rem"  />
      <input
        type="text"
        data-testId='search'
       placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        {...rest}
      />

      {inputValue && (
        <CloseIconWithBG
          role="button"
          className={styles.close}
          onClick={handleClearInput}
          size="1.3rem"
        />
      )}
    </form>
  );
};

export default SearchInput;
