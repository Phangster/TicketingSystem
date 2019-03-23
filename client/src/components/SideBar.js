import React, {Component} from 'react';

export default class SideBar extends Component {
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Bryan Phang</p>
                        </div>
                    </div>
                    {/* Search bar */}
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..." />
                        <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>

                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className="treeview">
                            <a href="/issues">
                                <i className="fa fa-files-o"></i>
                                <span>Pending Issues</span>
                                <span className="pull-right-container">
                                <span className="label pull-right bg-red">4</span>
                                </span>
                            </a>
                        </li>
                        <li>
                        <a href="/history">
                            <i className="fa fa-th"></i> <span>History</span>
                        </a>
                        </li>
                        <li className="treeview">
                        <a href="#">
                            <i className="fa fa-pie-chart"></i>
                            <span>Task Tracker</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-yellow">12</small>
                            <small className="label pull-right bg-green">16</small>
                            <small className="label pull-right bg-red">5</small>
                            </span>
                        </a>
                        </li>
     
                        <li>
                        <a href="./messages">
                            <i className="fa fa-envelope"></i> <span>Messages</span>
                        </a>
                        </li>

                        <li>
                        <a href="./logout">
                            <i className="fa fa-calendar"></i> <span>Logout</span>
                        </a>
                        </li>
                    </ul>
                </section>
            </aside> 
        )
    }
}