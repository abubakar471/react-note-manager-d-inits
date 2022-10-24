import "./MenuBar.css";
import React from "react";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useState } from "react";
import { Link } from "react-router-dom"

const MenuBar = () => {
    const [state, setState] = useState({
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    let pinnedNotes = <><Link to="/pinnedNotes" className="sideBarLink"><PushPinIcon /><span>Pinned Notes</span><br /></Link><br /></>;
    let breakLine = <><br /></>;
    let archive = <><Link to="/archive" className="sideBarLink"><ArchiveIcon /><span>Archive</span></Link><br /></>;
    let sideBarItems = [pinnedNotes, archive];
    const list = (anchor) => (
        <Box
            className="sideBarBox"
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <ArrowBackIcon style={{ padding: "10px", cursor: "pointer" }} onClick={toggleDrawer(anchor, false)} />
            <Divider />
            <List className="sideBarLinks">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon >
                            {sideBarItems[0]}
                            <br />
                        </ListItemIcon>
                        <br />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon >
                            {sideBarItems[1]}
                            <br />
                        </ListItemIcon>
                        <br />
                    </ListItemButton>
                </ListItem>
                {/* {sideBarItems[0]}
                <br /> */}

            </List>
        </Box>




    );


    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>

                        <div className="menuBtn">
                            <MenuIcon className="menuIcon" fontSize="large" />
                        </div>

                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default MenuBar;