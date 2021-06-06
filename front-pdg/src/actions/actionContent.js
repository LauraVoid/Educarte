export const type = 'filterContent';

const filterCont = (filter) => ({
    type: 'filterContent',
    payload: filter,
    
});

export default filterCont;