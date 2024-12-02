import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaDog } from "react-icons/fa6";
import { HiMiniHome } from "react-icons/hi2";
import { RxComponent2 } from "react-icons/rx";
import { paths } from '../router/paths';

export const MenuItens = () => {

    const listItens = [
        {
            name: 'Home',
            path: paths.home,
            icon: <HiMiniHome />,
        },
        {
            name: 'Componentes',
            path: paths.components,
            icon: <RxComponent2 />,
        },
        {
            name: 'Cachorros',
            path: paths.formulario.list,
            icon: <FaDog />,
        }
    ]


    return (
        <List>
            {listItens.map((item) => (
                <ListItem
                    disablePadding
                    key={item.name}
                    onClick={() =>
                        window.location.replace(item.path)
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        {item.name}
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}