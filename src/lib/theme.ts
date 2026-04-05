export const theme = {
  colors: {
    ig1:"#833ab4",ig2:"#c13584",ig3:"#e1306c",ig4:"#f77737",ig5:"#fcaf45",
    surface:"#ffffff",surface2:"#f7f7f5",bg:"#f4f3ee",
    ink:"#1a1a1a",muted:"#6b6b6b",hint:"#aaaaaa",
    border:"rgba(0,0,0,0.09)",border2:"rgba(0,0,0,0.16)",
    success:"#1D9E75",successBg:"#E1F5EE",
    warning:"#BA7517",warningBg:"#FAEEDA",
    danger:"#A32D2D",dangerBg:"#FCEBEB",
    whatsapp:"#25D366",
  },
  gradients:{
    ig:"linear-gradient(45deg,#833ab4,#c13584,#e1306c,#f77737,#fcaf45)",
    igH:"linear-gradient(90deg,#833ab4,#e1306c,#f77737,#fcaf45)",
    igD:"linear-gradient(135deg,#833ab4,#c13584,#e1306c,#f77737)",
    cover:"linear-gradient(135deg,#2d0040,#6b1a7a,#c13584,#f77737)",
  },
  fonts:{display:"'Syne',sans-serif",body:"'DM Sans',sans-serif"},
  radii:{sm:"6px",md:"8px",lg:"12px",xl:"16px",full:"999px"},
};
export type Theme = typeof theme;
