import { Connection } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promis: Promise<Connection> | null;
  };
}

export {};