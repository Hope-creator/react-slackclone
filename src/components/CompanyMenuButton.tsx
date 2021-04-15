import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CreateIcon from "@material-ui/icons/Create";
import { Grid, IconButton } from "@material-ui/core";

interface CompanyMenuButtonProps {
  children: React.ReactNode;
  companyName: string;
  className?: string;
  buttonClassName?: string;
}

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    backgroundColor: "rgba(248,248,248,1)",
    width: 300,
  },
})((props: MenuProps) => <Menu {...props} />);

export const CompanyMenuButton: React.FC<CompanyMenuButtonProps> = ({
  companyName,
  children,
  className,
  buttonClassName,
}: CompanyMenuButtonProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log("click");
  };

  return (
    <div>
      <Button
        className={buttonClassName}
        fullWidth
        aria-controls="company-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          justify="space-between"
        >
          <Grid container>
            {companyName}
            <ArrowDropDownIcon />
          </Grid>
          <Grid item>
            <IconButton id="iconbtn" onClick={handleIconClick} color="primary">
              <CreateIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Button>
      <StyledMenu
        className={className}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </StyledMenu>
    </div>
  );
};
