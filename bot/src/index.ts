import sharp from "sharp";
import OpenAPIClientAxios from "openapi-client-axios";
import { Client as AggieCanvasClient } from "./aggiecanvas-openapi";
import parsedArgs from "./args";

const sleepFor = (ms: number) => new Promise((res) => setTimeout(res, ms));

const imgToColorArray = async (
  path: string,
  width?: number | undefined,
  height?: number | undefined,
): Promise<{ img: number[]; width: number; height: number }> => {
  const image = sharp(path);
  const maybeResized = width && height ? image.resize(width, height) : image;

  const { data, info } = await maybeResized
    .raw()
    .toBuffer({ resolveWithObject: true });
  const img: number[] = [];

  const arr = Uint8Array.from(data);
  for (let i = 0; i < arr.length; i += info.channels) {
    const [r, g, b] = [arr[i], arr[i + 1], arr[i + 2]];
    img.push((r << 16) + (g << 8) + b);
  }

  return { img, width: info.width, height: info.height };
};

const loginSession = async (client: AggieCanvasClient): Promise<string> => {
  process.stdout.write("ANUMBER: ");
  let anumber: string = "";
  for await (const line of console) {
    anumber = line.toLowerCase();
    break;
  }

  console.log(`posting to Anumber=(${anumber}) to aggieauth...`);
  await client.postAuthAggie(null, { anumber });

  process.stdout.write("AggieAuth Redirect Token (found in your USU email): ");
  let redirect: string = "";
  for await (const line of console) {
    redirect = line + "&wantsRedirect=false";
    break;
  }

  const { id: sessionId } = (await client.get<{ id: string }>(redirect)).data;
  return sessionId;
};

const main = async () => {
  const { img, width } = await imgToColorArray(
    parsedArgs.img,
    parsedArgs.width,
    parsedArgs.height,
  );

  const aggieCanvasHost = "https://aggiecanvas.linux.usu.edu/api";
  const aggieCanvasApi = new OpenAPIClientAxios({
    definition: aggieCanvasHost + "/swagger/json",
    withServer: 0,
  });
  const aggieCanvasClient = await aggieCanvasApi.init<AggieCanvasClient>();

  let sessionId: string = "";
  if (parsedArgs.cookieonstdin) {
    for await (const chunk of process.stdin)
      sessionId += Buffer.from(chunk).toString();
    if (!sessionId) throw new Error("no session id retrieved on stdin");
  } else {
    sessionId = await loginSession(aggieCanvasClient);
  }

  for (let i = parsedArgs.node - 1; i < img.length; i += parsedArgs.nnodes) {
    await sleepFor(parsedArgs.period);
    const [row, column] = [
      Math.floor(i / width) + parsedArgs.toplefty,
      (i % width) + parsedArgs.topleftx,
    ];
    const color = img[i];

    console.log(`Placing Color=(${color}) at X=(${column}) Y=(${row})...`);
    await aggieCanvasClient.postGridByIdPixel(
      parsedArgs.grid,
      {
        column,
        row,
        color,
      },
      {
        headers: {
          Cookie: `userSession=${sessionId}`,
        },
      },
    );
  }
};
main();
