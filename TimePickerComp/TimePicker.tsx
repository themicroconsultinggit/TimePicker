import * as React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
//import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  TimePicker
} from '@material-ui/pickers';

export interface ICalendarAndTimeProps {
	selectedTime?: Date;
    selectedDate?: Date;
    personaSize?: number;
    primaryColorCode: string;
    secondaryColorCode: string;
    timePickerLabel: string;
    minuteStepper: number;
    showAsDialog: boolean;
    //dialog: boolean;
	updateResponse: (newValue: string) => void;
}

export interface ICalendarAndTimeState extends React.ComponentState, ICalendarAndTimeProps {
	personaSize: number;
	imagesFadeIn: boolean;
    minuteStepper: number;
    primaryColorCode: string;
    secondaryColorCode: string;
    timePickerLabel: string;
    showAsDialog: boolean;
    //dialog: boolean;
    updateResponse: (newValue: string) => void;
    //selectedTime: Date;
}


export class MaterialTimePicker extends React.Component<ICalendarAndTimeProps, ICalendarAndTimeState> {
	constructor(props: ICalendarAndTimeProps) {
		super(props);

		this.state = {
			//selectedTime: props.selectedTime || new Date(),
			imagesFadeIn: true,
			personaSize: 32,
            minuteStepper: props.minuteStepper,
            primaryColorCode: props.primaryColorCode,
            secondaryColorCode: props.secondaryColorCode,
            timePickerLabel: props.timePickerLabel,
            showAsDialog: props.showAsDialog,
            //dialog: props.dialog,
            updateResponse: props.updateResponse
		};
        this.handleDateChange = this.handleDateChange.bind(this)
	}

    handleTimeChange = (newValue: any) => {
        this.setState({selectedTime: newValue})
    }

    handleDateChange = (newValue: any) => {
        //convert date to ISO format
        var date = new Date(newValue);
        var isoDate = date.toISOString();
        this.setState({selectedDate: newValue});
        console.log("This is New Val --> ", isoDate)
        //this.setState({selectedDate: isoDate});
        this.props.updateResponse(isoDate);
    }



    public render(): JSX.Element {
    const defaultMaterialTheme = createTheme({
        palette: {
            primary: {
                //main: '#4287f5',
                main: this.props.primaryColorCode,
                },
                secondary: {
                light: '#0066ff',
                main: this.props.secondaryColorCode,
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
                }
        },
        });

        return(
            <div>
                
             <ThemeProvider theme={defaultMaterialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                    showTodayButton
                    todayLabel="now"
                    variant= {this.props.showAsDialog ? "dialog" : "inline"}
                    label={this.props.timePickerLabel}
                    value={this.props.selectedDate}
                    minutesStep={this.props.minuteStepper}
                    onChange={this.handleDateChange}
                />
                </MuiPickersUtilsProvider>
                </ThemeProvider> 

                {/* <BottomNavigation
                    value={this.props.selectedDate}
                    onChange={this.handleDateChange}
                    showLabels
                   // className={classes.root}
                    >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                </BottomNavigation> */}
            </div>
        )
    }
}
