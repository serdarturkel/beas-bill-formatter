import { Card, Icon, IconButton, TextField } from '@mui/material';
import MDBox from 'components/MDBox';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getData as getProjectData } from 'api/api';
const DataTableWithPagination = ({ cols, handleEdit, handleDelete, fetchUrl, handleView, searchKey }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);


    const deleteAction = async (item) => {
        await handleDelete(item);
        await fetchData();
    }

    const viewAction = async (item) => {
        await handleView(item);
    }

    const fetchData = async () => {
        setLoading(true);
        const result = await getProjectData(fetchUrl + '?page=' + (currentPage - 1) + '&size=' + itemsPerPage + '&sort=createdDate'
            + (searchValue && '&search=' + searchKey + '=like=' + searchValue + ',description=like=' + searchValue));
        setData(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, itemsPerPage]);

    const currentItems = data.content;

    const handlePageChange = (page) => setCurrentPage(page);

    const columns = [
        {
            name: 'Actions',
            cell: row => (

                <MDBox display="flex">
                    {handleEdit && (
                        <IconButton onClick={() => handleEdit(row)} sx={{ fontWeight: "bold" }}>
                            <Icon sx={{ fontWeight: "bold" }}>{"edit"}</Icon>
                        </IconButton>
                    )}
                    {handleDelete && (
                        <IconButton onClick={() => deleteAction(row)} sx={{ fontWeight: "bold" }}>
                            <Icon sx={{ fontWeight: "bold" }}>{"delete"}</Icon>
                        </IconButton>
                    )}
                    {handleView && (
                        <IconButton onClick={() => viewAction(row)} sx={{ fontWeight: "bold" }}>
                            <Icon sx={{ fontWeight: "bold" }}>{"visibility"}</Icon>
                        </IconButton>
                    )}
                </MDBox >
            ),
            ignoreRowClick: true
        },
        ...cols,
    ];
    const [searchValue, setSearchValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const allowedPattern = /^[A-Za-z0-9*]*$/;
    const handleInputChange = (e) => {
        const value = e.target.value;
        if (allowedPattern.test(value)) {
            setSearchValue(value);
            setErrorMessage('');
        } else {
            setErrorMessage('Only characters A-Z, a-z, 0-9, and * are allowed.');
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    };

    return (
        <Card>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3} >
                <MDBox>
                    <TextField
                        label={searchKey}
                        value={searchValue}
                        onChange={(e) => handleInputChange(e)}
                        onKeyDown={handleKeyDown}
                        variant='outlined'
                        error={!!errorMessage}
                        helperText={errorMessage}
                    />
                </MDBox>
                <MDBox color="text" px={2}>
                    <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={fetchData}>
                        refresh
                    </Icon>
                </MDBox>
            </MDBox>
            <MDBox>
                <DataTable
                    columns={columns}
                    data={currentItems}
                    progressPending={loading}
                    pagination={true}
                    paginationServer={true}
                    paginationTotalRows={data.totalElements}
                    onChangePage={handlePageChange}
                    paginationPerPage={data.size}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                    highlightOnHover
                    pointerOnHover
                />
            </MDBox>
        </Card>
    );
};

export default DataTableWithPagination;
