'use client'
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, setDoc, doc, DocumentData, QueryDocumentSnapshot, query, onSnapshot, updateDoc } from "firebase/firestore";
import { getHighestCode,countFormater } from "@/utils/utils";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/firebase-config";

interface BankData {
    description: string;
    number: string;
    name: string;
    code: number;
    mount: string;
    id:string
}

interface MovementData {
    remitent: number;
    to: number;
    mount: string;
}

export default function banks() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [mount, setMount] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState<BankData[]>([]);
    const [movements, setMovements] = useState<MovementData[]>([]);
    const [moveDialog, setMoveDialog] = useState(false)
    const [remitent, setRemitent] = useState("")
    const [to, setTo] = useState("")


    const handleClose = () => {
        setOpen(false);
        setMoveDialog(false);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleRemitent = (event: SelectChangeEvent) => {
        setRemitent(event.target.value as string);
    };
    const handleTo = (event: SelectChangeEvent) => {
        setTo(event.target.value as string);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setMount("");
        setName("");
        setDescription("");
        setNumber("");
    };

    const handleMoveDialog = () => {
        setMoveDialog(true);
    };

    const addBank = async () => {
        const id = uuidv4();
        const high_code = getHighestCode(data)
        await setDoc(doc(db, "banks", id), {
            description: description,
            number: number,
            name: name,
            code:high_code ,
            mount: mount,
            id:id,
          });
          setOpen(false);(false);

    }
    const addMovement = async () => {
        const id = uuidv4();
        const aux_banks = JSON.parse(JSON.stringify(data))
        const account1: BankData = aux_banks.find((item: BankData) => item.code === parseInt(remitent))
        const account2: BankData = aux_banks.find((item: BankData) => item.code === parseInt(to))
        const result_acc1 = parseFloat(account1.mount) - parseFloat(mount)
        const result_acc2 = parseFloat(account2.mount) + parseFloat(mount)
        console.log(account1)
        console.log(account2)
        const acc1 = doc(db, "banks", account1.id);
        await updateDoc(acc1, {
            mount: result_acc1
        });
        const acc2 = doc(db, "banks", account2.id);
        await updateDoc(acc2, {
            mount: result_acc2
        });
        await setDoc(doc(db, "movements", id), {
            remitent: remitent,
            to:to,
            mount: mount,
            id:id,
          });
        setMoveDialog(false);

    }
    const getData = async () => {
        const qBanks = query(collection(db, "banks"));
        const qMovements = query(collection(db, "movements"));

        const unsubscribeBanks = onSnapshot(qBanks, (querySnapshot) => {
            const auxBanks: BankData[] = [];
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                auxBanks.push({ ...doc.data() } as BankData);
            });
            setData(auxBanks);
        });

        const unsubscribeMovements = onSnapshot(qMovements, (querySnapshot) => {
            const auxMovements: MovementData[] = [];
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                auxMovements.push({ ...doc.data() } as MovementData);
            });
            setMovements(auxMovements);
        });

        return () => {
            unsubscribeBanks();
            unsubscribeMovements();
        };
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className="p-8">
                <Grid container spacing={4}>
                    <Grid size={12}>

                        <Stack direction={"row"} spacing={2} >
                            <Button variant="contained" onClick={handleClickOpen}>Crear Banco</Button>
                            <Button variant="contained" onClick={handleMoveDialog}>Generar Movimiento</Button>
                        </Stack>


                    </Grid>

                    <Grid size={6}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Nro
                                        </TableCell>
                                        <TableCell>
                                            Banco
                                        </TableCell>
                                        <TableCell>
                                            Cuenta
                                        </TableCell>
                                        <TableCell>
                                            Saldo
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell >
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell >
                                                        {row.number}
                                                    </TableCell>
                                                    <TableCell >
                                                        {row.mount}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                    <Grid size={6}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Nro
                                        </TableCell>
                                        <TableCell>
                                            Banco Remitente
                                        </TableCell>
                                        <TableCell>
                                            Banco Objetivo
                                        </TableCell>
                                        <TableCell>
                                            Monto
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {movements
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell >
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell >
                                                        {countFormater(row.remitent)}
                                                    </TableCell>
                                                    <TableCell >
                                                        {countFormater(row.to)}
                                                    </TableCell>
                                                    <TableCell >
                                                        {row.mount}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={open}

            >
                <DialogTitle>Registrar Ingreso</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ marginTop: 3 }}>
                        <Grid size={6}>
                            <TextField fullWidth size="small" value={name} onChange={(e) => { setName(e.target.value) }} type="text" id="outlined-basic" label="Nombre" variant="outlined" />
                        </Grid>
                        <Grid size={6}>
                            <TextField fullWidth size="small" value={mount} onChange={(e) => { setMount(e.target.value) }} type="number" id="outlined-basic" label="Cantidad" variant="outlined" />
                        </Grid>
                        <Grid size={12}>
                            <TextField fullWidth size="small" value={number} onChange={(e) => { setNumber(e.target.value) }} type="number" id="outlined-basic" label="Numero de Cuenta" variant="outlined" />
                        </Grid>
                        <Grid size={12}>
                            <TextField fullWidth multiline value={description} onChange={(e) => { setDescription(e.target.value) }} rows={4} size="small" id="outlined-basic" label="Descripcion" variant="outlined" />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Stack direction={"row"} gap={3}>
                        <Button variant="contained" color={"secondary"} onClick={addBank} >Crear</Button>
                        <Button variant="contained" color={"primary"} onClick={handleClose}>Cerrar</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={moveDialog}

            >
                <DialogTitle>Registrar Ingreso</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ marginTop: 3 }}>
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Cuentas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={remitent}
                                    label="Cuentas"
                                    onChange={handleRemitent}
                                    size="small"
                                >
                                    <MenuItem value={1}>Banco Pichincha</MenuItem>
                                    <MenuItem value={2}>JEP</MenuItem>
                                    <MenuItem value={3}>Billetera</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Cuentas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={to}
                                    label="Cuentas"
                                    onChange={handleTo}
                                    size="small"
                                >
                                    <MenuItem value={1}>Banco Pichincha</MenuItem>
                                    <MenuItem value={2}>JEP</MenuItem>
                                    <MenuItem value={3}>Billetera</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <TextField fullWidth size="small" value={mount} onChange={(e) => { setMount(e.target.value) }} type="number" id="outlined-basic" label="Cantidad" variant="outlined" />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Stack direction={"row"} gap={3}>
                        <Button variant="contained" color={"secondary"} onClick={addMovement} >Generar Movimiento</Button>
                        <Button variant="contained" color={"primary"} onClick={handleClose}>Cerrar</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
}