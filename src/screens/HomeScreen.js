import * as React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { keyframes } from "@mui/system";
import Confetti from "react-confetti";
import CustomButton from "../components/CustomButton";
import { UserContext } from "../App";
import { API } from "../axios";
import "../css/HomeScreen.css";

const bounceAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

function HomeScreen() {
  const { userInfo, setUserInfo } = React.useContext(UserContext);
  const {
    coins: totalCoinsFromBackend,
    first_name,
    last_name,
    refers,
    username,
    _id
  } = userInfo.user ?? {};
  const [coins, setCoins] = React.useState(0);
  const [totalCoins, setTotalCoins] = React.useState(totalCoinsFromBackend);
  const [animate, setAnimate] = React.useState(false);
  const [animateCoin, setAnimateCoin] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const userName = `${first_name} ${last_name}`;

  const handleClick = () => {
    setCoins((prevCoins) => prevCoins + 1);
    setAnimate(true);
    setAnimateCoin(true);

    setTimeout(() => setAnimate(false), 600);
    setTimeout(() => setAnimateCoin(false), 1000);
  };

  const handleClaim = async () => {
    setShowConfetti(true);
    setOpenDialog(true);
    setTotalCoins(totalCoins + coins);

    const res = await API.post(
      "earn",
      {
        coins: coins,
        token: userInfo.token
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    );

    console.log(res);

    setUserInfo(res.data);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCoins(0);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <>
    <Box sx={styles.container}>
       
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="overline" component="div" sx={styles.userName}>
            {userName}
          </Typography>
          <Typography variant="overline" component="div" sx={styles.userName}>
            {"your total cat coins"}
          </Typography>
          <Typography variant="h4" component="div" sx={styles.coinDisplay}>
            <img
              style={{ width: 25, height: 25 }}
              src={require("../assets/images/currency.png")}
              alt="Currency"
            />{" "}
            {totalCoins}
          </Typography>
        </CardContent>
      </Card>

      <div>
        <img
          src={require("../assets/images/cat.png")}
          alt="Foreground"
          onClick={handleClick}
          className={animate ? "shake" : ""}
          style={{
            width: "69%",
            height: "auto",
            position: "absolute",
            top: "18%",
            left: "15%",
            right: "15%",
            bottom: "0%",
            zIndex: 2,

            transition: "transform 0.6s ease"
          }}
        />
        {animateCoin && (
          <div class="coin-container" onClick={handleClick}>
            <div class="coin"></div>
            <div class="coin"></div>
            <div class="coin"></div>
          </div>
        )}
      </div>

      <img
        src={require("../assets/images/circle.png")}
        alt="Background"
        style={styles.backgroundImage}
      />

      <div style={{ margin: 20, marginTop: 10 }}>
        <Typography
          variant="h5"
          component="div"
          sx={[
            styles.coinDisplay,
            {
              marginBottom: "10px"
            }
          ]}
        >
          <img
            style={{ width: 18, height: 18 }}
            src={require("../assets/images/currency.png")}
            alt="Currency"
          />{" "}
          {coins}
        </Typography>
        <CustomButton name={"Claim"} onClick={handleClaim} />
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="claim-dialog-title"
        aria-describedby="claim-dialog-description"
      >
        <DialogTitle id="claim-dialog-title">Claim Your Coins</DialogTitle>
        <DialogContent>
          <Typography variant="h6" id="claim-dialog-description">
            You have claimed {coins} coins!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    {showConfetti && <Confetti />}
    </>
  );
}

export default HomeScreen;

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "auto",
    
    paddingBottom: "0px"
  },
  backgroundImage: {
    width: "100%",
    height: "auto",
    position: "relative",
    zIndex: 1
  },
  card: {
    marginBottom: "10px"
  },
  coinDisplay: {
    textAlign: "center",
    marginBottom: "0px"
  },
  userName: {
    textAlign: "center"
  }
};
