import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { User } from "../models/User";
import jwt_decode from 'jwt-decode';
import React from "react";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;

	const [user, setUser] = useState<User>({
		id: 1,
        username: '',
        email: '',
		role: '',
    });

	useEffect(() => {
		const intervalId = setInterval(() => {
			const token = localStorage.getItem('token');
			if (token !== null) {
			const decoded: any = jwt_decode(token);
			const user = decoded['user'];
			console.log(user);
			setUser(user);
			}
			else {
				setUser({
				id: 1,
				username: '',
				email: '',
				role: '',
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
						<>
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
						<Button
						variant={path.startsWith("/bucket-list") ? "outlined" : "text"}
						to="/bucket-list"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<FormatListBulletedIcon />}
						>
						Bucket List
						</Button>  
						</>	
						
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};