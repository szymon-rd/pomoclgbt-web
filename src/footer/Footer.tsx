import React from 'react';
import './Footer.css'


interface FooterProps {
  color: string
}
export const Footer = ({color}: FooterProps) => {
  return (
    <div style={{color: color}} className="footer" >
      © 2020 pomoclgbt.pl
    </div>
  )
}
