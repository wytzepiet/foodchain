import { createResource, createSignal, ResourceReturn } from "solid-js";
import { Database, Tables } from "./database.types";
import { supabaseNoTypes } from "./client";
import { QueryData } from "@supabase/supabase-js";

type TableName = keyof Database["public"]["Tables"];
type Resources<T> = { [P in keyof T]?: ResourceReturn<T[P] | null> };

export default function createRecord<T extends TableName>(table: T, recordId?: number) {
  type Record = Tables<T>;

  let resources: Resources<Record> = {};
  let changes: Partial<Record> = {};

  const [id, setId] = createSignal(recordId);

  async function createNewRecord() {
    const { data, error } = await supabaseNoTypes.from(table).insert({}).returns<Record[]>().single();
    if (error) throw error;
    if (data) setId(data.id);
  }
  if (!recordId) createNewRecord();

  function setResource<C extends keyof Record>(column: C, value?: Record[C]) {
    async function fetchData() {
      if (value) return value;
      if (!id()) return null;
      const { data, error } = await supabaseNoTypes
        .from(table)
        .select(column.toString())
        .eq("id", id()!)
        .returns<Record[]>();

      if (error) throw error;
      return data ? data[0][column] : null;
    }
    const resouce = createResource(id, fetchData);
    resources[column] = resouce;
    return resouce;
  }

  return {
    tableName: table,
    resources,
    changes,

    value<C extends keyof Record>(column: C) {
      if (resources[column]) return resources[column]![0];
      return setResource(column)[0];
    },

    setValue<C extends keyof Record>(column: C, value: Record[C]) {
      const resouce = resources[column];
      if (resouce) resouce![1].mutate(() => value);
      else setResource(column, value);
      changes[column] = value;
    },

    injectData(data: Partial<Record>) {
      for (const column in data) {
        this.setValue(column, data[column]!);
      }
    },

    async saveChanges() {
      if (!id()) return;
      await supabaseNoTypes.from(table).update(changes).eq("id", id()!);
      this.changes = {};
    },
  };
}

// export abstract class DatabaseRecord<T extends keyof Database["public"]["Tables"]> {
//   id: string;
//   table: T;
//   resources: Resources<Tables<T>> = {};
//   changes: Partial<Tables<T>> = {};

//   constructor(id: string, table: T) {
//     this.id = id;
//     this.table = table;
//   }

//   private setResource<Col extends keyof Tables<T>>(column: Col, value?: Tables<T>[Col]) {
//     const { id, table } = this;
//     async function getColumn() {
//       if (value) return value;
//       const { data } = await supabase.from(table).select(column.toString()).eq("id", id).returns<Tables<T>>();
//       return data ? data[column] : null;
//     }
//     const resouce = createResource(getColumn);
//     this.resources[column] = resouce;
//     return resouce;
//   }

//   value<C extends keyof Tables<T>>(column: C) {
//     if (this.resources[column]) return this.resources[column]![0];
//     return this.setResource(column)[0];
//   }

//   setValue<C extends keyof Tables<T>>(column: C, value: Tables<T>[C]) {
//     const resouce = this.resources[column];
//     if (resouce) resouce![1].mutate(() => value);
//     else this.setResource(column, value);
//     this.changes[column] = value;
//   }

//   injectData(data: Partial<Tables<T>>) {
//     for (const column in data) {
//       this.setValue(column, data[column]!);
//     }
//   }

//   async saveChanges() {
//     await supabase.from(this.table).update(this.changes).eq("id", this.id);
//     this.changes = {};
//   }
// }
