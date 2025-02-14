import {definePreset} from "@primeng/themes";
import Material from "@primeng/themes/material";
import {DefaultOrange, PrimaryDark, PrimaryLight} from "./palettes";

export const DefaultTheme = definePreset(Material, {
  semantic:{
    appOrange: DefaultOrange,
    appDark: PrimaryDark,
    appLight: PrimaryLight,
    primary: DefaultOrange,

    colorScheme:{
      light:{
        primary:{
          color: DefaultOrange[450],
        },
        surface: PrimaryLight
      },
      dark:{
        primary:{
          color: DefaultOrange[600],
        },
        surface: PrimaryDark
      }
    },
    components:{
      chip:{
        colorScheme:{
          light:{
            hoverBackground: DefaultOrange[400],
          },
          dark:{
            hoverBackground: DefaultOrange[600],
          }
        }
      }
    }
  }
})
