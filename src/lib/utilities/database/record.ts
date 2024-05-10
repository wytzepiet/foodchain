import { createClient } from "@supabase/supabase-js";
import { createResource, ResourceReturn } from "solid-js";
import { Database, Tables } from "./database.types";

const supabaseKey = process.env.SUPABASE_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
if (!supabaseKey || !supabaseUrl) throw new Error("Supabase key and url are required");

const supabase = createClient(supabaseUrl, supabaseKey);

type Resources<T> = { [P in keyof T]?: ResourceReturn<T[P] | null> };

export default abstract class DatabaseRecord<T extends keyof Database["public"]["Tables"]> {
  id: string;
  table: T;
  resources: Resources<Tables<T>> = {};
  changes: Partial<Tables<T>> = {};

  constructor(id: string, table: T) {
    this.id = id;
    this.table = table;
  }

  private setResource<Col extends keyof Tables<T>>(column: Col, value?: Tables<T>[Col]) {
    const { id, table } = this;
    async function getColumn() {
      if (value) return value;
      const { data } = await supabase.from(table).select(column.toString()).eq("id", id).returns<Tables<T>>();
      return data ? data[column] : null;
    }
    const resouce = createResource(getColumn);
    this.resources[column] = resouce;
    return resouce;
  }

  value<C extends keyof Tables<T>>(column: C) {
    if (this.resources[column]) return this.resources[column]![0];
    return this.setResource(column)[0];
  }

  setValue<C extends keyof Tables<T>>(column: C, value: Tables<T>[C]) {
    const resouce = this.resources[column];
    if (resouce) resouce![1].mutate(() => value);
    else this.setResource(column, value);
    this.changes[column] = value;
  }

  injectData(data: Partial<Tables<T>>) {
    for (const column in data) {
      this.setValue(column, data[column]!);
    }
  }

  async saveChanges() {
    await supabase.from(this.table).update(this.changes).eq("id", this.id);
    this.changes = {};
  }
}
