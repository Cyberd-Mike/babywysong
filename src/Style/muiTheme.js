import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette:{
        primary: {
            main: '#2D5151',
            light: 'rgba(0, 96, 100, 0.54)'
        },
        secondary: {
            main: 'rgba(255, 205, 210, 0.86)',
        },
        AccentColor1: {
            main: 'rgba(248, 187, 208, 0.86)',
        }
    }

        // "palette": {
        //     "primary1Color": "rgba(0, 96, 100, 0.54)",
        //     "primary2Color": "rgba(255, 205, 210, 0.86)",
        //     "accent1Color": "rgba(248, 187, 208, 0.86)",
        //     "accent2Color": "rgba(248, 187, 208, 0.86)",
        //     "accent3Color": "rgba(248, 187, 208, 0.86)",
        //     "textColor": "rgba(0, 0, 0, 0.87)",
        //     "secondaryTextColor": "rgba(255, 255, 255, 0.87)"
        // }
});

export default theme;