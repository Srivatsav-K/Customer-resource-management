import { FormControl, FormHelperText, InputLabel, OutlinedInput, Select } from "@mui/material";

const DropDown = (props) => {
    const { name, label, value, onChange, error, helperText, children, required } = props

    const ITEM_HEIGHT = 30;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 170,
            },
        },
    };

    return (
        <FormControl>
            <InputLabel id={label}>{label}</InputLabel>

            <Select
                required={required}
                name={name}
                labelId={label}
                size='small'
                input={<OutlinedInput label={label} />}
                value={value}
                onChange={onChange}
                error={error}
                inputProps={{ sx: { width: 170 } }}
                MenuProps={MenuProps}
            >
                {children}
            </Select>
            <FormHelperText error>{helperText}</FormHelperText>
        </FormControl>
    )
}

export default DropDown