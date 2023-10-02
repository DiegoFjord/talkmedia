import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const asyncHandler = require('express-async-handler')
// desc GET goals
//route /api/goals
//access Private
const getInfo = asyncHandler(async(req, res) => {
    res.status(200).json({messages:'Get info'})
})

// desc Post goals
//route /api/goals
//access Private
const setInfo = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('add text')
    }
    res.status(200).json({message: 'set info'})
})

// desc put goals
//route /api/goals/:id
//access Private
const updateInfo = asyncHandler(async(req, res) => {
    res.status(200).json({message: `update info ${req.params.id}`})
})

// desc Delete goals
//route /api/goals/:id
//access Private
const deleteInfo = asyncHandler(async(req, res) => {
    res.status(200).json({message: `delete info ${req.params.id}`})
})

export {
    getInfo, setInfo, updateInfo, deleteInfo,
};