const CrudRepository = require('./crud-repository');
const { Ticket } = require('../models');
const {Enums}  = require('../utils/common')
const {PENDING} = Enums.NOTI_ENUMS
class TicketRepository extends CrudRepository{
    constructor(){
        super(Ticket);
    }

    async getpendingTicket(){
        const response = await Ticket.findAll({
            where:{
                status:PENDING
            }
        })
    }
}

module.exports = TicketRepository;