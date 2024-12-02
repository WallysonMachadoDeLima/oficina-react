import { Card } from "@mui/material"


export const UICard = ({ children, sx }) => {
    return (
        <Card sx={{ p: 3, bgcolor: '#e8e4e4', borderRadius: 3, ...sx }}>

            {children}

        </Card>
    )
}