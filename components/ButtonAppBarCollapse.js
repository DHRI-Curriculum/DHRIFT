import React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';


class ButtonAppBarCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleMenu = this.handleMenu.bind(this);
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={'buttonCollapse topBar-container'}
            >
                <IconButton
                    onClick={this.handleMenu}
                    style={{
                        display: {
                            xs: 'block',
                            md: 'none',
                            lg: 'none',
                            xl: 'none',
                            xxl: 'none',
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                        lg: 'none',
                        xl: 'none',
                        xxl: 'none',
                    }
                }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    {this.props.children}
                </Menu>
            </div>
        );
    }
}
export default (ButtonAppBarCollapse);
