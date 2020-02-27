import React from 'react';
import { Institution } from '../../model/types';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';

interface TileProps {
  institution: Institution
}
export const Tile = ({institution}: TileProps) => {

  const contactIcon: Record<string, any> = {
    'phone': (
      <PhoneIcon className="contactIcon"></PhoneIcon>
    ),
    'website': (
      <LanguageIcon className="contactIcon"></LanguageIcon>
    )
  }

  return (
    <div className="tile">
      <div className="icon">
        <img src={require(`./${institution.id}.png`)} alt="" />
      </div>
      <div className="midLine"></div>
      <div className="content">
        <div className="tileTitle">
          {institution.name}
        </div>
        <div className="tileLabel">
          {institution.label}
        </div>
        <div className="tileDesc">
          {institution.description}
        </div>
        <div className="contact">
          Kontakt:
          {institution.contact.map(contact => (
            <div className="contactOption" key={contact.label}>
              {contactIcon[contact.label]}
              <a href={contact.address}>{contact.displayAddress}</a>
            </div>
          ))}
        </div>
        <div className="opinions">

        </div>
      </div>

    </div>
  )
}
