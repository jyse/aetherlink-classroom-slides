export const RESPONSIVE_FIGURE_STYLE=`<style>
@media(max-height:700px){
 .iso-page{margin:16px auto 24px}
 .iso-figure{margin:0 0 20px}
 .iso-plate{padding:40px 16px 48px}
 .iso-plate .iso-svg{max-height:calc(100vh - 300px)}
}
@media(max-width:560px){
 .iso-page{width:calc(100% - 16px);margin:16px auto 32px}
 .iso-figure{margin:0 0 20px}
 .iso-plate{padding:12px}
 .iso-plate-corners{position:static;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px 12px;margin-bottom:12px}
 .iso-plate-corner{position:static;min-width:0;white-space:normal;overflow-wrap:anywhere}
 .iso-plate-corner[data-corner="title"],.iso-plate-corner[data-corner="readout"]{text-align:right}
 .iso-key{max-width:100%;min-width:0;white-space:normal}
 .iso-caption{overflow-wrap:anywhere}
}
</style>`;
