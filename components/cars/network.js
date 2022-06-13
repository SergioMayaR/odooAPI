const express = require('express');
const response = require('../../network/response');
const bd = require('../../bd')
const router = express.Router();
var Odoo = require('odoo-xmlrpc');

/**
 * 
 * Funcion para obtener todos los registros
 * 
 * 
 */
router.get('/', function (req, res) {
    var odoo = new Odoo(bd());
    odoo.connect(function (err) {
        if (err) {
            console.log(err)
            console.log('Error to Odoo server.');
            response.error(req, res, 'Internal error', 500, err);
        } else {
            var inParams = [];
            inParams.push([['active', '=', true]]);
            var params = [];
            params.push(inParams);
            odoo.execute_kw('fleet.vehicle', 'search', params, function (err, value) {
                if (err) { return console.log(err); }
                var inParams = [];
                inParams.push(value); //ids
                console.log(value)
                //inParams.push(['id','name','description','active','license_plate','vin_sn']);
                inParams.push(['id', 'message_main_attachment_id', 'name', 'description', 'active', 'manager_id', 'company_id', 'license_plate', 'vin_sn',
                    'trailer_hook', 'driver_id', 'future_driver_id', 'model_id', 'brand_id', 'next_assignation_date', 'acquisition_date', 'first_contract_date', 'color',
                    'state_id', 'location', 'seats', 'model_year', 'doors', 'odometer_unit', 'transmission', 'fuel_type', 'horsepower', 'horsepower_tax', 'power', 'co2',
                    'co2_standard', 'car_value', 'net_car_value', 'residual_value', 'plan_to_change_car', 'plan_to_change_bike', 'frame_type', 'electric_assistance', 'frame_size', 'create_uid',
                    'create_date', 'write_uid', 'write_date'])
                var params = [];
                params.push(inParams);
                odoo.execute_kw('fleet.vehicle', 'read', params, function (err2, value2) {
                    if (err2) { return console.log(err2); }
                    console.log('Result: ', value2);
                    response.success(req, res, value2, 200);
                });
            })
        }
    })
});
/**
 * 
 * 
 * Funcion para obtener un solo registro
 * 
 * 
 * 
 */
router.get('/:id', function (req, res) {
    console.log(req.params.id)
    var odoo = new Odoo(bd());
    odoo.connect(function (err) {
        if (err) {
            console.log(err)
            console.log('Error to Odoo server.');
            response.error(req, res, 'Internal error', 500, err);
        } else {
            var inParams = [];
            inParams.push([['active', '=', true], ['id', '=', req.params.id]]);
            var params = [];
            params.push(inParams);
            odoo.execute_kw('fleet.vehicle', 'search', params, function (err, value) {
                if (err) { return console.log(err); }
                var inParams = [];
                inParams.push(value); //ids
                console.log(value)
                //inParams.push(['id','name','description','active','license_plate','vin_sn']);
                inParams.push(['id', 'message_main_attachment_id', 'name', 'description', 'active', 'manager_id', 'company_id', 'license_plate', 'vin_sn',
                    'trailer_hook', 'driver_id', 'future_driver_id', 'model_id', 'brand_id', 'next_assignation_date', 'acquisition_date', 'first_contract_date', 'color',
                    'state_id', 'location', 'seats', 'model_year', 'doors', 'odometer_unit', 'transmission', 'fuel_type', 'horsepower', 'horsepower_tax', 'power', 'co2',
                    'co2_standard', 'car_value', 'net_car_value', 'residual_value', 'plan_to_change_car', 'plan_to_change_bike', 'frame_type', 'electric_assistance', 'frame_size', 'create_uid',
                    'create_date', 'write_uid', 'write_date'])
                var params = [];
                params.push(inParams);
                odoo.execute_kw('fleet.vehicle', 'read', params, function (err2, value2) {
                    if (err2) { return console.log(err2); }
                    console.log('Result: ', value2);
                    response.success(req, res, value2, 200);
                });
            })
        }
    })
})
/***
 * 
 * Funcion para crear un nuevo regristo
 * 
 * 
 */
router.post('/', function (req, res) {
    console.log(req.params.id)
    var odoo = new Odoo(bd());
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push({ "model_id": 13 })
        var params = [];
        params.push(inParams);
        odoo.execute_kw('fleet.vehicle', 'create', params, function (err, value) {
            if (err) { return console.log(err); }

            console.log('Result: ', value);
            response.success(req, res, { id: value }, 200);
        });
    });
})

/***
 * 
 * 
 * Funcion para actualizar un registros
 * 
 */
 router.put('/:id', function (req, res) {
    let id = parseInt(req.params.id)
    console.log(typeof(id))
    var odoo = new Odoo(bd());
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push([id]); //id to update
        inParams.push({'license_plate': 'DDSA'})
        var params = [];
        params.push(inParams);
        odoo.execute_kw('fleet.vehicle', 'write', params, function (err, value) {
            if (err) { return console.log(err); }
            console.log('Result: ', value);
            response.success(req, res, { result: value }, 200);
        });
    });
});


/**
 * 
 * Funcion para eliminar los registros
 * 
 */
router.delete('/:id', function (req, res) {
    let id = parseInt(req.params.id)
    console.log(typeof(id))
    var odoo = new Odoo(bd());
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push([id]); //id to delete
        var params = [];
        params.push(inParams);
        odoo.execute_kw('fleet.vehicle', 'unlink', params, function (err, value) {
            if (err) { return console.log(err); }
            console.log('Result: ', value);
            response.success(req, res, { result: value }, 200);
        });
    });
});
module.exports = router;