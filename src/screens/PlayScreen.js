import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Button, Divider } from "@mui/material";
import { UserContext } from "../App";
import { API } from "../axios";

export default function PlayScreen() {
  const ref = React.useRef(null);
 
 

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {messageExamples.map(({ primary, secondary, person, link, coins, id }, index) =>   <Card primary={primary} secondary={secondary} person={person} link={link} coin={coins} id={id} index={index} /> )}
      </List>
    </Box>
  );
}



function Card({ primary, secondary, person, link, coin, id }) {
  const [isClaimed, setIsClaimed] = React.useState(false);
  const { userInfo, setUserInfo } = React.useContext(UserContext);

  const handleClaim = async (coins, id, url) => {
    try {
      window.open(url, "_blank");
      const res = await API.post("earn", {
        coins: coins,
        token: userInfo.token,
      }, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });

      if (res.status === 200) {
        
        localStorage.setItem(id, id);
        setUserInfo(res.data);
        setIsClaimed(true);
         
      }
    } catch (error) {
      console.error("Error claiming coins:", error);
    }
  };

 

  React.useEffect(() => {
    const claimed = localStorage.getItem(id);
    setIsClaimed(claimed !== null);
  }, [id]);

  return (
    <>
      <ListItemButton
        disabled={isClaimed}
        onClick={() => handleClaim(coin, id, link)}
      >
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src={person} />
        </ListItemAvatar>
        <ListItemText primary={primary} secondary={secondary} />
        <Button variant="contained" color="error">
          {isClaimed ? "Played" : "Play"}
        </Button>
      </ListItemButton>
      <Divider />
    </>
  );
}

const messageExamples = [
  {
    id: "1PLAY",
    primary: "Blum",
    secondary: "10k Coin",
    coins: 10000,
    person: "/static/images/avatar/5.jpg",
    link: "https://t.me/BlumCryptoBot/app?startapp=ref_FcdhJ4Pzht",
  },
  {
    id: "2PLAY",
    primary: "Major",
    secondary: "10k Coin",
    coins: 10000,
    person: "/static/images/avatar/5.jpg",
    link: "https://t.me/major/start?startapp=5894934699",
  },
];
