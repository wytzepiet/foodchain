import Product from "~/providers/product";
import { Database } from "./database.types";
import DatabaseRecord from "./record";

export default class RecordList<R extends DatabaseRecord<keyof Database["public"]["Tables"]>> {
    records: R[] = [];

    constructor(type: R  ) {
    }
    
    async saveChanges() {
        await Promise.all(this.records.map((record) => record.saveChanges()));
    }
}
const ding = new Product('');
const test = new RecordList(ding);