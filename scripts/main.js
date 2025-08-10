import { MediaImporter } from "./media-importer.js";
Hooks.once("init", () => {
  game.settings.register("katarses-media-importer","defaultTarget",{
    name: "Default Target Folder", hint: "World folder to import media into (e.g., 'uploads/katarses').",
    scope: "world", config: true, type: String, default: "uploads/katarses"
  });
  game.settings.register("katarses-media-importer","open",{ name: game.i18n.localize("KMI.Open"), scope: "client", config: true, type: Boolean, default: false,
    onChange: () => { if (!game.user.isGM) return ui.notifications.warn(game.i18n.localize("KMI.OnlyGM")); new MediaImporter({}).render(true);
      game.settings.set("katarses-media-importer","open",false);} });
});
Hooks.on("getSceneControlButtons",(controls)=>{
  const tool={ name:"kmi-import", title:game.i18n.localize("KMI.Title"), icon:"fas fa-box-open", visible:game.user.isGM,
    onClick:()=> new MediaImporter({}).render(true), button:true };
  const token=controls.find(c=>c.name==="token"); if(token) token.tools.push(tool);
});