import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "./Header";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { QueryTable } from "../../wailsjs/go/main/App.js";
import { v4 as uuid4 } from "uuid";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import SelectTextFields from "./Select";

function getColumnObject(tableData) {
	return Object.keys(tableData).map((value) => {
		return {
			field: value,
			headerName: value.toLocaleUpperCase(),
			flex: 1,
		};
	});
}

const Contacts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [tableData, setTable] = useState([]);
	const [columns, setColumns] = useState([]);
	const [selectedTableName, setSelectedTableName] = useState("");
	useEffect(() => {
		const fetchTableData = async (tableName) => {
			const response = await QueryTable(tableName);
			const data = JSON.parse(response);
			setTable(data);
			setColumns(getColumnObject(data[0]));
		};
		fetchTableData(selectedTableName);
	}, [selectedTableName]);

	const handleTableNameFromUser = (name) => {
		setSelectedTableName(name);
	};
	const getRowId = () => {
		return uuid4();
	};
	return (
		<Box m="20px">
			<Header title="TABLES" subtitle="List of supported tables by OsQuery" />
			<SelectTextFields tableNameHandler={handleTableNameFromUser} />
			<Box
				m="40px 0 0 0"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .name-column--cell": {
						color: colors.greenAccent[300],
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: colors.blueAccent[700],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: colors.primary[400],
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor: colors.blueAccent[700],
					},
					"& .MuiCheckbox-root": {
						color: `${colors.greenAccent[200]} !important`,
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.grey[100]} !important`,
					},
				}}>
				<DataGrid
					getRowId={getRowId}
					rows={tableData}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
				/>
			</Box>
		</Box>
	);
};

export default Contacts;
