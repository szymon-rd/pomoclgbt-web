import React from 'react';
import './Menu.css'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';

export const Menu = () => {
  return (
    <div className="menu">
      <Link to='/help' className="option">
        <FavoriteIcon style={{ fontSize: 40, color: "black" }}></FavoriteIcon>
        <div className="optionText">Potrzebuję pomocy</div>
      </Link>
      <Link to='/list' className="option">
        <ListIcon style={{ fontSize: 40, color: "black" }}></ListIcon>
        <div className="optionText">Lista</div>
      </Link>
      <div className="option disabled">
        <div>
          <AddIcon style={{ fontSize: 40, color: "black" }}></AddIcon>
          <div className="optionText">Dodaj opinie</div>
          <div className="notice">W trakcie <br/> tworzenia </div>
        </div>
      </div>
    </div>
  )
}
