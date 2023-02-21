import { WebContainer } from "@webcontainer/api";

const output = (output: string) => console.log(output);

window.addEventListener("load", async () => {
  output("booting...");
  const wc = await WebContainer.boot();
  output("booting complete");
});
