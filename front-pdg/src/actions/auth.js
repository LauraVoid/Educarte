export const type = 'loginUser';

const loginUser = (dataLogin) => ({
    type: 'loginUser',
    payload: dataLogin,
});

export default loginUser;