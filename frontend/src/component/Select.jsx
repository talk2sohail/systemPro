import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const tables = [
	{
		value: "users",
		label: "Users",
	},
	{
		value: "acpi_tables",
		label: "ACPI Tables",
	},
	{
		value: "apparmor_profiles",
		label: "AppArmour Profiles",
	},
	{
		value: "apt_sources",
		label: "Apt Sources",
	},
];

export default function SelectTextFields({ tableNameHandler }) {
	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off">
			<div>
				<TextField
					onChange={(e) => tableNameHandler(e.target.value)}
					id="outlined-select-currency"
					select
					label="Select"
					defaultValue="Users"
					helperText="Please select your table">
					{tables.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</div>
		</Box>
	);
}
