import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import React from 'react';

import { useScrumList } from 'contexts/ScrumList/ScrumList';

interface Props {
  addHandler: () => void;
  date: Date;
}

export const ScrumTable = ({ date, addHandler }: Props): JSX.Element => {
  const { scrums, handleDelete } = useScrumList();

  return (
    <>
      <Table>
        <TableHead>
          <TableRow className="scrums__header">
            <TableCell>Name</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Time</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="scrum-table">

          {
            scrums
              .filter(row => new Date(row.date).toDateString() == date.toDateString())
              .map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.task}</TableCell>
                  <TableCell>
                    <Tooltip title={row.project.fullName} arrow>
                      <span>{row.project.shortName}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <div className="scrum-table__captionBox">
        <Button
          onClick={addHandler}
          variant="contained"
          color="primary"
          className="scrum-table__addButton"
        >
          Add
        </Button>
      </div>
    </>
  );
};