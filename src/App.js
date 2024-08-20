import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import AdsClick from "@mui/icons-material/AdsClick";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { messageExamples } from "./assets/data/messagesExample";
import HomeScreen from "./screens/HomeScreen";
import EarnScreen from "./screens/EarnScreen";
import PlayScreen from "./screens/PlayScreen";
import InviteScreen from "./screens/InviteScreen";
import { API } from "./axios";
import { Vortex } from "react-loader-spinner";
import "./App.css"

export const UserContext = React.createContext();

function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(220, 51, 14)" // Red color
    }
  }
});

export default function App() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());
  const [userInfo, setUserInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const parseQueryString = (qs) => {
    try {
      const params = new URLSearchParams(qs);
      const data = {};

      // Extract each key-value pair
      for (const [key, value] of params.entries()) {
        try {
          // Try to parse as JSON if possible
          data[key] = JSON.parse(value);
        } catch (e) {
          data[key] = value;
        }
      }
      return data;
    } catch (error) {
      return {};
    }
  };

  // Parse the query string

  const postUserData = async (
    username,
    id,
    first_name,
    last_name,
    referredBy
  ) => {
    try {
      const res = await API.post("/login", {
        username,
        id,
        first_name,
        last_name,
        referredBy
      });

      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const getQueryData = async () => {
    try {
      setLoading(true);
      const queryString = window.location.href.split("#")[1];
      const params = new URLSearchParams(queryString);
      const paramsObject = {};
      for (const [key, value] of params.entries()) {
        if (key === "tgWebAppData") {
          paramsObject[key] = parseQueryString(decodeURIComponent(value));
        } else if (key === "tgWebAppThemeParams") {
          paramsObject[key] = JSON.parse(decodeURIComponent(value));
        } else {
          paramsObject[key] = decodeURIComponent(value);
        }
      }

      const { first_name, id, last_name, username, referredBy } =
        paramsObject?.tgWebAppData?.user ?? {};

      const res = await postUserData(
        username,
        id,
        first_name,
        last_name,
        referredBy
      );
      localStorage.setItem("token", res.token);
      setUserInfo(res);
      console.log(res);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log("error");
      console.log(error);
      console.log("error");
    }
  };

  React.useEffect(() => {
    getQueryData();
  }, []);
 

  React.useEffect(() => {
    if (ref.current) {
      ref.current.ownerDocument.body.scrollTop = 0;
    }
    setMessages(refreshMessages());
  }, [value]);

  if (loading) {
    return (
      <div style={styles.container}>
        <Vortex
          visible={true}
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    );
  }

  return (
    <div className="App-body">
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Box sx={{ pb: 7 }} ref={ref}>
            <Routes>
              <Route path="/" element={<HomeScreen messages={messages} />} />
              <Route path="/earn" element={<EarnScreen />} />
              <Route path="/play" element={<PlayScreen />} />
              <Route path="/invite" element={<InviteScreen />} />
            </Routes>
            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction
                  label="Clicks"
                  icon={<AdsClick />}
                  component={Link}
                  to="/"
                />
                <BottomNavigationAction
                  label="Invite"
                  icon={<RestoreIcon />}
                  component={Link}
                  to="/invite"
                />
                <BottomNavigationAction
                  label="Earn"
                  icon={<FavoriteIcon />}
                  component={Link}
                  to="/earn"
                />
                <BottomNavigationAction
                  label="Play"
                  icon={<ArchiveIcon />}
                  component={Link}
                  to="/play"
                />
              </BottomNavigation>
            </Paper>
          </Box>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
    </div>
  );
}

const styles = {
  container: {
    
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      zIndex: 9999, // Ensure it stays on top
    },
 
};
