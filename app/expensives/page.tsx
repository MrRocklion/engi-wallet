'use client'
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function Expensives() {

    return (
        <>
            <div className="p-8">
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Item>
                            <Stack direction={"row"} spacing={2} >
                            <Button variant="contained">Agregar Gasto</Button>
                            <Button variant="contained">Generar Reporte</Button>
                            </Stack>
                       
                        </Item>
                    </Grid>
                    
                    <Grid size={12}>
                        <Item>size=4</Item>
                    </Grid>
                </Grid>
            </div>
        </>
    );

}