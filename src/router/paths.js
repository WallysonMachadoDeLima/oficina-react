
export const paths = {
    home: '/',
    components: '/components',
    formulario: {
        list: '/formulario/list',
        create: '/formulario/create',
        edit: (id) => `/formulario/edit/${id || ':id'}`,
    }
}