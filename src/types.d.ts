import type { Request, Router } from "express";

export interface ServerOptions {
  port?: number;
  routes: Router;
}

export interface MongoOptions {
  mongoUrl: string;
  dbName: string;
}

export type HashFunction = (password: string) => Promise<string>;
export type CompareFunction = (
  password: string,
  hash: string
) => Promise<boolean>;

export interface CustomRequest extends Request {
  token?: {}
}