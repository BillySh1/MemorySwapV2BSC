import { Svg, SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const BadgeIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 200}
      height={props.height ?? 60}
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.21219 0.101602H0C0 0.101602 2.6226 -0.127003 7.21219 0.101602H200V59.2971C200 59.2971 123.902 66.9516 82.439 31.7408C51.4654 5.43786 20.764 0.776611 7.21219 0.101602Z"
        fill={props.fill??'white'}
      />
    </Svg>
  )
}

export default BadgeIcon
