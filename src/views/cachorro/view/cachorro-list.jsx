'use client'
import { Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { UICard } from '../../../components/ui/card';
import { paths } from '../../../router/paths';
import { getLocalItem } from '../../../utils/storage';

const TABLE_HEAD = [
    { id: 'id', label: 'ID', width: '5%' },
    { id: 'raca', label: 'Raça', width: 1 },
    { id: 'actions', label: 'Ações', width: '0%' },
]


export const CachorroList = () => {
    const navigate = useNavigate();

    const list = getLocalItem('cachorros') || [];

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h3">Lista de Cachorros</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate(paths.formulario.create);
                        }}
                    >
                        Adicionar Cachorro
                    </Button>
                </Grid>
            </Grid>
            <UICard sx={{ mt: 3 }}>

                <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <Table sx={{ minWidth: 650 }} size={'small'}>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEAD.map((option) => (
                                    <TableCell
                                        key={option.id}
                                        align={'left'}
                                        style={{ width: option.width }}
                                    >
                                        {option.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list?.map((row) => (
                                <TableRow hover key={row?.id}>
                                    <TableCell >{row?.id}</TableCell>
                                    <TableCell >{row?.raca}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                        <IconButton
                                            color="default"
                                            onClick={() => {
                                                navigate(paths.formulario.edit(row?.id));
                                            }}
                                        >
                                            <MdEdit />
                                        </IconButton>

                                        <IconButton
                                            color="default"
                                            onClick={() => {
                                                const newList = list.filter((item) => item?.id?.toString() !== row?.id?.toString());
                                                localStorage.setItem('cachorros', JSON.stringify(newList));
                                                alert(`Cachorro ${row?.raca} removido com sucesso!`);
                                                window.location.reload();
                                            }}
                                        >
                                            <FaTrash size={18} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {list.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Typography variant="body1">Nenhum cachorro cadastrado</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </UICard>
        </>
    );
};
