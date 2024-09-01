// src/components/ui/Dropdown.jsx

import { useState } from 'react';
import styled from '@emotion/styled';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
`;

const DropdownButton = styled.button`
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;
  outline: none;

  &:after {
    content: '▼';
    font-size: 10px;
    margin-left: 8px;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
    transition: transform 0.3s ease;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 8px 0 0 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;


//const Dropdown = ({ options, defaultText }) => {
//  const [isOpen, setIsOpen] = useState(false);
//  const [selectedOption, setSelectedOption] = useState(defaultText || options[0]);

//  const toggleDropdown = () => setIsOpen((prev) => !prev);
//  const handleOptionClick = (option) => {
//    setSelectedOption(option);
//    setIsOpen(false);
//  };

//  return (
//    <DropdownContainer>
//      <DropdownButton onClick={toggleDropdown} isOpen={isOpen}>
//        {selectedOption}
//      </DropdownButton>
//      <DropdownMenu isOpen={isOpen}>
//        {options.map((option, index) => (
//          <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
//            {option}
//          </DropdownItem>
//        ))}
//      </DropdownMenu>
//    </DropdownContainer>
//  );
//};

const Dropdown = ({ options, defaultText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultText || options[0]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown} isOpen={isOpen}>
        {selectedOption}
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleOptionClick(option)
          }>{option}</DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );

};


export default Dropdown;
