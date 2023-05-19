import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { User } from '../models/User';
import { Card, CardContent, Container, TextField, Typography } from '@mui/material';

export const AppHome = () => {

    const [user, setUser] = useState<User>({
		id: 1,
        username: '',
        email: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        const decoded: any = jwt_decode(token);
        const user = decoded['user'];
        setUser(user);
        }
    }, []);

    return (
		<>
			{user.username === '' && (
                <h1>Home page</h1>
            )}

			{user.username !== '' && (
			<>
				<h1>Welcome back, {user.username} !</h1>
				<Container>
				<Card style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
					<CardContent style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
						<TextField
							id="username"
							label="Username"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user.username}
							InputProps={{
								readOnly: true,
							}}
						/>

						<TextField
							id="email"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user.email}
							InputProps={{
								readOnly: true,
							}}
						/>

					</CardContent>
				</Card>
			</Container>
			</>
		)}
	</>
    );
};