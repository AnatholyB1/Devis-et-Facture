"use client"
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"


const Navbar: React.FC = () => {
    const {data}  =  useSession();

    return (
        <AppBar position="static" className='!bg-background'>
            <Toolbar className='gap-4'>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Devis By Anatholy
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Contact</Button>
                <span>{data?.user?.name}</span>
                <Avatar>
                    <AvatarImage src={data?.user?.image as string} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;