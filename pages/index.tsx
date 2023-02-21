import { Grid, Typography } from "@aura-ui/react";
import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [output, setOutput] = useState<string>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("load", async () => {
        setOutput("booting...");
        const wc = await WebContainer.boot();
        setOutput("booting complete");

        const process = await wc.spawn("node", ["-v"]);

        process.output.pipeTo(
          new WritableStream({
            write: (chunk) => setOutput(`Current node version: ${chunk}`),
          })
        );

        if (await process.exit) {
          setOutput(`Process failed and exited with code ${process?.exit}`);
        }
      });
    }
  }, []);

  return (
    <Grid
      css={{
        placeItems: "center",
        height: "100%",
      }}
    >
      <Typography>{output}</Typography>
    </Grid>
  );
}
