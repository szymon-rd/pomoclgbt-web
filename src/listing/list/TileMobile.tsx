import React from 'react';
import { Institution } from '../../model/types';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';

interface TileMobileProps {
  institution: Institution
}
export const TileMobile = ({institution}: TileMobileProps) => {

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

      <div className="content">
        <div className="tileHeading">
          <div className="icon">
            <img src={require(`./${institution.id}.png`)} alt="" />
          </div>
          <div className="midLine"></div>
          <div className="tileTitleAndLabel">
            <div className="tileTitle">
              {institution.name}
            </div>
            <div className="tileLabel">
              {institution.label}
            </div>
          </div>
        </div>
        <div className="tileDesc">
          {institution.description}
        </div>
        <div className="contact">
          Kontakt:
          {institution.contact.map(contact => (
            <div className="contactOption">
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
