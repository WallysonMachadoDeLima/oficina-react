import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { paths } from "../../../router/paths";
import { CachorroCreateEditForm } from "../cachorro-create-edit-form";

export const CachorroCreate = () => {
    const navigate = useNavigate();
    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item >
                    <Typography variant="h3">Criar Cachorro</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => {
                        navigate(paths.formulario.list);
                    }}>
                        Listar Cachorros
                    </Button>
                </Grid>
            </Grid>
            <CachorroCreateEditForm />
        </>
    )
}