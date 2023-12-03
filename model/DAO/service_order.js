var connect_DB = require('./connect_db');

function checkNoEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
                return false;
            }
        }
    }
    return true;
}

function makeOrder(req, res) {
    const sql = [
        'INSERT INTO service_order',
        '(item_type, specific_item, text_description, image_description, province, district, town, street, time_range, status, customer_id, provider_id)',
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ];
    
    const serviceOrder = req.body.service_order;
    
    connect_DB.query(sql.join(''), [
        serviceOrder.itemType,
        serviceOrder.specificItem,
        serviceOrder.textDescription,
        serviceOrder.imageDescription,
        serviceOrder.position.province,
        serviceOrder.position.district,
        serviceOrder.position.town,
        serviceOrder.position.street,
        serviceOrder.meetingTimeSchedule,
        'Đang xác nhận',
        serviceOrder.userId, 
        serviceOrder.providerId,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({message:"Gửi yêu cầu thành công"});
        }
    })

}
function cancelOrder(req,res){
    const sql = 'UPDATE service_order SET status = \'Đã hủy\' WHERE order_id = ?';
    connect_DB.query(sql, [
        req.body.order_id,
    ], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else{
            res.status(200).json({message:"Thành công hủy yêu cầu"});
        }
    })
}

module.exports = { checkNoEmpty, makeOrder,cancelOrder }