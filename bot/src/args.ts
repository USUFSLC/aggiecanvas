interface Args {
  cookieonstdin: boolean;
  grid: number;
  period: number;
  node: number;
  nnodes: number;
  img: string;
  width: undefined | number;
  height: undefined | number;
  topleftx: number;
  toplefty: number;
}

const args = require("minimist")(process.argv.slice(2));

if (!args.img)
  throw new Error("--img must be specified and a path to an image file");
if (!args.grid) throw new Error("--grid must be a valid grid id");

const parsedArgs: Args = {
  grid: args.grid,
  period: args.period ?? 100,
  node: args.node ?? 1,
  nnodes: args.nnodes ?? 1,
  img: args.img,
  width: args.width,
  height: args.height,
  topleftx: args.topleftx ?? 0,
  toplefty: args.toplefty ?? 0,
  cookieonstdin: args.cookieonstdin ?? false,
};

export default parsedArgs;
