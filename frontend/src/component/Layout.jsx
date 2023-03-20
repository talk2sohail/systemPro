import { UnorderedListOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import TableLayout from "./Tablelayout";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
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
					<TableLayout />
				</Content>
			</Layout>
		</Layout>
	);
};
export default App;
