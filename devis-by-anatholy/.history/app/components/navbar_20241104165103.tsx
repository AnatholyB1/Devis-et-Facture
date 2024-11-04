"use client"
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from 'next-auth/react';

const Navbar: React.FC = () => {
    const {data}  =  useSession();

    return (
        <AppBar position="static">
            <Toolbar className='p-2'>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Devis By Anatholy
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Contact</Button>
                {data?.user?.name}
                <Avatar>
                    <AvatarImage src={data?.user?.image as string} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;