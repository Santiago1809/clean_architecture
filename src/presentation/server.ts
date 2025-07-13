import type { ServerOptions } from "@/types";
import express, { Router } from "express";
import morgan from "morgan";

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    const { port = 3000, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(morgan("combined"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.routes);
    this.app.listen(this.port, () => {
      console.log(`Server runing on port ${this.port}`);
    });
  }
}
