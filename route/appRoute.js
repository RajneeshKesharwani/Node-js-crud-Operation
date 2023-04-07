const appController = require('../controller/appController')
const appRoute = require('express').Router()

appRoute.get(`/`,appController.index)

appRoute.get(`/address/new`,appController.newPage)

appRoute.post(`/address/add`,appController.newAddress)

appRoute.get(`/address/edit/:id`,appController.getSingleAddress)

appRoute.patch(`/address/update/:id`,appController.updateAddress)

appRoute.delete(`/address/delete/:addId`,appController.deleteAddress)

module.exports = appRoute