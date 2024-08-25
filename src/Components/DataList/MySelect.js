import Select from "react-select";
import "./MySelect.css"

const sizeOptions = [
    {value: 10, label: '10개씩 보기'},
    {value: 30, label: '30개씩 보기'},
    {value: 50, label: '50개씩 보기'}
];

const placeOptions = [
    {value: "lobby", label: "로비"},
    {value: "class_a", label: "강의실A"},
    {value: "class_b", label: "강의실B"},
    {value: "office", label: "사무실"},
    {value: "meeting_room", label: "회의실"},
    {value: "server_room", label: "서버실"},
    {value: "storage", label: "창고"},
    {value: "outdoor", label: "야외"}
];

const measurementOptions = [
    {value: "temperature", label: "온도"},
    {value: "humidity", label: "습도"},
    {value: "noise", label: "소음"},
    {value: "dust", label: "미세먼지"},
    {value: "co2", label: "CO₂"},
    {value: "power_consumption", label: "전력소비량"},
    {value: "visitor", label: "방문자 수"},
];

export default function MySelect({isMulti, placeholder, defaultValue, options, onChange}) {
    return (
        <Select isMulti={isMulti}
                placeholder={placeholder}
                options={options}
                onChange={onChange}
                defaultValue={defaultValue} isSearchable={false}
                styles={{
                    container: (baseStyle) => ({
                        ...baseStyle,
                    }),
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: 35,
                        minHeight: 35,
                        fontSize: 15,
                        display: "flex",
                        boxShadow: 'none',
                        borderColor: state.isFocused ? "#FC5D19" : "#CCCCCC",
                        '&:hover': {
                            borderColor: state.isFocused ? undefined : undefined,
                        }
                    }),
                    indicatorsContainer: (baseStyles) => ({
                        ...baseStyles,
                        height: "100%"
                    }),
                    valueContainer: (baseStyles) => ({
                        ...baseStyles,
                        height: "100%"
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? "#FC5D19" : "white",
                        color: state.isFocused ? "white" : "black",
                        '&:hover': {
                            backgroundColor: state.isFocused ? "#FC5D19" : "white",
                        },
                        zIndex: 100
                    }),
                    placeholder: (base) => ({
                        ...base,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                    })
                }}
        />
    );
};

export {sizeOptions, placeOptions, measurementOptions};
