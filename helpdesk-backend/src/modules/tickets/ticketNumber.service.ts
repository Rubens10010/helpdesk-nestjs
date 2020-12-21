import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";

@Injectable()
export class TicketNumberService {
    constructor(private connection: Connection) {}

    async getNextTicketNumber(){
        const number = await this.connection.query("SELECT nextval('ticket_number_generator')");
        return parseInt(number[0].nextval,10);
    }
}