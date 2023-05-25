import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { User } from '../models/User';
import { Card, CardContent, Container, TextField, Typography } from '@mui/material';

export const AppHome = () => {

    const [user, setUser] = useState<User>({
		id: 1,
        username: '',
        email: '',
        role: '',
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
				
			</>
		)}
	</>
    );
};