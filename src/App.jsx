import { Outlet } from "react-router-dom";
import { NotificationProvider } from "./components/ui/Notification";
import { ConfigProvider } from "antd";
function App() {
  return (
    <>
      <NotificationProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#01A1B7",
            },
            components: {
              Select: {
                borderRadiusLG: 6,
                colorPrimaryHover: "none",
              },
              Input: {
                borderRadiusLG: 6,
                colorPrimaryHover: "none",
              },
            },
          }}
        >
          <Outlet />
        </ConfigProvider>
      </NotificationProvider>
    </>
  );
}

export default App;
