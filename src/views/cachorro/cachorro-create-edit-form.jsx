import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UICard } from '../../components/ui/card';
import { paths } from '../../router/paths';
import { getLocalItem, setLocalItem } from '../../utils/storage';

export const CachorroCreateEditForm = ({ currentData }) => {
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const validationShema = Yup.object().shape({
        raca: Yup.string().required('Raça é obrigatório'),
    });

    const defaultValues = useMemo(
        () => ({
            raca: currentData?.raca || '',
        }),
        [currentData],
    );

    const methods = useForm({
        resolver: yupResolver(validationShema),
        defaultValues,
    });

    const { handleSubmit, control } = methods;


    const handleCreat = (data) => {
        setLoader(true);
        const list = getLocalItem('cachorros') || [];

        const id = list.length + 1;

        const newData = { id, ...data };
        list.push(newData);

        setLocalItem('cachorros', list);

        setTimeout(() => {
            alert('Criado com sucesso');
            navigate(paths.formulario.list);
            setLoader(false);
        }, 2000);


    };

    const handleUpdate = (data) => {
        setLoader(true);
        const list = getLocalItem('cachorros') || [];

        const index = list.findIndex((item) => item.id === currentData.id);

        list[index] = {
            ...currentData
            , ...data
        };

        setLocalItem('cachorros', list);
        setTimeout(() => {
            alert('Editado com sucesso');
            navigate(paths.formulario.list);
            setLoader(false);
        }, 2000);

    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            !currentData ? handleCreat(data) : handleUpdate(data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <UICard sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
                        Informações
                    </Typography>
                    <Grid container >
                        <Grid xs={12}>
                            <Stack spacing={2} direction='row' >
                                <Controller
                                    name={'raca'}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            fullWidth
                                            type='text'
                                            value={field.value}
                                            label="Raça"
                                            onChange={(event) => field?.onChange(event?.target?.value)}
                                            error={!!error}
                                            helperText={error ? error?.message : ''}
                                        />
                                    )}
                                />
                            </Stack>
                        </Grid>

                    </Grid>


                    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                        <LoadingButton type="submit" variant="contained" loading={loader}>
                            {!currentData ? 'Criar Cachorro' : 'Salvar alterações'}
                        </LoadingButton>
                    </Stack>
                </UICard>
            </form>
        </FormProvider>
    )
}