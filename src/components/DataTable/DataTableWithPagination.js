import { Card, Icon, IconButton, Menu, MenuItem } from '@mui/material';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getData as getProjectData } from 'api/api';
const DataTableWithPagination = ({ cols, handleEdit, handleDelete, fetchUrl }) => {
    const [data, setData] = useState([]);        // Tüm veri
    const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa
    const [itemsPerPage] = useState(10);         // Sayfa başına gösterilecek veri
    const [loading, setLoading] = useState(true); // Yüklenme durumu


    const [menu, setMenu] = useState(null);
    const openMenu = ({ currentTarget }) => setMenu(currentTarget);

    const fetchAndCloseMenu = () => {
        fetchData();
        closeMenu();
    };
    const closeMenu = () => {
        setMenu(null);
    };

    const deleteAction = async (item) => {
        await handleDelete(item);
        await fetchData();
    }

    const fetchData = async () => {
        setLoading(true);
        const result =await getProjectData(fetchUrl + '?page=' + (currentPage - 1) + '&size=' + itemsPerPage + '&sort=name');
        setData(result);
        setLoading(false);
    };

    const renderMenu = (
        <Menu
            id="simple-menu"
            anchorEl={menu}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(menu)}
            onClose={closeMenu}
        >
            <MenuItem onClick={fetchAndCloseMenu}>Refresh Data</MenuItem>
        </Menu>
    );

    // Backend'den veri çekme
    useEffect(() => {
        fetchData();
    }, [currentPage, itemsPerPage]);


    // Mevcut sayfa için veriyi hesaplama
    const currentItems = data.content;

    // Sayfa numarası değiştiğinde çağrılan fonksiyon
    const handlePageChange = (page) => setCurrentPage(page);

    // DataTable Kolonları
    const columns = [
        {
            name: 'Actions',  // Custom action column
            cell: row => (

                <MDBox display="flex">
                    <IconButton onClick={() => handleEdit(row)} sx={{ fontWeight: "bold" }}>
                        <Icon sx={{ fontWeight: "bold" }}>{"edit"}</Icon>
                    </IconButton>
                    <IconButton onClick={() => deleteAction(row)} sx={{ fontWeight: "bold" }}>
                        <Icon sx={{ fontWeight: "bold" }}>{"delete"}</Icon>
                    </IconButton>
                </MDBox >
            ),
            ignoreRowClick: true,  // Satırın diğer alanlarını etkilememesi için
            allowOverflow: true,
            button: true,
        },
        ...cols,
    ];

    return (
        <Card>
            <MDBox display="flex" justifyContent="right" alignItems="center" p={4}>
                <MDBox>
                    <MDInput label="Search here" />
                </MDBox>
                <MDBox>
                    <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                        more_vert
                    </Icon>
                </MDBox>

                {renderMenu}
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
