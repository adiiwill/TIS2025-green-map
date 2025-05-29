import styled from 'styled-components'
import { Button } from '@heroui/react'

export const StyledButton = styled(Button)<{ $isVisible: boolean }>`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isVisible ? 'rotate(45deg)' : 'rotate(0deg)')};
  background: #fbd44c;
  color: #fff;
`
