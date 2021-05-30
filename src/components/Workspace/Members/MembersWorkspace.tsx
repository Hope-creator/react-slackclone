import React from 'react'
import { IUser } from '../../../store/modules/user/types'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { WorkspaceContent } from '../WorkspaceContent'
import { WorkspaceHeader } from '../WorkspaceHeader'
import { MembersContent } from './Content/MembersContent'

interface IMembersWorkspaceProps {
    currentMembers: IUser[]
}

export const MembersWorkspace: React.FC<IMembersWorkspaceProps> = ({currentMembers}) => {
    return (
        <>
        <WorkspaceHeader
          leftSideContent={
            <>
              <Typography variant="h6">People</Typography>
              <Typography variant="caption">
                {currentMembers.length} members
              </Typography>
            </>
          }
          rightSideContent={
            <>
              <Button>Invite people</Button>
            </>
          }
        />
        <WorkspaceContent
          children={<MembersContent members={currentMembers} />}
        />
      </>
    )
}
