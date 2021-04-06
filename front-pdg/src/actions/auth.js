export const type = 'loginUser';

const loginUser = (dataLogin) => ({
    type,
    payload: dataLogin,
});

export default loginUser;