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
import { useState,useEffect } from "react";
import { collection, getDocs,setDoc,doc, DocumentData, QueryDocumentSnapshot, query, onSnapshot  } from "firebase/firestore";
import { countFormater, getFormattedDate, getFormattedTime } from "@/utils/utils";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/firebase-config";
interface IncomingData {
    concept: string;
    mount: string;
    count: number;
    date: string;
    hour:string;
}


export default function Incomings() {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [mount,setMount] = useState("");
    const [count,setCount] =  useState('');
    const [concept,setConcept] = useState('');
    const [data,setData] = useState<IncomingData[]>([]);





    const handleChangePage = (event: unknown, newPage: number) => {
            setPage(newPage);
        };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const addIncomming = async()=>{
        const id =  uuidv4();
        await setDoc(doc(db, "incomings", id), {
            concept: concept,
            mount: mount,
            count: count,
            date:getFormattedDate(),
            hour:getFormattedTime()
          });
          setOpen(false);
          
    }
  
    const handleCount = (event: SelectChangeEvent) => {
            setCount(event.target.value as string);
          };
    const handleClose = () => {
        setOpen(false);
    };
    const getData = async () => {
        const q = query(collection(db, "incomings"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const auxIncomings: IncomingData[] = [];
          querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            auxIncomings.push({  ...doc.data() } as IncomingData);
          });
          setData(auxIncomings)
        });
        return () => unsubscribe();
      };
    useEffect(() => {
        
    
        getData();
      }, []); 
    return (
        <>
           <div className="p-8">
           <Grid container spacing={2}>
                    <Grid size={12}>
                     
                            <Stack direction={"row"} spacing={2} >
                                <Button variant="contained"  onClick={handleClickOpen}>Registrar Ingreso</Button>
                            </Stack>

                 
                    </Grid>
                    <Grid size={12}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Nro
                                        </TableCell>
                                        <TableCell>
                                            Concepto
                                        </TableCell>
                                        <TableCell>
                                            Cuenta
                                        </TableCell>
                                        <TableCell>
                                            Fecha
                                        </TableCell>
                                        <TableCell>
                                            Monto
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
                                                        {index+1}
                                                    </TableCell>
                                                    <TableCell >
                                                        {row.concept}
                                                    </TableCell>
                                                    <TableCell >
                                                        {countFormater(row.count)}
                                                    </TableCell>
                                                    <TableCell >
                                                        {row.date+' '+row.hour}
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
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
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
                    <Grid container spacing={2} sx={{marginTop:3}}>
                        <Grid size={4}>
                            <TextField fullWidth size="small" value={mount}  onChange={(e)=>{setMount(e.target.value)}} type="number" id="outlined-basic" label="Cantidad" variant="outlined" />
                        </Grid>
                        <Grid size={8}>
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Cuentas</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={count}
                                    label="Cuentas"
                                    onChange={handleCount}
                                    size="small"
                                    >
                                        <MenuItem value={1}>Banco Pichincha</MenuItem>
                                        <MenuItem value={2}>JEP</MenuItem>
                                        <MenuItem value={3}>Billetera</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={12}>
                            <TextField fullWidth multiline value={concept} onChange={(e)=>{setConcept(e.target.value)}} rows={4}  size="small" id="outlined-basic" label="Concepto" variant="outlined" />
                        </Grid>
                    </Grid>
                   
                </DialogContent>
                <DialogActions>
                    <Stack direction={"row"} gap={3}>
                        <Button variant="contained" color={"secondary"} onClick={addIncomming}>Guardar</Button>
                        <Button variant="contained" color={"primary"} onClick={handleClose}>Cerrar</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );

}