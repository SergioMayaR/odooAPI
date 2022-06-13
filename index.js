const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const response = require('./network/response');
const router = require('./network/routes');

var Odoo = require('odoo-xmlrpc');
var odoo = new Odoo({
    url: "localhost",
    port: 8015,
    db: "odoo15",
    username: 'admin',
    password: 'api'
});
var app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/app', express.static('public'));
app.get('/', function (req, res) {
    let obj = {
        "start": "Punto de inicioa"
    }
    response.success(req, res, obj, 200);

});
/* var app = express();
app.get('/', function (req, res) {
  

        // 4- Read
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
                res.status(200).send({
                    error: "message",
                    body: value2,
                });
            });
        });
    });

}); */

router(app);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('La aplicación está escuchando en http://localhost:' + port);