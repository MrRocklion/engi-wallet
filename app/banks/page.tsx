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

interface BankData {
    information: string;
    number: string;
    name: number;
    code: number;
    mount: string;
    hour:string;
}

export default function banks() {

    return (
        <>

        
        </>
    );
}