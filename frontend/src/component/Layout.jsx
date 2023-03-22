import { UnorderedListOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { QueryTable } from "../../wailsjs/go/main/App";

import TableLayout from "./Tablelayout";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

function getColumns(obj) {
	return Object.keys(obj).map((val) => {
		return {
			title: val.toUpperCase(),
			dataIndex: val,
		};
	});
}

const items = [
	getItem("Table", "sub1", <UnorderedListOutlined />, [
		getItem("user", "3"),
		getItem("process_events", "4"),
		getItem("socket_events", "5"),
	]),
];

const App = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [columns, setColumns] = useState([]);

	useEffect(() => {
		let columnsData;
		QueryTable("users")
			.then((res) => {
				const data = JSON.parse(res);
				columnsData = getColumns(data[0]);
				console.log(columnsData);
				setTableData(data);
				setColumns(columnsData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout
			style={{
				minHeight: "100vh",
			}}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}>
				<div
					style={{
						height: 32,
						margin: 16,
						background: "rgba(255, 255, 255, 0.2)",
					}}
				/>
				<Menu
					theme="dark"
					defaultSelectedKeys={["1"]}
					mode="inline"
					items={items}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				/>
				<Content
					style={{
						margin: "0 16px",
					}}>
					<Breadcrumb
						style={{
							margin: "16px 0",
						}}
						separator=">"
						items={[{ title: "sohail" }, { title: "Armuy" }]}
					/>
					<TableLayout data={tableData} columns={columns} />
				</Content>
			</Layout>
		</Layout>
	);
};
export default App;
