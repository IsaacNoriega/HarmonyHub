import status from '../utils/response-status';
import { Request } from 'express';

const authUser = {
    id: 1,
    role: 'user',
    name: 'John Doe',
    token: '12345'
}

const hasRole = (req, res, next) => {
    if(authUser.role == 'user'){
        res.sendStatus(status.SUCCESS);
        next();
    }else{
        res.sendStatus(status.FORBIDDEN);
    }
}
 

export default hasRole;