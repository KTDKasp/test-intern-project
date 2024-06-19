import React from 'react';
import { Link } from 'react-router-dom';

import { UserCardProps } from './UserCard.props';

import './UserCard.css';

export const UserCard: React.FC<UserCardProps> = React.memo(function Usercard({
  avatar,
  last_name,
  first_name,
  id,
  isFavorite,
  onAddToFavorite,
}) {
  const [isFavoriteState, setIsFavoriteState] = React.useState<boolean>(isFavorite);

  const handleFavorite = React.useCallback(() => {
    setIsFavoriteState(!isFavoriteState);
    onAddToFavorite(id);
  }, [id, onAddToFavorite, isFavoriteState]);
  return (
    <div className="user__card">
      <Link to={`/item/${id}`} className="user__link">
        <div className="image-wrapper">
          <img className="user__image" src={avatar} alt="User Image" />
        </div>
        <p className="user__name">
          {first_name} {last_name}
        </p>
      </Link>
      <div className="user__bottom">
        <button onClick={handleFavorite} className="user__favorite">
          <img
            src={isFavoriteState ? './svg/like-1.svg' : './svg/like-2.svg'}
            alt="Heart icon"
          />
        </button>
      </div>
    </div>
  );
});
