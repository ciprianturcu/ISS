import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { User } from "../models/User";
import jwt_decode from 'jwt-decode';

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;

	const [user, setUser] = useState<User>({
		id: 1,
        username: '',
        email: ''
    });

	useEffect(() => {
		const intervalId = setInterval(() => {
			const token = localStorage.getItem('token');
			if (token !== null) {
			const decoded: any = jwt_decode(token);
			const user = decoded['user'];
			setUser(user);
			}
			else {
				setUser({
				id: 1,
				username: '',
				email: '',
				})
			}
		}, 1000);
	
		// Clean up the interval when the component unmounts
		return () => clearInterval(intervalId);
	  }, []);

    return (
		<Box>
			<AppBar style={{backgroundColor:"#B17BED"}}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<HolidayVillageIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Bucket List App
					</Typography>
					{user.username === '' && (
						<>
							<Button
							variant={path.startsWith("/register") ? "outlined" : "text"}
							to="/register"
							component={Link}
							color="inherit"
							sx={{ mr: 5 }}
							startIcon={<HowToRegIcon />}>
							Register
							</Button>
							<Button
							variant={path.startsWith("/login") ? "outlined" : "text"}
							to="/login"
							component={Link}
							color="inherit"
							sx={{ mr: 5 }}
							startIcon={<LoginIcon />}
							>
							Login
							</Button>      
						</>      		
					)}
					{user.username !== '' && (
						<Button
						variant={path.startsWith("/logout") ? "outlined" : "text"}
						to="/logout"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LogoutIcon />}
						>
						Logout
						</Button>     
					)}

					{/* <Button
						variant={path.startsWith("/tennisplayers") ? "outlined" : "text"}
						to="/tennisplayers"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<EmojiEventsIcon />}>
						Tennis Players
					</Button>
					<Button
						variant={path.startsWith("/coaches") ? "outlined" : "text"}
						to="/coaches"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<SportsIcon />}>
						Coaches 
					</Button>
					<Button
						variant={path.startsWith("/tournaments") ? "outlined" : "text"}
						to="/tournaments"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<FestivalIcon />}>
						Tournaments 
					</Button>
					<Button
						variant={path.startsWith("/tournamentregs") ? "outlined" : "text"}
						to="/tournamentregs"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<BorderColorIcon />}>
						Registrations 
					</Button>
					<Button
						variant={path.startsWith("/allstats") ? "outlined" : "text"}
						to="/allstats"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<InsightsIcon />}>
						Statistics
					</Button> */}
				</Toolbar>
			</AppBar>
		</Box>
	);
};