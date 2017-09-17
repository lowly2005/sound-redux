import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from '../components/Link';
import Heart from '../components/Heart';
import ArtworkPlay from '../components/ArtworkPlay';
import ToolTip from 'react-portal-tooltip';
import SongsBodyCardMobileEvents from '../components/SongsBodyCardMobileEvents';
import { SONG_PATH, USER_PATH } from '../constants/RouterConstants';
import IMAGE_SIZES from '../constants/ImageConstants';
import getImageUrl from '../utils/ImageUtils';
import formatSongTitle from '../utils/SongUtils';
import Stats from '../components/Stats';


const propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  liked: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
  toggleLike: PropTypes.func.isRequired,
};

class SongsBodyCard extends Component {
  constructor() {
    super();
     this.onMouseIn = this.onMouseIn.bind(this);
     this.onMouseOut = this.onMouseOut.bind(this);
  }
state = {
  isTooltipActive:false,
} 
  componentDidMount() {
   
  }

  componentWillUnmount() {
    
  }
  onMouseIn() {
    this.setState({ isTooltipActive: true });
  }

  onMouseOut() {
    this.setState({ isTooltipActive: false });
  }

render() {
 
 const {
   index,
   isActive,
   isAuthenticated,
   isPlaying,
   liked,
   login,
   navigateTo,
   playlist,
   playSong,
   song,
   toggleLike,
    } = this.props;

 const { artworkUrl, id, title, user, commentCount, favoritingsCount, playbackCount, description } = song;
 const { avatarUrl, username } = user;

let style = {
  style: {
    background: 'rgba(0,0,0,.8)',
    padding: 10,
    boxShadow: '2px 2px 0.5px rgba(0,0,0,.5)'
  },
  arrowStyle: {
    color: 'rgba(0,0,0,.8)',
    borderColor: false
  }
}
 return (
   <div className={`songs-body-card ${isActive ? 'songs-body-card--active' : ''}`} >
      <div  className="songs-body-card__inner">

        <div
          className="songs-body-card__artwork"
          style={{
            backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.LARGE)})`,
          }}
        >
          <ArtworkPlay
            index={index}
            isActive={isActive}
            isPlaying={isPlaying}
            playlist={playlist}
            playSong={playSong}
          />
        </div>
        <div className="songs-body-card__main">
          <div
            className="songs-body-card__avatar"
            style={{
              backgroundImage: `url(${getImageUrl(avatarUrl)})`,
            }}
          />

          <div 
            id ={"ID_"+`${id}`} 
            className="songs-body-card__details" 
            onMouseEnter={this.onMouseIn}
            onMouseLeave={this.onMouseOut}
          > 
            <ToolTip 
              active={this.state.isTooltipActive} 
              position="right"
              style={style}
              parent={"#"+`${"ID_"+`${id}`}`}
            >     
              <div className="song-main__tooltip__description">
                {description}
              </div>
              <Stats
                className="song-main__stats"
                commentCount={commentCount}
                favoritingsCount={favoritingsCount}
                id={id}
                isAuthenticated={isAuthenticated}
                liked={liked}
                login={login}
                playbackCount={playbackCount}
                toggleLike={toggleLike}
              />
            </ToolTip>
            <Link
              className="songs-body-card__title"
              keys={{ id }}
              navigateTo={navigateTo}
              path={SONG_PATH}
              title={title}
            >
              {formatSongTitle(title)}
            </Link>
            <Link
              className="songs-body-card__username"
              keys={{ id: user.id }}
              navigateTo={navigateTo}
              path={USER_PATH}
              title={username}
            >
              {username}
            </Link>
          </div>
        </div>
        <Heart
          className="songs-body-card__heart popover--right"
          id={id}
          isAuthenticated={isAuthenticated}
          liked={liked}
          login={login}
          toggleLike={toggleLike}
        />
      </div>
      <SongsBodyCardMobileEvents
        index={index}
        isActive={isActive}
        playlist={playlist}
        playSong={playSong}
      />
    </div>
  );
  }
};

SongsBodyCard.propTypes = propTypes;

export default SongsBodyCard;
