import React from "react";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CreateIcon from "@material-ui/icons/Create";
import { Grid, IconButton } from "@material-ui/core";
import { StyledMenu } from "../StyledMenu";

interface CompanyMenuButtonProps {
  children: React.ReactNode;
  companyName: string;
  className?: string;
  buttonClassName?: string;
}

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
            <IconButton
              component="div"
              id="iconbtn"
              onClick={handleIconClick}
              color="primary"
            >
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
        <div>{children}</div>
      </StyledMenu>
    </div>
  );
};
