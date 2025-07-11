import { HTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { deviceBreakPoints } from '../../styles/global-style'
import PageSectionContainer from '../PageSectionContainer'
type GradientPosition = 'top' | 'bottom' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'left' | 'right'

interface SubpageSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  Parallax?: ReactNode
  wide?: boolean
  fullWidth?: boolean
  narrow?: boolean
  bgColor?: '1' | '2' | '3'
  border?: 'top' | 'bottom' | 'top-bottom' | 'all'
  isCentered?: boolean
  className?: string
  edgeGradient?: boolean
  gradientPosition?: GradientPosition
  noTopPadding?: boolean
  noBottomPadding?: boolean
  overflow?: 'hidden' | 'visible'
}

const SubpageSection = ({ children, Parallax, ...props }: SubpageSectionProps) => (
  <SubpageSectionStyled {...props}>
    {children}
    {Parallax}
  </SubpageSectionStyled>
)

export default SubpageSection

const SubpageSectionStyled = styled(PageSectionContainer)<SubpageSectionProps>`
  position: relative;
  justify-content: ${({ isCentered }) => (isCentered ? 'center' : 'flex-start')};
  padding-top: ${({ noTopPadding }) => (noTopPadding ? '0' : 'var(--spacing-12)')};
  padding-bottom: ${({ noBottomPadding }) => (noBottomPadding ? '0' : 'var(--spacing-12)')};
  background-color: ${({ theme, bgColor }) => (bgColor ? theme[`background${bgColor}`] : 'transparent')};
  border-radius: ${({ fullWidth }) => (fullWidth ? '0' : 'var(--radius-big)')};
  overflow: ${({ overflow }) => overflow || 'hidden'};

  @media ${deviceBreakPoints.mobile} {
    padding: var(--spacing-8) var(--spacing-4);
  }

  ${({ border }) =>
    border &&
    css`
      ${border === 'top' &&
      css`
        box-shadow: inset 0 1px 0 0 ${({ theme }) => theme.borderPrimary};
      `}
      ${border === 'bottom' &&
      css`
        box-shadow: inset 0 -1px 0 0 ${({ theme }) => theme.borderPrimary};
      `}
      ${border === 'top-bottom' &&
      css`
        box-shadow: inset 0 1px 0 0 ${({ theme }) => theme.borderPrimary},
          inset 0 -1px 0 0 ${({ theme }) => theme.borderPrimary};
      `}
      ${border === 'all' &&
      css`
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.borderPrimary};
      `}
    `}

  ${({ edgeGradient, gradientPosition = 'bottom', theme }) =>
    edgeGradient &&
    css`
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 15%;
        max-height: 40px;
        ${gradientPosition.includes('top') ? 'top: 0;' : 'bottom: 0;'}
        ${gradientPosition.includes('left')
          ? 'left: 0;'
          : gradientPosition.includes('right')
          ? 'right: 0;'
          : 'left: 0;'}
        background: radial-gradient(
          circle at ${gradientPosition.includes('right') ? '140%' : gradientPosition.includes('left') ? '-40%' : '50%'} 
          ${gradientPosition.includes('top') ? '-100%' : '100%'},
          ${theme.palette6} 0%,
          ${theme.palette5} 10%,
          ${theme.palette1} 25%,
          ${theme.palette5} 28%,
          ${theme.palette3} 30%,
          transparent 100%
        );
        pointer-events: none;
        opacity: 0.8;
        filter: blur(60px) brightness(${theme.name === 'dark' ? 1 : 1.4}) saturate(${theme.name === 'dark' ? 1 : 1.6});
      }
    `}
`
