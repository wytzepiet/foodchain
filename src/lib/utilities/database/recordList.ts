import { Database } from "./database.types";
import DatabaseRecord from "./record";

function createRecordList<T extends keyof Database["public"]["Tables"]>(table: T) {}

// export default class RecordList<R extends DatabaseRecord<T>, T extends keyof Database["public"]["Tables"]> {
//     records: R[] = [];

//     constructor(table: T) {
//       // const test = new type("");
//     }

//     async saveChanges() {
//       // await Promise.all(this.records.map((record) => record.saveChanges()));
//     }
//   }
