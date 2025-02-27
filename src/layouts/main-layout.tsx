import "../tailwind.css";
import { MainWrapper } from "../components/mainwrapper";
import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </>
  );
};

export default MainLayout;
