import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";

export default function MainLayout() {
  return (
    <Layout className="main-layout" style={{ width: "100vw", height: "100vh" }}>
      <Header className="header">Image Labeling</Header>
      <Layout>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
      <Footer className="footer">Image Labeling</Footer>
    </Layout>
  );
}
