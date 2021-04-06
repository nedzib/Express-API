/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */

import joi from "joi"


const getSchema = joi.object().keys({
    id: joi.number().required()
})

const postSchema = joi.object().keys({
    id: joi.number().required(),
    name: joi.string().required()
})

const putSchema = joi.object().keys({
    id: joi.number().required(),
    name: joi.string().required()
})

const deleteSchema = joi.object().keys({
    id: joi.number().required()
})

export {
    getSchema,
    postSchema,
    putSchema,
    deleteSchema
}