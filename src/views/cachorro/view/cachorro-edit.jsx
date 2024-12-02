import { Button, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { paths } from "../../../router/paths";
import { getLocalItem } from "../../../utils/storage";
import { CachorroCreateEditForm } from "../cachorro-create-edit-form";

export const CachorroEdit = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const list = getLocalItem('cachorros') || [];
    const currentData = list.find((item) => item.id === id);

    console.log(currentData);

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
            {
                <CachorroCreateEditForm currentData={currentData} />
            }
        </>
    )
}