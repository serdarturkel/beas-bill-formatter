import { Card, Icon, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getData as getProjectData } from 'api/api';
import MDTypography from 'components/MDTypography';
const DataTableWithPagination = ({ cols, handleEdit, handleDelete, fetchUrl }) => {
    const [data, setData] = useState([]);        // Tüm veri
    const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa
    const [itemsPerPage] = useState(10);         // Sayfa başına gösterilecek veri
    const [loading, setLoading] = useState(true); // Yüklenme durumu

    const deleteAction = async (item) => {
        await handleDelete(item);
        await fetchData();
    }

    const fetchData = async () => {
        setLoading(true);
        const result = await getProjectData(fetchUrl + '?page=' + (currentPage - 1) + '&size=' + itemsPerPage + '&sort=createdDate'
            + (searchValue && '&search=name=like=' + searchValue + ',description=like=' + searchValue));
        setData(result);
        setLoading(false);
    };

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
    const [searchValue, setSearchValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const allowedPattern = /^[A-Za-z0-9*]*$/;
    const handleInputChange = (e) => {
        const value = e.target.value;

        // Eğer girilen veri regex'e uyuyorsa state'e set et
        if (allowedPattern.test(value)) {
            setSearchValue(value);
            setErrorMessage('');
        } else {
            // Uygun olmayan giriş olduğunda hata mesajı göster
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
            <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <MDBox>
                    <TextField
                        label="Search here"
                        value={searchValue}
                        onChange={(e) => handleInputChange(e)}
                        onKeyDown={handleKeyDown} // Enter tuşunu burada kontrol ediyoruz
                        variant='outlined'
                        error={!!errorMessage} // Eğer hata varsa kırmızı çerçeve göster
                        helperText={errorMessage} // Hata mesajını göster
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
