import React, { useEffect, useState } from "react";
import TopBar from "./component/TopBar.jsx";
import SideBar from "./component/SideBar.jsx";
import Contacts from "./component/Contact.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(true);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<SideBar isSidebar={isSidebar} />
					<main className="content">
						<TopBar setIsSidebar={setIsSidebar} />
						<Contacts />
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
