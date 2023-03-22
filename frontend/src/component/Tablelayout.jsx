import { Table } from "antd";

const onChange = (pagination, filters, sorter, extra) => {
	console.log("params", pagination, filters, sorter, extra);
};
const TableLayout = ({ data, columns }) => {
	return (
		<Table
			rowKey={(rec) => rec.uid}
			columns={columns}
			dataSource={data}
			onChange={onChange}
			pagination={15}
		/>
	);
};
export default TableLayout;
