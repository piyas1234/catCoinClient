import React, { useState } from 'react';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton, 
  WhatsappShareButton, 
  TelegramShareButton, 
  RedditShareButton, 
  PinterestShareButton 
} from 'react-share';
import { 
  FacebookIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  WhatsappIcon, 
  TelegramIcon, 
  RedditIcon, 
  PinterestIcon 
} from 'react-share';
import '../css/SocialShareScreen.css'; // Import your custom CSS
import { UserContext } from '../App';

const InviteScreen = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { userInfo, setUserInfo } = React.useContext(UserContext);
  const {
    coins: totalCoinsFromBackend,
    first_name,
    last_name,
    refers,
    username,
    _id
  } = userInfo.user ?? {};
  const shareUrl = `https://t.me/CatSwapCoin_bot/start?startapp=${_id}`; // URL to share
  const title = "Check out this amazing content!";
 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="social-share-screen">
    <h1 className="title">Invite your friends to earn double coins for each invite and receive 20,000 rewards for every game played!</h1>
      <div className="buttons">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={50} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={50} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={50} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={50} round />
        </WhatsappShareButton>
        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={50} round />
        </TelegramShareButton>
        <RedditShareButton url={shareUrl} title={title}>
          <RedditIcon size={50} round />
        </RedditShareButton>
        <PinterestShareButton url={shareUrl} media="https://yourwebsite.com/image.jpg" description={title}>
          <PinterestIcon size={50} round />
        </PinterestShareButton>
      </div>
      <button className="copy-button" onClick={copyToClipboard}>
        {isCopied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
};

export default InviteScreen;
