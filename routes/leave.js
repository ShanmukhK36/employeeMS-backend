import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave, getLeaves, getLeavesForAction, getLeaveDetails, updateLeave } from '../controllers/leaveController.js'

const router = express.Router()

router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeaves)
router.put('/:id', authMiddleware, updateLeave)
router.get('/', authMiddleware, getLeavesForAction)
router.get('/detail/:id', authMiddleware, getLeaveDetails)

export default router;