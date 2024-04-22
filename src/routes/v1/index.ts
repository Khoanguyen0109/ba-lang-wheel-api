import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getCampaign } from '../../controller/v1/campaing';
import { addUserPrize, getUserPrize } from '../../controller/v1/user';
import { getSettings } from '../../controller/v1/set';

const router = Router();

router.get('/campaign', expressAsyncHandler(getCampaign));
router.get('/prize/:userId', expressAsyncHandler(getUserPrize));
router.get('/settings', expressAsyncHandler(getSettings));
router.post('/prize', expressAsyncHandler(addUserPrize));

export default router;
