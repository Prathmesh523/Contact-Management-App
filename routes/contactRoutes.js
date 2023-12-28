import express from 'express'
import { createContacts, deleteContact, getContact, getContacts, updateContact } from '../controllers/contactController.js'
import validateToken from '../middlewares/validateTokenHandler.js'

const router = express.Router()
router.use(validateToken)

router.route("/")
    .get(getContacts)
    .post(createContacts)

router.route("/:id")
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact)

export default router