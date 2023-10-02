import { createRequire } from 'module';
const require = createRequire(import.meta.url)


const express = require('express')
const router = express.Router()
import { getInfo, setInfo, updateInfo, deleteInfo } from '../controllers/infoController.js';

router.route('/').get(getInfo).post(setInfo)
router.route('/:id').delete(deleteInfo).put(updateInfo)


export default router
