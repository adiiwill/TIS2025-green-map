import { PhoneInput } from 'react-international-phone'

import styled from 'styled-components'

export const CustomPhoneInput = styled(PhoneInput)<{ $theme: 'dark' | 'light' }>`
  gap: 0.5rem;
  padding: 3px 3px 2px 8px;
  background-color: #f4f4f5;
  align-self: center;
  border-radius: 8px;
  transition-duration: 0.2s;

  &:hover {
    background-color: #e4e4e7;
  }

  .react-international-phone-input {
    background: none;
    border: none;
    color: ${(props) => (props.$theme === 'dark' ? '#fff' : '#000')} !important;
  }

  .react-international-phone-country-selector-button {
    background: none;
    border: none;
  }

  .react-international-phone-country-selector-dropdown {
    background: ${(props) => (props.$theme === 'dark' ? '#171717' : '#fff')} !important;
    color: ${(props) => (props.$theme === 'dark' ? '#fff' : '#000')} !important;
  }

  .react-international-phone-country-selector-dropdown__list-item:hover {
    background: ${(props) => (props.$theme === 'dark' ? 'gray' : '#fff')} !important;
  }
`
