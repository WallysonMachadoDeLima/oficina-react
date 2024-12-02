import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { UICard } from '../../components/ui/card';
import { getLocalItem, setLocalItem } from '../../utils/storage';

export const CachorroCreateEditForm = ({ currentData }) => {
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
        const list = getLocalItem('cachorros') || [];

        const id = list.length + 1;

        const newData = { id, ...data };
        list.push(newData);

        setLocalItem('cachorros', list);


    };

    const handleUpdate = (data) => {
        const list = getLocalItem('cachorros') || [];

        const index = list.findIndex((item) => item.id === currentData.id);

        list[index] = {
            ...currentData
            , ...data
        };

        setLocalItem('cachorros', list);

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
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            Informações
                        </Typography>
                        <Typography />
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
                    </Box>


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