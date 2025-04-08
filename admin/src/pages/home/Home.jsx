import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../components/widget/Widget";

import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          {/*<Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />*/}
        </div>
        </div>
    </div>
  );
};

export default Home;
