// in src/MyLayout.js
import { Layout, LayoutProps } from "react-admin";
import MyMenu from "./MyMenu";
import { JSX } from "react";

const MyLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => (
  <Layout {...props} menu={MyMenu} />
);

export default MyLayout;
